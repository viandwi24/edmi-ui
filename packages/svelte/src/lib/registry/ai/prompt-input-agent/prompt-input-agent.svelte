<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { AgentAvatar } from "../agent-avatar/index.js";
	import type { PromptInputAgentOption } from "./types.js";

	let {
		agent,
		class: className,
		...restProps
	}: Omit<ButtonProps, "href" | "children"> & {
		agent: PromptInputAgentOption;
	} = $props();
</script>

<!-- Chip in the composer header: who you are talking to. -->
<Button
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
