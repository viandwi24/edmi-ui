<script lang="ts">
	import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@edmi-svelte/ai/tool";

	const input = { symbol: "NVDAx", window: "30d" };
	const states = [
		"input-streaming",
		"input-available",
		"approval-requested",
		"approval-responded",
		"output-denied",
	] as const;
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<Tool open>
		<ToolHeader type="tool-get_prices" state="output-available" />
		<ToolContent>
			<ToolInput {input} />
			<ToolOutput output={{ price: 188.2, change: 0.024 }} />
		</ToolContent>
	</Tool>
	<Tool open>
		<ToolHeader type="tool-get_prices" state="output-error" />
		<ToolContent>
			<ToolInput {input} />
			<ToolOutput errorText="Rate limit: retry in 20 s" />
		</ToolContent>
	</Tool>
	{#each states as state (state)}
		<Tool>
			<ToolHeader type="tool-get_prices" {state} />
			<ToolContent>
				<ToolInput {input} />
			</ToolContent>
		</Tool>
	{/each}
</div>
