<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandEmpty } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof CommandEmpty> = $props();
</script>

<CommandEmpty {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		No microphone found.
	{/if}
</CommandEmpty>
