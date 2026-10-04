<script lang="ts">
	import { CommandDialog } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let {
		open = $bindable(false),
		value = $bindable(""),
		...restProps
	}: ComponentProps<typeof CommandDialog> = $props();
</script>

<CommandDialog bind:open bind:value {...restProps} />
