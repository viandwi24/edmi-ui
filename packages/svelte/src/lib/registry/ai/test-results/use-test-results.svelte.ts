import { getContext, setContext } from "svelte";

export type TestStatusType = "passed" | "failed" | "skipped" | "running";

export interface TestResultsSummaryData {
	passed: number;
	failed: number;
	skipped: number;
	total: number;
	duration?: number;
}

export interface TestResultsContext {
	readonly summary: TestResultsSummaryData | undefined;
}
export interface TestSuiteContext {
	readonly name: string;
	readonly status: TestStatusType;
}
export interface TestContext {
	readonly name: string;
	readonly status: TestStatusType;
	readonly duration: number | undefined;
}

const RESULTS = Symbol("ai-test-results");
const SUITE = Symbol("ai-test-suite");
const TEST = Symbol("ai-test");

function make<T>(key: symbol, label: string, parent: string) {
	return [
		(ctx: T) => setContext(key, ctx),
		(): T => {
			const ctx = getContext<T | undefined>(key);
			if (!ctx) throw new Error(`${label} must be used within ${parent}`);
			return ctx;
		},
	] as const;
}

export const [setTestResultsContext, useTestResultsContext] =
	make<TestResultsContext>(RESULTS, "TestResults components", "TestResults");
export const [setTestSuiteContext, useTestSuiteContext] =
	make<TestSuiteContext>(SUITE, "TestSuite components", "TestSuite");
export const [setTestContext, useTestContext] = make<TestContext>(
	TEST,
	"Test components",
	"Test",
);

export const formatDuration = (ms: number) =>
	ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)} s`;

export const statusStyles: Record<TestStatusType, string> = {
	failed: "text-destructive-text",
	passed: "text-success-text",
	running: "text-info-text",
	skipped: "text-warning-text",
};
