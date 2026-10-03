<script lang="ts">
	import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@edmi-svelte/ai/tool";
</script>

<Tool raised open class="max-w-md">
	<ToolHeader type="tool-get_prices" state="output-available" />
	<ToolContent>
		<ToolInput input={{ symbol: "NVDAx", window: "30d" }} />
		<ToolOutput output={{ price: 188.2, change: 0.024 }} />
	</ToolContent>
</Tool>
