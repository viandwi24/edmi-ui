// Sample data for the Coding agent IDE example. Shared by react.tsx, vue.vue and svelte.svelte.

export interface SourceFile {
	path: string;
	name: string;
	language: "typescript" | "json";
	code: string;
}

export const files: Record<string, SourceFile> = {
	"src/lib/keeper.ts": {
		path: "src/lib/keeper.ts",
		name: "keeper.ts",
		language: "typescript",
		code: `import { getDrift } from "./drift"
import { rebalance } from "./rebalance"

const LIMIT = 0.02

export async function run(index: string) {
  // only rebalance when drift is above the limit
  const drift = await getDrift(index)
  if (drift < LIMIT) return { status: "skipped", drift }
  const tx = await rebalance(index, { slippage: 0.01 })
  return { status: "ok", drift, tx }
}`,
	},
	"src/lib/drift.ts": {
		path: "src/lib/drift.ts",
		name: "drift.ts",
		language: "typescript",
		code: `import { quote } from "./quote"

export async function getDrift(index: string) {
  const legs = await quote(index)
  const target = 1 / legs.length
  // largest distance between a leg weight and its target
  return Math.max(...legs.map((leg) => Math.abs(leg.weight - target)))
}`,
	},
	"src/app.tsx": {
		path: "src/app.tsx",
		name: "app.tsx",
		language: "typescript",
		code: `import { Ticker } from "./components/ticker"

export function App() {
  return (
    <main>
      <Ticker symbols={["NVDAx", "MSFTx", "MAG4"]} />
    </main>
  )
}`,
	},
	"tests/keeper.test.ts": {
		path: "tests/keeper.test.ts",
		name: "keeper.test.ts",
		language: "typescript",
		code: `import { expect, test } from "vitest"
import { run } from "../src/lib/keeper"

test("skips when drift is under the limit", async () => {
  expect((await run("mag4")).status).toBe("skipped")
})

test("rebalances at exactly 2%", async () => {
  expect((await run("mag4-drifted")).status).toBe("ok")
})`,
	},
	"package.json": {
		path: "package.json",
		name: "package.json",
		language: "json",
		code: `{
  "name": "keeper",
  "private": true,
  "scripts": { "test": "vitest run" }
}`,
	},
};

export const initialPath = "src/lib/keeper.ts";
export const expandedFolders = ["src", "src/lib", "tests"];

export const terminalOutput = [
	"\u001b[90m$\u001b[0m bun run test",
	"",
	"\u001b[34mRUN\u001b[0m  v2.1.4 /app",
	"",
	" \u001b[32m✓\u001b[0m tests/drift.test.ts \u001b[90m(4)\u001b[0m",
	" \u001b[31m✗\u001b[0m tests/keeper.test.ts \u001b[90m(3)\u001b[0m",
	"   \u001b[31m→ expected 0.02 to be less than 0.02\u001b[0m",
	"",
	"\u001b[33mTest Files\u001b[0m  \u001b[31m1 failed\u001b[0m | \u001b[32m1 passed\u001b[0m",
].join("\n");

export const request =
	"Make the keeper skip rebalances when drift is under 2%, then fix the failing test.";

export const reply =
	"Done with the first part: `run()` now returns `skipped` below the limit. The boundary test still fails because **exactly 2%** should rebalance. Here is the plan:";

export const plan = {
	title: "Fix the boundary case",
	description: "3 steps · about 1 minute",
	steps: [
		"1. Compare with < instead of <= in keeper.ts",
		"2. Re-run tests/keeper.test.ts",
		"3. Commit the change",
	],
};

export const queue = {
	queued: [
		{ id: "q1", title: "Add a test for slippage above 1%" },
		{ id: "q2", title: "Document the drift limit in README" },
	],
	completed: [{ id: "c1", title: "Skip rebalance under the limit" }],
};

export const agent = {
	id: "keeper",
	name: "Keeper",
	scope: "coding",
	color: "chart-3",
};
