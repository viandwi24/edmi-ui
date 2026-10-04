<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import TerminalActions from "./terminal-actions.svelte";
	import TerminalClearButton from "./terminal-clear-button.svelte";
	import TerminalContent from "./terminal-content.svelte";
	import TerminalCopyButton from "./terminal-copy-button.svelte";
	import TerminalHeader from "./terminal-header.svelte";
	import TerminalStatus from "./terminal-status.svelte";
	import TerminalTitle from "./terminal-title.svelte";
	import { setTerminalContext } from "./use-terminal.svelte.js";

	let {
		ref = $bindable(null),
		output,
		isStreaming = false,
		autoScroll = true,
		onClear,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		output: string;
		isStreaming?: boolean;
		autoScroll?: boolean;
		onClear?: () => void;
	} = $props();

	setTerminalContext({
		get output() {
			return output;
		},
		get isStreaming() {
			return isStreaming;
		},
		get autoScroll() {
			return autoScroll;
		},
		get onClear() {
			return onClear;
		},
	});
</script>

<!-- Always dark, never themed: fixed oklch literals (ai.css .ai-term). -->
<div
	bind:this={ref}
	data-slot="ai-terminal"
	class={cn(
		"flex flex-col overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-[oklch(0.27_0.007_286)] bg-[oklch(0.17_0.005_286)] text-[oklch(0.92_0.003_286)]",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<TerminalHeader>
			<div class="flex items-center">
				<TerminalTitle />
				<TerminalStatus />
			</div>
			<TerminalActions>
				<TerminalCopyButton />
				{#if onClear}
					<TerminalClearButton />
				{/if}
			</TerminalActions>
		</TerminalHeader>
		<TerminalContent />
	{/if}
</div>
