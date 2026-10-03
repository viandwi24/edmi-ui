import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DEMO_EXT, FRAMEWORKS, type Framework } from "../config";
import { loadManifest } from "./manifest";

const repoRoot = resolve(process.cwd(), "../..");
const docsRoot = process.cwd();

/** Registry import aliases used in demos -> the paths a consumer has after `add`. */
export function rewriteImports(fw: Framework, src: string): string {
	switch (fw) {
		case "react":
			return src
				.replaceAll("@edmi-react/ui/", "@/components/ui/")
				.replaceAll("@edmi-react/hooks/", "@/hooks/")
				.replaceAll("@edmi-react/lib/", "@/lib/")
				.replaceAll("@edmi-react/blocks/", "@/components/");
		case "vue":
			return src
				.replaceAll("@edmi-vue/ui/", "@/components/ui/")
				.replaceAll("@edmi-vue/hooks/", "@/composables/")
				.replaceAll("@edmi-vue/lib/", "@/lib/")
				.replaceAll("@edmi-vue/blocks/", "@/components/");
		case "svelte":
			return src
				.replaceAll("@edmi-svelte/ui/", "$lib/components/ui/")
				.replaceAll("@edmi-svelte/hooks/", "$lib/hooks/")
				.replaceAll("@edmi-svelte/lib/", "$lib/")
				.replaceAll("@edmi-svelte/blocks/", "$lib/components/");
	}
}

export async function getItem(name: string) {
	return (await loadManifest()).find((i) => i.name === name);
}

/** Frameworks an item ships for (manifest entry present and not skipped). */
export async function itemFrameworks(name: string): Promise<Framework[]> {
	const item = await getItem(name);
	if (!item) return [];
	return FRAMEWORKS.filter((fw) => {
		const e = item.frameworks[fw];
		return e && !e.skip;
	});
}

export function demoPath(fw: Framework, demo: string) {
	return resolve(docsRoot, `src/demos/${fw}/${demo}.${DEMO_EXT[fw]}`);
}

export async function sourcesFor(name: string, fw: Framework) {
	const entry = (await getItem(name))?.frameworks[fw];
	return (entry?.files ?? [])
		.filter((f) => !f.type || f.type !== "registry:file")
		.map((f) => {
			const p = resolve(repoRoot, "packages", fw, f.path);
			return {
				path: f.path,
				code: existsSync(p) ? readFileSync(p, "utf8") : "",
			};
		})
		.filter((s) => s.code);
}

// ---------------------------------------------------------------------------------------------
// Usage snippet: own-item imports + a trimmed copy of the demo markup.
// ---------------------------------------------------------------------------------------------

const indentOf = (l: string) => (l.match(/^[\t ]*/)?.[0] ?? "").length;
const isCont = (l: string) => /^\s*(\/>|>|<\/|\)|\})/.test(l);

function splitBlocks(lines: string[]): string[][] {
	const base = Math.min(...lines.filter((l) => l.trim()).map(indentOf));
	const blocks: string[][] = [];
	for (const l of lines) {
		if (!l.trim()) continue;
		if (indentOf(l) === base && !isCont(l)) blocks.push([l]);
		else if (blocks.length) blocks.at(-1)?.push(l);
		else blocks.push([l]);
	}
	return blocks;
}

const isComment = (l: string) => {
	const t = l.trim();
	return (
		t.startsWith("//") ||
		(t.startsWith("{/*") && t.endsWith("*/}")) ||
		(t.startsWith("<!--") && t.endsWith("-->"))
	);
};

function trimMarkup(
	input: string[],
	budget: number,
	comment: (indent: string) => string,
): string[] {
	const lines = input.filter((l) => !isComment(l));
	if (lines.length <= budget) return lines;
	const blocks = splitBlocks(lines);
	if (blocks.length === 1) {
		const b = blocks[0];
		const last = b[b.length - 1];
		if (b.length > 2 && b[0].trimEnd().endsWith(">") && isCont(last)) {
			return [b[0], ...trimMarkup(b.slice(1, -1), budget - 2, comment), last];
		}
		return b.slice(0, budget);
	}
	const out: string[] = [];
	let truncated = false;
	for (const b of blocks) {
		if (out.length === 0 && b.length > budget) {
			out.push(...trimMarkup(b, budget, comment));
		} else if (out.length + b.length <= budget) out.push(...b);
		else {
			truncated = true;
			break;
		}
	}
	if (truncated)
		out.push(comment(" ".repeat(0) + lines[0].match(/^[\t ]*/)?.[0]));
	return out;
}

function dedent(lines: string[]) {
	const base = Math.min(...lines.filter((l) => l.trim()).map(indentOf));
	return lines.map((l) => l.slice(Math.min(base, indentOf(l))));
}

export function usageSnippet(
	fw: Framework,
	rawSource: string,
	name: string,
): string {
	const src = rewriteImports(fw, rawSource).replaceAll("\r\n", "\n");
	const own = [...src.matchAll(/import[\s\S]*?from\s+["']([^"']+)["'];?/g)]
		.filter((m) => {
			const mod = m[1];
			if (
				mod.includes("icon-placeholder") ||
				mod.startsWith("@lucide") ||
				mod.startsWith("@phosphor")
			)
				return false;
			return mod.startsWith("@/") || mod.startsWith("$lib");
		})
		.filter(
			(m) =>
				m[1].endsWith(`/${name}`) ||
				m[1].includes(`/${name}/`) ||
				m[1].endsWith(`/${name}.js`),
		)
		.filter((m) => !m[0].startsWith("import type"))
		.map((m) => m[0].replace(/\s+$/, ""));
	const imports = own.length
		? own
		: [...src.matchAll(/import[\s\S]*?from\s+["']([^"']+)["'];?/g)]
				.filter(
					(m) =>
						(m[1].startsWith("@/components") ||
							m[1].startsWith("$lib/components")) &&
						!m[1].includes("icon-placeholder"),
				)
				.slice(0, 2)
				.map((m) => m[0]);

	let markup: string[] = [];
	const lines = src.split("\n");
	if (fw === "react") {
		const start = lines.findIndex((l) => /^\treturn \($/.test(l));
		const end = lines.findIndex((l, i) => i > start && /^\t\);$/.test(l));
		if (start >= 0 && end > start) markup = dedent(lines.slice(start + 1, end));
		else {
			const one = lines.find((l) => /^\treturn <.*>;$/.test(l));
			if (one) markup = [one.replace(/^\treturn /, "").replace(/;$/, "")];
		}
		markup = trimMarkup(markup, 18, (i) => `${i}{/* … */}`);
		const head = imports.join("\n");
		return `${`${head}${head ? "\n\n" : ""}${markup.join("\n")}`.trimEnd()}\n`;
	}
	if (fw === "vue") {
		const s = lines.findIndex((l) => l.startsWith("<template>"));
		const e = lines.findLastIndex((l) => l.startsWith("</template>"));
		if (s >= 0 && e > s) markup = dedent(lines.slice(s + 1, e));
		markup = trimMarkup(markup, 18, (i) => `${i}<!-- … -->`);
		const script = imports.length
			? `<script setup lang="ts">\n${imports.join("\n")}\n</script>\n\n`
			: "";
		return `${script}<template>\n${markup.map((l) => (l ? `  ${l}` : l)).join("\n")}\n</template>\n`;
	}
	const e = lines.findIndex((l) => l.startsWith("</script>"));
	markup = dedent(
		lines
			.slice(e + 1)
			.filter((l, i, a) => l.trim() || (i > 0 && i < a.length - 1)),
	);
	markup = trimMarkup(markup, 18, (i) => `${i}<!-- … -->`);
	const script = imports.length
		? `<script lang="ts">\n${imports.map((l) => `\t${l}`).join("\n")}\n</script>\n\n`
		: "";
	return `${`${script}${markup.join("\n")}`.trimEnd()}\n`;
}
