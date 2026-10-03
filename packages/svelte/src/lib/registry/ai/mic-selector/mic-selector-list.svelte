<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandList } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps, Snippet } from "svelte";
	import { useMicSelector } from "./use-mic-selector.svelte.js";

	// `children` receives the device list: `{#snippet children(devices)}…{/snippet}`.
	let {
		children,
		...restProps
	}: Omit<ComponentProps<typeof CommandList>, "children"> & {
		children?: Snippet<[MediaDeviceInfo[]]>;
	} = $props();

	const ctx = useMicSelector("MicSelectorList");
</script>

<CommandList {...restProps}>
	{@render children?.(ctx.devices)}
</CommandList>
