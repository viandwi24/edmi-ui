<script lang="ts">
	import { CommandGroup } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof CommandGroup> = $props();
</script>

<CommandGroup bind:ref {...restProps}>
	{@render children?.()}
</CommandGroup>
