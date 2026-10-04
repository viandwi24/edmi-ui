<script lang="ts">
	import { CommandSeparator } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof CommandSeparator> = $props();
</script>

<CommandSeparator bind:ref {...restProps}>
	{@render children?.()}
</CommandSeparator>
