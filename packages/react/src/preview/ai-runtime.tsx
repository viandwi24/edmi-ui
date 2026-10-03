import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Sandbox,
	SandboxContent,
	SandboxHeader,
	SandboxTabContent,
	SandboxTabs,
	SandboxTabsBar,
	SandboxTabsList,
	SandboxTabsTrigger,
} from "@/registry/edmi/components/ai/sandbox";
import {
	SchemaDisplay,
	SchemaDisplayMethod,
} from "@/registry/edmi/components/ai/schema-display";
import {
	Snippet,
	SnippetAddon,
	SnippetCopyButton,
	SnippetInput,
	SnippetText,
} from "@/registry/edmi/components/ai/snippet";
import {
	StackTrace,
	StackTraceActions,
	StackTraceContent,
	StackTraceCopyButton,
	StackTraceError,
	StackTraceErrorMessage,
	StackTraceErrorType,
	StackTraceExpandButton,
	StackTraceFrames,
	StackTraceHeader,
} from "@/registry/edmi/components/ai/stack-trace";
import {
	Terminal,
	TerminalActions,
	TerminalClearButton,
	TerminalContent,
	TerminalCopyButton,
	TerminalHeader,
	TerminalStatus,
	TerminalTitle,
} from "@/registry/edmi/components/ai/terminal";
import {
	Test,
	TestDuration,
	TestError,
	TestErrorMessage,
	TestName,
	TestResults,
	TestResultsContent,
	TestResultsDuration,
	TestResultsHeader,
	TestResultsProgress,
	TestResultsSummary,
	TestStatus,
	TestSuite,
	TestSuiteContent,
	TestSuiteName,
} from "@/registry/edmi/components/ai/test-results";
import {
	WebPreview,
	WebPreviewBody,
	WebPreviewConsole,
	WebPreviewNavigation,
	WebPreviewNavigationButton,
	WebPreviewUrl,
} from "@/registry/edmi/components/ai/web-preview";

function Label({ children }: { children: string }) {
	return (
		<p className="mb-2 font-mono text-[11px] tracking-[0.8px] text-muted-foreground uppercase">
			{children}
		</p>
	);
}

const trace = `TypeError: Cannot read properties of undefined (reading 'price')
    at getDrift (lib/drift.ts:14:22)
    at run (lib/keeper.ts:8:17)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;

const termOutput = [
	"\u001b[90m$\u001b[0m pnpm test",
	"",
	"\u001b[34mRUN\u001b[0m  v2.1.4 /app",
	"",
	" \u001b[32m✓\u001b[0m tests/drift.test.ts \u001b[90m(4)\u001b[0m",
	" \u001b[31m✗\u001b[0m tests/keeper.test.ts \u001b[90m(3)\u001b[0m",
	"   \u001b[31m→ expected 0.02 to be less than 0.02\u001b[0m",
	"",
	"\u001b[33mTest Files\u001b[0m  \u001b[31m1 failed\u001b[0m | \u001b[32m1 passed\u001b[0m",
].join("\n");

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

const logs = [
	{
		level: "log" as const,
		message: "Mounted IndexPage",
		timestamp: new Date("2026-01-01T14:02:11"),
	},
	{
		level: "warn" as const,
		message: "Missing key prop in list",
		timestamp: new Date("2026-01-01T14:02:12"),
	},
];

const page = `<!doctype html><html><body style="margin:0;padding:22px;font-family:system-ui,sans-serif;background:#f4f3ef"><div style="font-size:20px;font-weight:600">MAG4</div><div style="font-size:12px;color:#777">Magnificent Four</div></body></html>`;

function Nav() {
	return (
		<WebPreviewNavigation>
			<WebPreviewNavigationButton tooltip="Back">
				<IconPlaceholder
					lucide="ChevronLeftIcon"
					tabler="IconChevronLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="CaretLeftIcon"
					remixicon="RiArrowLeftSLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
			<WebPreviewNavigationButton tooltip="Reload">
				<IconPlaceholder
					lucide="RotateCwIcon"
					tabler="IconRotateClockwise2"
					hugeicons="Rotate01Icon"
					phosphor="ArrowClockwiseIcon"
					remixicon="RiRefreshLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
			<WebPreviewUrl />
			<WebPreviewNavigationButton tooltip="Open in new tab">
				<IconPlaceholder
					lucide="ExternalLinkIcon"
					tabler="IconExternalLink"
					hugeicons="LinkSquare02Icon"
					phosphor="ArrowSquareOutIcon"
					remixicon="RiExternalLinkLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
		</WebPreviewNavigation>
	);
}

export default function AiRuntimePreview() {
	const [output, setOutput] = useState(termOutput);

	return (
		<div className="flex max-w-xl flex-col gap-8">
			<section>
				<Label>Sandbox</Label>
				<Sandbox>
					<SandboxHeader state="output-available" title="quote.ts" />
					<SandboxContent>
						<SandboxTabs defaultValue="output">
							<SandboxTabsBar>
								<SandboxTabsList>
									<SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
									<SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
								</SandboxTabsList>
							</SandboxTabsBar>
							<SandboxTabContent value="code">
								<pre className="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs">
									const r = await quote("NVDAx")
								</pre>
							</SandboxTabContent>
							<SandboxTabContent value="output">
								<pre className="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">
									{"188.20\n✓ done in 412 ms"}
								</pre>
							</SandboxTabContent>
						</SandboxTabs>
					</SandboxContent>
				</Sandbox>
				<div className="mt-3">
					<Sandbox>
						<SandboxHeader state="input-available" title="quote.ts" />
					</Sandbox>
				</div>
			</section>

			<section>
				<Label>Schema display</Label>
				<SchemaDisplay
					description="Rebalance an index back to its target weights."
					method="POST"
					parameters={[
						{
							description: "Index id",
							name: "id",
							required: true,
							type: "string",
						},
					]}
					path="/v1/indexes/{id}/rebalance"
					requestBody={[
						{ description: "0–0.05", name: "maxSlippage", type: "number" },
						{ description: "Quote only", name: "dryRun", type: "boolean" },
					]}
					responseBody={[{ name: "drift", type: "number" }]}
				/>
				<div className="mt-3 flex gap-1.5">
					{methods.map((method) => (
						<SchemaDisplay
							className="inline-flex border-0 bg-transparent"
							key={method}
							method={method}
							path=""
						>
							<SchemaDisplayMethod />
						</SchemaDisplay>
					))}
				</div>
			</section>

			<section>
				<Label>Snippet</Label>
				<div className="flex flex-col gap-3">
					<Snippet code="pnpm dlx shadcn@latest add @edmi/ai/tool">
						<SnippetAddon>
							<SnippetText>$</SnippetText>
						</SnippetAddon>
						<SnippetInput />
						<SnippetAddon align="inline-end">
							<SnippetCopyButton />
						</SnippetAddon>
					</Snippet>
					<Snippet code="idx_mag4_7f3a">
						<SnippetAddon>
							<SnippetText>id</SnippetText>
						</SnippetAddon>
						<SnippetInput />
						<SnippetAddon align="inline-end">
							<SnippetCopyButton />
						</SnippetAddon>
					</Snippet>
				</div>
			</section>

			<section>
				<Label>Stack trace</Label>
				<StackTrace defaultOpen onFilePathClick={() => {}} trace={trace}>
					<StackTraceHeader>
						<StackTraceError>
							<StackTraceErrorType />
							<StackTraceErrorMessage />
						</StackTraceError>
						<StackTraceActions>
							<StackTraceCopyButton />
							<StackTraceExpandButton />
						</StackTraceActions>
					</StackTraceHeader>
					<StackTraceContent>
						<StackTraceFrames />
					</StackTraceContent>
				</StackTrace>
			</section>

			<section>
				<Label>Terminal</Label>
				<Terminal isStreaming onClear={() => setOutput("")} output={output}>
					<TerminalHeader>
						<div className="flex items-center">
							<TerminalTitle />
							<TerminalStatus />
						</div>
						<TerminalActions>
							<TerminalCopyButton />
							<TerminalClearButton />
						</TerminalActions>
					</TerminalHeader>
					<TerminalContent />
				</Terminal>
			</section>

			<section>
				<Label>Test results</Label>
				<TestResults
					summary={{
						duration: 1840,
						failed: 1,
						passed: 7,
						skipped: 1,
						total: 9,
					}}
				>
					<TestResultsHeader>
						<TestResultsSummary />
						<TestResultsDuration />
					</TestResultsHeader>
					<TestResultsProgress />
					<TestResultsContent>
						<TestSuite defaultOpen name="keeper.test.ts" status="failed">
							<TestSuiteName />
							<TestSuiteContent>
								<Test
									duration={12}
									name="skips when drift is under the limit"
									status="passed"
								/>
								<Test
									duration={31}
									name="rebalances at exactly 2%"
									status="failed"
								>
									<TestStatus />
									<TestName />
									<TestDuration />
									<TestError>
										<TestErrorMessage>
											AssertionError: expected 0.02 to be less than 0.02
										</TestErrorMessage>
									</TestError>
								</Test>
								<Test name="respects approval above $500" status="skipped" />
								<Test name="sends one transaction" status="running" />
							</TestSuiteContent>
						</TestSuite>
					</TestResultsContent>
				</TestResults>
			</section>

			<section>
				<Label>Web preview</Label>
				<WebPreview defaultUrl="localhost:3000/indexes/mag4">
					<Nav />
					<WebPreviewBody className="h-[200px]" srcDoc={page} />
					<WebPreviewConsole logs={logs} />
				</WebPreview>
			</section>
		</div>
	);
}
