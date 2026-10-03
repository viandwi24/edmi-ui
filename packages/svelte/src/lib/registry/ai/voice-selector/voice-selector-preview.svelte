<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		playing = false,
		loading = false,
		onPlay,
		onclick,
		...restProps
	}: Omit<ButtonProps, "children" | "href" | "onclick"> & {
		onclick?: (event: MouseEvent) => void;
		playing?: boolean;
		loading?: boolean;
		onPlay?: () => void;
	} = $props();
</script>

<Button
	data-slot="ai-voice-selector-preview"
	type="button"
	variant="ghost"
	size="icon-xs"
	aria-label={playing ? "Pause preview" : "Play preview"}
	disabled={loading}
	class={cn("mt-px", className)}
	onclick={(event) => {
		event.stopPropagation();
		onclick?.(event);
		onPlay?.();
	}}
	{...restProps}
>
	{#if loading}
		<Spinner class="size-3" />
	{:else if playing}
		<IconPlaceholder
			lucide="PauseIcon"
			tabler="IconPlayerPause"
			hugeicons="PauseIcon"
			phosphor="PauseIcon"
			remixicon="RiPauseLine"
			class="size-3 fill-current"
		/>
	{:else}
		<IconPlaceholder
			lucide="PlayIcon"
			tabler="IconPlayerPlay"
			hugeicons="PlayIcon"
			phosphor="PlayIcon"
			remixicon="RiPlayLine"
			class="size-3 fill-current"
		/>
	{/if}
</Button>
