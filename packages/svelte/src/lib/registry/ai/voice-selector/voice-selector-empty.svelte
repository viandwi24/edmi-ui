<script lang="ts">
	import { CommandEmpty } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof CommandEmpty> = $props();
</script>

<CommandEmpty {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		No voices found.
	{/if}
</CommandEmpty>
