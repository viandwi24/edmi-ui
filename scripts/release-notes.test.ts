import { describe, expect, test } from "bun:test";
import { buildNotes, parseSection, stripHash } from "./release-notes";

const tokens = `# @edmi-ui/tokens

## 0.2.0

### Minor Changes

- abc1234: Add success token.
- abc1234: Shared line.

### Patch Changes

- def5678: Fix dark lip.
  continued here.

## 0.1.0

### Minor Changes

- 6e0ab1e: Old entry.
`;
const react = `# @edmi-ui/registry-react

## 0.2.0

### Minor Changes

- abc1234: Shared line.
- abc1234: React only.
`;

describe("release-notes", () => {
	test("parseSection picks only the requested version", () => {
		const s = parseSection(tokens, "0.2.0");
		expect(s.Minor).toEqual([
			"abc1234: Add success token.",
			"abc1234: Shared line.",
		]);
		expect(s.Patch).toEqual(["def5678: Fix dark lip.\n  continued here."]);
		expect(parseSection(tokens, "0.1.0").Minor).toEqual([
			"6e0ab1e: Old entry.",
		]);
		expect(parseSection(tokens, "9.9.9").Minor).toEqual([]);
	});
	test("stripHash", () => {
		expect(stripHash("6e0ab1e: text")).toBe("text");
		expect(stripHash("no hash here")).toBe("no hash here");
	});
	test("buildNotes dedupes and groups", () => {
		const md = buildNotes("0.2.0", {
			"@edmi-ui/tokens": tokens,
			"@edmi-ui/registry-react": react,
		});
		expect(md.match(/Shared line\./g)?.length).toBe(1);
		expect(md).toContain("## Minor Changes");
		expect(md).toContain("## Patch Changes");
		expect(md).toContain("- React only.");
		expect(md).toContain("@edmi-ui/registry-react@0.2.0");
		expect(md).not.toContain("Old entry");
	});
});
