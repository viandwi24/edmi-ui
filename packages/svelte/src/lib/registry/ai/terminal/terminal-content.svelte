<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import Anser from "anser";
	import type { Snippet } from "svelte";
	import { tick } from "svelte";
	import { useTerminalContext } from "./use-terminal.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const terminal = useTerminalContext();
	let container = $state<HTMLDivElement | null>(null);

	// Anser turns ANSI escapes into `ansi-<colour>` classes, mapped onto the fixed terminal palette below.
	const chunks = $derived(
		Anser.ansiToJson(terminal.output, { json: true, remove_empty: true, use_classes: true })
	);

	$effect(() => {
		terminal.output;
		if (terminal.autoScroll) {
			tick().then(() => {
				if (container) container.scrollTop = container.scrollHeight;
			});
		}
	});

	function chunkClass(chunk: { fg?: string | null; bg?: string | null; decoration?: string | null }) {
		return [chunk.fg ? `${chunk.fg}-fg` : "", chunk.decoration ? `ansi-${chunk.decoration}` : ""]
			.filter(Boolean)
			.join(" ");
	}

	const ansiColors = [
		"[&_.ansi-green-fg]:text-[oklch(0.78_0.15_155)]",
		"[&_.ansi-bright-green-fg]:text-[oklch(0.78_0.15_155)]",
		"[&_.ansi-yellow-fg]:text-[oklch(0.83_0.13_85)]",
		"[&_.ansi-bright-yellow-fg]:text-[oklch(0.83_0.13_85)]",
		"[&_.ansi-red-fg]:text-[oklch(0.7_0.17_20)]",
		"[&_.ansi-bright-red-fg]:text-[oklch(0.7_0.17_20)]",
		"[&_.ansi-blue-fg]:text-[oklch(0.72_0.13_255)]",
		"[&_.ansi-bright-blue-fg]:text-[oklch(0.72_0.13_255)]",
		"[&_.ansi-magenta-fg]:text-[oklch(0.74_0.14_320)]",
		"[&_.ansi-bright-magenta-fg]:text-[oklch(0.74_0.14_320)]",
		"[&_.ansi-cyan-fg]:text-[oklch(0.8_0.1_200)]",
		"[&_.ansi-bright-cyan-fg]:text-[oklch(0.8_0.1_200)]",
		"[&_.ansi-black-fg]:text-[oklch(0.58_0.01_286)]",
		"[&_.ansi-bright-black-fg]:text-[oklch(0.58_0.01_286)]",
		"[&_.ansi-bold]:font-semibold",
		"[&_.ansi-dim]:opacity-60",
		"[&_.ansi-italic]:italic",
		"[&_.ansi-underline]:underline",
	].join(" ");
</script>

<div
	bind:this={container}
	data-slot="ai-terminal-content"
	class={cn(
		"max-h-96 overflow-auto px-3.5 py-2.5 font-mono text-[12.5px] leading-[1.7]",
		ansiColors,
		className
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<pre class="font-[inherit] break-words whitespace-pre-wrap">{#each chunks as chunk, index (index)}<span
					class={chunkClass(chunk)}>{chunk.content}</span
				>{/each}{#if terminal.isStreaming}<span
					class="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-current align-[-2px]"
				></span>{/if}</pre>
	{/if}
</div>
