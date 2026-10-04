import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
	applyBlock,
	BLOCKS,
	catalogItems,
	SKILL_DIR,
	USE_WHEN,
} from "./gen-skill.ts";

const read = (f: string) => readFileSync(resolve(SKILL_DIR, f), "utf8");
const refs = readdirSync(join(SKILL_DIR, "references")).map(
	(f) => `references/${f}`,
);
const all = ["SKILL.md", ...refs];

describe("edmi-ui agent skill", () => {
	test("every manifest item appears in the catalog with a use-when line", () => {
		const catalog = read("references/components.md");
		for (const item of catalogItems()) {
			expect(USE_WHEN[item.name], `USE_WHEN.${item.name}`).toBeTruthy();
			expect(catalog, item.name).toContain(`\`${item.name}\``);
		}
	});

	test("USE_WHEN has no stale entries", () => {
		const names = new Set(catalogItems().map((i) => i.name));
		for (const key of Object.keys(USE_WHEN))
			expect(names.has(key), key).toBe(true);
	});

	for (const b of BLOCKS) {
		test(`${b.file} generated block is up to date (run bun run scripts/gen-skill.ts)`, () => {
			const cur = read(b.file);
			expect(applyBlock(cur, b.id, b.render())).toBe(cur);
		});
	}

	test("SKILL.md frontmatter follows the Agent Skills spec", () => {
		const src = read("SKILL.md");
		const front = src.split("---")[1] ?? "";
		const name = front.match(/^name:\s*(.+)$/m)?.[1]?.trim();
		const desc = front.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? "";
		expect(name).toBe("edmi-ui");
		expect(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name ?? "")).toBe(true);
		expect(desc.length).toBeGreaterThan(50);
		expect(desc.length).toBeLessThanOrEqual(1024);
		expect(src.split("\n").length).toBeLessThan(500);
	});

	test("every reference file is linked from SKILL.md", () => {
		const skill = read("SKILL.md");
		for (const r of refs) expect(skill, r).toContain(`](${r})`);
	});

	test("content stays consumer-facing", () => {
		for (const f of all) {
			const src = read(f);
			expect(src, f).not.toMatch(/AI Elements/i);
			expect(src, f).not.toMatch(
				/refs\/edmi|@\/registry\/edmi|packages\/(react|vue|svelte)/,
			);
		}
	});
});
