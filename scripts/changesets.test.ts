import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dir, "..", ".changeset");
const config = JSON.parse(readFileSync(join(dir, "config.json"), "utf8")) as {
	fixed: string[][];
	ignore: string[];
};
const releasable = new Set(config.fixed.flat());

describe("changesets", () => {
	// A changeset that names only ignored (private) packages is never consumed by `changeset version`,
	// so release.yml keeps opening "Version Packages" PRs and never publishes.
	for (const file of readdirSync(dir).filter(
		(f) => f.endsWith(".md") && f !== "README.md",
	)) {
		test(`${file} bumps a published package`, () => {
			const front = readFileSync(join(dir, file), "utf8").split("---")[1] ?? "";
			const names = [...front.matchAll(/^\s*"([^"]+)"\s*:/gm)].flatMap((m) =>
				m[1] ? [m[1]] : [],
			);
			expect(names.length).toBeGreaterThan(0);
			for (const name of names) expect(config.ignore).not.toContain(name);
			expect(names.some((n) => releasable.has(n))).toBe(true);
		});
	}
});
