<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		output,
		errorText,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { output?: unknown; errorText?: string } = $props();

	const text = $derived(typeof output === "string" ? output : JSON.stringify(output, null, 2));
	const pre =
		"m-0 overflow-x-auto rounded-lg bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6] whitespace-pre text-foreground";
</script>

{#if output || errorText}
	<div data-slot="ai-tool-output" class={className} {...restProps}>
		<div class="mb-1.5 font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">
			{errorText ? "Error" : "Result"}
		</div>
		{#if errorText}
			<pre class={cn(pre, "bg-destructive-soft text-destructive-text")}>{errorText}</pre>
		{:else}
			<pre class={pre}>{text}</pre>
		{/if}
	</div>
{/if}
