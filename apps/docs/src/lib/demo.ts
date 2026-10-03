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
				.replaceAll("@edmi-react/components/", "@/components/")
				.replaceAll("@edmi-react/hooks/", "@/hooks/")
				.replaceAll("@edmi-react/lib/", "@/lib/")
				.replaceAll("@edmi-react/blocks/", "@/components/");
		case "vue":
			return src
				.replaceAll("@edmi-vue/ui/", "@/components/ui/")
				.replaceAll("@edmi-vue/components/", "@/components/")
				.replaceAll("@edmi-vue/hooks/", "@/composables/")
				.replaceAll("@edmi-vue/lib/", "@/lib/")
				.replaceAll("@edmi-vue/blocks/", "@/components/");
		case "svelte":
			return src
				.replaceAll("@edmi-svelte/ui/", "$lib/components/ui/")
				.replaceAll("@edmi-svelte/ai/", "$lib/components/ai/")
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
// Usage snippet: concise imports (only what the shown markup uses) + a sanitized, trimmed copy of the
// demo markup (no demo-only state, icon placeholders or helper snippets; structure stays balanced).
// ---------------------------------------------------------------------------------------------

const indentOf = (l: string) => (l.match(/^[\t ]*/)?.[0] ?? "").length;
const isCont = (l: string) => /^\s*(\/>|>|<\/|\)|\})/.test(l);
const sizeOf = (u: string) => u.split("\n").length;
const sizeAll = (us: string[]) => us.reduce((n, u) => n + sizeOf(u), 0);

/** Merge multi-line opening tags (`<X\n  a="1"\n>`) into single units so trimming never cuts one. */
function toUnits(lines: string[]): string[] {
	const out: string[] = [];
	let cur: string[] = [];
	let inTag = false;
	let quote = "";
	let brace = 0;
	for (const line of lines) {
		cur.push(line);
		for (let i = 0; i < line.length; i++) {
			const c = line[i];
			if (!inTag) {
				if (c === "<" && /[A-Za-z]/.test(line[i + 1] ?? "")) {
					inTag = true;
					quote = "";
					brace = 0;
				}
				continue;
			}
			if (quote) {
				if (c === quote) quote = "";
			} else if (c === '"' || c === "'" || c === "`") quote = c;
			else if (c === "{") brace++;
			else if (c === "}") brace--;
			else if (c === ">" && brace <= 0 && line[i - 1] !== "=") inTag = false;
		}
		if (!inTag) {
			out.push(cur.join("\n"));
			cur = [];
		}
	}
	if (cur.length) out.push(cur.join("\n"));
	return out;
}

const isComment = (l: string) => {
	const t = l.trim();
	return (
		t.startsWith("//") ||
		(t.startsWith("{/*") && t.endsWith("*/}")) ||
		(t.startsWith("<!--") && t.endsWith("-->"))
	);
};

function splitBlocks(us: string[]): string[][] {
	const base = Math.min(...us.filter((l) => l.trim()).map(indentOf));
	const blocks: string[][] = [];
	for (const u of us) {
		if (!u.trim()) continue;
		if (indentOf(u) === base && !isCont(u)) blocks.push([u]);
		else if (blocks.length) blocks.at(-1)?.push(u);
		else blocks.push([u]);
	}
	return blocks;
}

/** Last resort: keep every unit down to the deepest indent level that fits, collapse the rest. */
function collapseDepth(
	us: string[],
	budget: number,
	comment: (i: string) => string,
) {
	const levels = [...new Set(us.map(indentOf))].sort((a, b) => a - b);
	const run = (t: number) => {
		const out: string[] = [];
		let omitted = false;
		for (const u of us) {
			if (indentOf(u) <= t) {
				out.push(u);
				omitted = false;
			} else if (!omitted) {
				out.push(comment(u.match(/^[\t ]*/)?.[0] ?? ""));
				omitted = true;
			}
		}
		return out;
	};
	let best = run(levels[0]);
	for (const t of levels) {
		const r = run(t);
		if (sizeAll(r) <= budget) best = r;
	}
	return best;
}

function trimMarkup(
	input: string[],
	budget: number,
	comment: (indent: string) => string,
): string[] {
	const us = input.filter((u) => !isComment(u));
	if (sizeAll(us) <= budget) return us;
	const blocks = splitBlocks(us);
	if (blocks.length === 1) {
		const b = blocks[0];
		const last = b[b.length - 1];
		if (b.length > 2 && b[0].trimEnd().endsWith(">") && isCont(last)) {
			return [
				b[0],
				...trimMarkup(
					b.slice(1, -1),
					budget - sizeOf(b[0]) - sizeOf(last),
					comment,
				),
				last,
			];
		}
		return collapseDepth(b, budget, comment);
	}
	const out: string[] = [];
	let truncated = false;
	for (const b of blocks) {
		if (out.length === 0 && sizeAll(b) > budget) {
			out.push(...trimMarkup(b, budget, comment));
		} else if (sizeAll(out) + sizeAll(b) <= budget) out.push(...b);
		else {
			truncated = true;
			break;
		}
	}
	if (truncated) out.push(comment(us[0].match(/^[\t ]*/)?.[0] ?? ""));
	return out;
}

function dedent(lines: string[]) {
	const base = Math.min(...lines.filter((l) => l.trim()).map(indentOf));
	return lines.map((l) => l.slice(Math.min(base, indentOf(l))));
}

/** Names declared by the demo itself (state, data, helpers): never valid in a standalone snippet. */
function demoOnlyNames(fw: Framework, src: string): string[] {
	const names = new Set<string>();
	const add = (s: string) => {
		for (const n of s.match(/[A-Za-z_$][\w$]*/g) ?? []) names.add(n);
	};
	for (const m of src.matchAll(
		/^\s*(?:const|let|var)\s+(\[[^\]]+\]|\{[^}]+\}|[A-Za-z_$][\w$]*)\s*(?::[^=]+)?=/gm,
	))
		add(m[1]);
	if (fw === "svelte")
		for (const m of src.matchAll(/\{#snippet\s+([A-Za-z_$][\w$]*)/g))
			names.add(m[1]);
	for (const n of ["const", "let", "true", "false", "null", "undefined"])
		names.delete(n);
	return [...names].filter((n) => !/^[A-Z]/.test(n) && n.length > 1);
}

/** Remove balanced `{…}` segments (and the `attr=` before them) that mention a demo-only name. */
function stripExpressions(text: string, names: string[]): string {
	if (!names.length) return text;
	const re = new RegExp(
		`(^|[^\\w$.])(${names.map((n) => n.replace(/\$/g, "\\$")).join("|")})(?![\\w$])`,
	);
	let out = "";
	for (let i = 0; i < text.length; i++) {
		if (text[i] !== "{") {
			out += text[i];
			continue;
		}
		let depth = 0;
		let j = i;
		for (; j < text.length; j++) {
			if (text[j] === "{") depth++;
			else if (text[j] === "}" && --depth === 0) break;
		}
		const seg = text.slice(i, j + 1);
		const dir = /^\{[#:/]/.test(seg);
		if (!dir && (re.test(seg) || /^\{@render/.test(seg))) {
			out = out.replace(/\s+[\w:@.$-]+=$/, "");
		} else out += seg;
		i = j;
	}
	// vue/svelte quoted attrs and directives that reference demo-only names
	const quoted = new RegExp(
		`\\s+(?:v-[\\w:.-]+|[:@][\\w:.-]+|on\\w+)="[^"]*(?<![\\w$.])(?:${names.join("|")})(?![\\w$])[^"]*"`,
		"g",
	);
	return out.replace(quoted, "");
}

/** Replace `<IconPlaceholder phosphor="X" … />` with `<X … />`, drop `{#snippet}` definitions. */
function stripNoise(text: string): string {
	return text
		.replace(/^\{#snippet[\s\S]*?^\{\/snippet\}\n?/gm, "")
		.replace(/<IconPlaceholder\b([\s\S]*?)\/>/g, (_m, attrs: string) => {
			const icon = attrs.match(/phosphor="(\w+)"/)?.[1] ?? "Icon";
			const rest = attrs
				.replace(/\s+(lucide|tabler|hugeicons|phosphor|remixicon)="[^"]*"/g, "")
				.replace(/\s+/g, " ")
				.trimEnd();
			return `<${icon}${rest} />`;
		});
}

function tidy(text: string): string {
	return text.replace(/\n[\t ]*\n+/g, "\n").replace(/^\s*\n/, "");
}

const MOD_OK = (mod: string) =>
	(mod.startsWith("@/components") || mod.startsWith("$lib/components")) &&
	!mod.includes("icon-placeholder");

/** Imports reduced to the identifiers the markup really uses, merged per module, wrapped past 80 cols. */
function conciseImports(src: string, markup: string, name: string): string[] {
	const used = (id: string) =>
		new RegExp(`<${id}(?![\\w])|\\b${id}\\.`).test(markup);
	const byMod = new Map<string, string[]>();
	const stars: string[] = [];
	for (const m of src.matchAll(
		/import\s+([\s\S]*?)\s+from\s+["']([^"']+)["'];?/g,
	)) {
		const [, clause, mod] = m;
		if (!MOD_OK(mod) || clause.startsWith("type ")) continue;
		const star = clause.match(/^\*\s+as\s+(\w+)$/);
		if (star) {
			if (used(star[1])) stars.push(`import * as ${star[1]} from "${mod}";`);
			continue;
		}
		const named = clause.match(/\{([\s\S]*)\}/)?.[1];
		if (!named) continue;
		const ids = named
			.split(",")
			.map((s) => s.trim())
			.filter((s) => s && !s.startsWith("type "))
			.filter((s) => used(s.split(/\s+as\s+/).pop() ?? s));
		if (ids.length)
			byMod.set(mod, [...new Set([...(byMod.get(mod) ?? []), ...ids])]);
	}
	const lines = [...stars];
	for (const [mod, ids] of byMod) {
		const one = `import { ${ids.join(", ")} } from "${mod}";`;
		lines.push(
			one.length <= 80
				? one
				: `import {\n\t${ids.join(",\n\t")},\n} from "${mod}";`,
		);
	}
	if (lines.length) return lines;
	// markup empty / opaque: fall back to the item's own barrel
	const own = [
		...src.matchAll(/import[\s\S]*?from\s+["']([^"']+)["'];?/g),
	].find(
		(m) =>
			MOD_OK(m[1]) &&
			(m[1].endsWith(`/${name}`) || m[1].includes(`/${name}/`)) &&
			!m[0].startsWith("import type"),
	);
	return own ? [own[0].replace(/\s+$/, "")] : [];
}

export function usageSnippet(
	fw: Framework,
	rawSource: string,
	name: string,
): string {
	const src = rewriteImports(fw, rawSource).replaceAll("\r\n", "\n");
	const lines = src.split("\n");
	const only = demoOnlyNames(fw, src);
	const clean = (ls: string[]) =>
		tidy(stripExpressions(stripNoise(ls.join("\n")), only)).split("\n");

	let markup: string[] = [];
	if (fw === "react") {
		const start = lines.findIndex((l) => /^\treturn \($/.test(l));
		const end = lines.findIndex((l, i) => i > start && /^\t\);$/.test(l));
		if (start >= 0 && end > start) markup = dedent(lines.slice(start + 1, end));
		else {
			const one = lines.find((l) => /^\treturn <.*>;$/.test(l));
			if (one) markup = [one.replace(/^\treturn /, "").replace(/;$/, "")];
		}
	} else if (fw === "vue") {
		const s = lines.findIndex((l) => l.startsWith("<template>"));
		const e = lines.findLastIndex((l) => l.startsWith("</template>"));
		if (s >= 0 && e > s) markup = dedent(lines.slice(s + 1, e));
	} else {
		const e = lines.findIndex((l) => l.startsWith("</script>"));
		markup = dedent(lines.slice(e + 1));
	}
	markup = dedent(
		clean(markup).filter((l, i, a) => l.trim() || (i > 0 && i < a.length - 1)),
	);
	const cm = (open: string, close: string) => (i: string) =>
		`${i}${open} … ${close}`;
	const units = trimMarkup(
		toUnits(markup),
		26,
		fw === "react" ? cm("{/*", "*/}") : cm("<!--", "-->"),
	);
	const body = units.join("\n").split("\n");
	const imports = conciseImports(src, body.join("\n"), name);

	if (fw === "react") {
		const head = imports.join("\n");
		return `${`${head}${head ? "\n\n" : ""}${body.join("\n")}`.trimEnd()}\n`;
	}
	if (fw === "vue") {
		const script = imports.length
			? `<script setup lang="ts">\n${imports.join("\n")}\n</script>\n\n`
			: "";
		return `${script}<template>\n${body.map((l) => (l ? `  ${l}` : l)).join("\n")}\n</template>\n`;
	}
	const script = imports.length
		? `<script lang="ts">\n${imports
				.map((l) =>
					l
						.split("\n")
						.map((x) => `\t${x}`)
						.join("\n"),
				)
				.join("\n")}\n</script>\n\n`
		: "";
	return `${`${script}${body.join("\n")}`.trimEnd()}\n`;
}
