<script lang="ts">
	import { CommandShortcut } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof CommandShortcut> = $props();
</script>

<CommandShortcut bind:ref {...restProps}>
	{@render children?.()}
</CommandShortcut>
