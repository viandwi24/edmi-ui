<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import MicSelectorLabel from "./mic-selector-label.svelte";
	import { useMicSelector } from "./use-mic-selector.svelte.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();

	const ctx = useMicSelector("MicSelectorValue");
	const current = $derived(ctx.devices.find((d) => d.deviceId === ctx.value));
</script>

{#if current}
	<MicSelectorLabel
		device={current}
		showId={false}
		class={cn("flex-1 truncate text-left", className)}
		{...restProps}
	/>
{:else}
	<span class={cn("flex-1 truncate text-left text-muted-foreground", className)} {...restProps}>
		Select microphone...
	</span>
{/if}
