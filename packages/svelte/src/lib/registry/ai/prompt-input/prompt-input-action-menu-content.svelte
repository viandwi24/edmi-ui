<script lang="ts">
	import { DropdownMenuContent } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		align = "start",
		...restProps
	}: ComponentProps<typeof DropdownMenuContent> = $props();
</script>

<DropdownMenuContent bind:ref {align} {...restProps} />
