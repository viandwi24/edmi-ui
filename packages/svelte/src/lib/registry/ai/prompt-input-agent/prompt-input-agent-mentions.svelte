<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { AgentAvatar } from "../agent-avatar/index.js";
	import type { PromptInputAgentOption } from "./types.js";

	let {
		agents,
		activeIndex = 0,
		onSelect,
		label = "Agents",
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children" | "onselect"> & {
		agents: PromptInputAgentOption[];
		activeIndex?: number;
		onSelect?: (agent: PromptInputAgentOption) => void;
		label?: string;
	} = $props();
</script>

<!--
	The @ mention list. It positions itself above the nearest `relative` ancestor, so render it next to
	(not inside) `PromptInput`, whose group clips overflow.
-->
<div
	data-slot="ai-prompt-input-agent-mentions"
	role="listbox"
	aria-label={label}
	class={cn(
		"absolute bottom-full left-0 z-50 mb-2 w-70 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground",
		className
	)}
	{...restProps}
>
	<div class="px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground">{label}</div>
	{#each agents as agent, i (agent.id)}
		<!-- keep focus in the textarea while picking -->
		<div
			role="option"
			aria-selected={i === activeIndex}
			tabindex="-1"
			data-active={i === activeIndex ? "" : undefined}
			class="flex h-8 cursor-default items-center gap-[9px] rounded-[7px] px-2 text-[13.5px] whitespace-nowrap data-[active]:bg-accent data-[active]:text-accent-foreground"
			onmousedown={(e) => e.preventDefault()}
			onclick={() => onSelect?.(agent)}
			onkeydown={(e) => {
				if (e.key === "Enter") onSelect?.(agent);
			}}
		>
			<AgentAvatar seed={agent.id} color={agent.color} size={19} tile={false} />
			<span>{agent.name}</span>
			{#if agent.scope}
				<span class="ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground">
					{agent.scope}
				</span>
			{/if}
		</div>
	{/each}
</div>
