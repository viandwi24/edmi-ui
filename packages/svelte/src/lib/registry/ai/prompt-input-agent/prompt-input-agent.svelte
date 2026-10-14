<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { cn } from "$lib/utils.js";
	import { AgentAvatar } from "../agent-avatar/index.js";
	import type { PromptInputAgentOption } from "./types.js";

	let {
		ref = $bindable(null),
		agent,
		elevation = "auto",
		class: className,
		...restProps
	}: Omit<ButtonProps, "href" | "children" | "elevation"> & {
		agent: PromptInputAgentOption;
		/** ✦ depth of the chip: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();
</script>

<!-- Chip in the composer header: who you are talking to. -->
<Button
	bind:ref
	{elevation}
	data-slot="ai-prompt-input-agent"
	variant="outline"
	size="sm"
	type="button"
	class={cn("gap-[7px] bg-card", className)}
	{...restProps}
>
	<AgentAvatar seed={agent.id} color={agent.color} size={19} tile={false} />
	{agent.name}
</Button>
