<script lang="ts">
	import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@edmi-svelte/ai/tool";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Tool elevation={level.value} open class="max-w-md">
				<ToolHeader type="tool-get_prices" state="output-available" />
				<ToolContent>
					<ToolInput input={{ symbol: "NVDAx", window: "30d" }} />
					<ToolOutput output={{ price: 188.2, change: 0.024 }} />
				</ToolContent>
			</Tool>
		</div>
	{/each}
</div>
