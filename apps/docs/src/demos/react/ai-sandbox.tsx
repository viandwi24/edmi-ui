import {
	Sandbox,
	SandboxContent,
	SandboxHeader,
	SandboxTabContent,
	SandboxTabs,
	SandboxTabsBar,
	SandboxTabsList,
	SandboxTabsTrigger,
} from "@edmi-react/components/ai/sandbox";

const Code = () => (
	<pre className="m-0 overflow-hidden rounded-md border border-border bg-card py-2.5 font-mono text-[12.5px] leading-[1.7]">
		<span className="mr-3.5 inline-block w-[38px] pr-3.5 text-right text-muted-foreground-2 select-none">
			1
		</span>
		<span className="text-chart-2">const</span> r ={" "}
		<span className="text-chart-2">await</span>{" "}
		<span className="text-chart-4">quote</span>(
		<span className="text-success-text">"NVDAx"</span>){"\n"}
		<span className="mr-3.5 inline-block w-[38px] pr-3.5 text-right text-muted-foreground-2 select-none">
			2
		</span>
		<span className="text-chart-4">console</span>.log(r.price)
	</pre>
);

export default function Demo() {
	return (
		<div className="flex w-full max-w-xl flex-col gap-4">
			<Sandbox>
				<SandboxHeader state="input-available" title="quote.ts" />
				<SandboxContent>
					<SandboxTabs defaultValue="code">
						<SandboxTabsBar>
							<SandboxTabsList>
								<SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
								<SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
							</SandboxTabsList>
						</SandboxTabsBar>
						<SandboxTabContent value="code">
							<Code />
						</SandboxTabContent>
						<SandboxTabContent value="output">
							<pre className="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">
								Waiting for output…
							</pre>
						</SandboxTabContent>
					</SandboxTabs>
				</SandboxContent>
			</Sandbox>
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
							<Code />
						</SandboxTabContent>
						<SandboxTabContent value="output">
							<pre className="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">
								{"188.20\n✓ done in 412 ms"}
							</pre>
						</SandboxTabContent>
					</SandboxTabs>
				</SandboxContent>
			</Sandbox>
		</div>
	);
}
