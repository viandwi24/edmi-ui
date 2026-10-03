/**
 * Fetches the stock sources the Edmi AI pack is derived from, for reference while porting:
 *   bun run scripts/ai-fetch-stock.ts [outDir]     (default: .ai-src, gitignored)
 *
 * Layout: <out>/react/<name>.json (+ <name>.tsx extracted), <out>/vue/..., <out>/svelte/...
 * Each JSON has `files[].content`, `dependencies`, `registryDependencies`. `example-*` items are the
 * official demos (use them as the basis for docs demos).
 *   React   Vercel AI Elements   https://elements.ai-sdk.dev/api/registry/<name>.json     (Apache-2.0)
 *   Vue     ai-elements-vue      https://registry.ai-elements-vue.com/<name>.json        (Apache-2.0)
 *   Svelte  Svelte AI Elements   https://svelte-ai-elements.vercel.app/r/<name>.json      (MIT, partial)
 * See NOTICE and AGENTS.md "AI pack" before copying anything.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const OUT = resolve(process.argv[2] ?? ".ai-src");

const SOURCES = [
	{
		fw: "react",
		index: "https://elements.ai-sdk.dev/api/registry/registry.json",
		item: (n: string) => `https://elements.ai-sdk.dev/api/registry/${n}.json`,
	},
	{
		fw: "vue",
		index: "https://registry.ai-elements-vue.com/registry.json",
		item: (n: string) => `https://registry.ai-elements-vue.com/${n}.json`,
	},
	{
		fw: "svelte",
		index: "https://svelte-ai-elements.vercel.app/r/index.json",
		item: (n: string) => `https://svelte-ai-elements.vercel.app/r/${n}.json`,
	},
] as const;

type StockItem = {
	name: string;
	files?: { path: string; content?: string }[];
};

async function json<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url}: ${res.status}`);
	return (await res.json()) as T;
}

for (const { fw, index, item } of SOURCES) {
	const dir = join(OUT, fw);
	await mkdir(dir, { recursive: true });
	const reg = await json<{ items: StockItem[] } | StockItem[]>(index);
	const names = (Array.isArray(reg) ? reg : reg.items).map((i) => i.name);
	let done = 0;
	// 8 at a time
	for (let i = 0; i < names.length; i += 8) {
		await Promise.all(
			names.slice(i, i + 8).map(async (name) => {
				const data = await json<StockItem>(item(name));
				await writeFile(
					join(dir, `${name}.json`),
					`${JSON.stringify(data, null, 2)}\n`,
				);
				const first = data.files?.[0];
				if (first?.content && data.files?.length === 1) {
					const ext = first.path.split(".").pop() ?? "txt";
					await writeFile(join(dir, `${name}.${ext}`), first.content);
				}
				done++;
			}),
		);
	}
	console.log(`${fw}: ${done} items -> ${dir}`);
}
