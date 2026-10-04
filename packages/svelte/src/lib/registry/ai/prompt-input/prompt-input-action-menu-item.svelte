<script lang="ts">
	import { DropdownMenuItem } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof DropdownMenuItem> = $props();
</script>

<DropdownMenuItem bind:ref {...restProps} />
