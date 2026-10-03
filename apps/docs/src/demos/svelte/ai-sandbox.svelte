<script lang="ts">
	import {
		Sandbox,
		SandboxContent,
		SandboxHeader,
		SandboxTabContent,
		SandboxTabs,
		SandboxTabsBar,
		SandboxTabsList,
		SandboxTabsTrigger,
	} from "@edmi-svelte/ai/sandbox";
</script>

<div class="flex w-full max-w-xl flex-col gap-4">
	<Sandbox>
		<SandboxHeader state="input-available" title="quote.ts" />
		<SandboxContent>
			<SandboxTabs value="code">
				<SandboxTabsBar>
					<SandboxTabsList>
						<SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
						<SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
					</SandboxTabsList>
				</SandboxTabsBar>
				<SandboxTabContent value="code">
					<pre
						class="m-0 overflow-hidden rounded-md border border-border bg-card py-2.5 font-mono text-[12.5px] leading-[1.7]"><span
							class="mr-3.5 inline-block w-[38px] pr-3.5 text-right text-muted-foreground-2 select-none"
							>1</span
						><span class="text-chart-2">const</span> r = <span class="text-chart-2">await</span> <span
							class="text-chart-4">quote</span
						>(<span class="text-success-text">"NVDAx"</span>)
<span class="mr-3.5 inline-block w-[38px] pr-3.5 text-right text-muted-foreground-2 select-none">2</span><span
							class="text-chart-4">console</span
						>.log(r.price)</pre>
				</SandboxTabContent>
				<SandboxTabContent value="output">
					<pre class="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">Waiting for output…</pre>
				</SandboxTabContent>
			</SandboxTabs>
		</SandboxContent>
	</Sandbox>
	<Sandbox>
		<SandboxHeader state="output-available" title="quote.ts" />
		<SandboxContent>
			<SandboxTabs value="output">
				<SandboxTabsBar>
					<SandboxTabsList>
						<SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
						<SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
					</SandboxTabsList>
				</SandboxTabsBar>
				<SandboxTabContent value="code">
					<pre class="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">const r = await quote("NVDAx")</pre>
				</SandboxTabContent>
				<SandboxTabContent value="output">
					<pre class="m-0 rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]">188.20
✓ done in 412 ms</pre>
				</SandboxTabContent>
			</SandboxTabs>
		</SandboxContent>
	</Sandbox>
</div>
