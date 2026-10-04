<script lang="ts">
	import { DropdownMenu } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { open = $bindable(false), ...restProps }: ComponentProps<typeof DropdownMenu> = $props();
</script>

<DropdownMenu bind:open {...restProps} />
