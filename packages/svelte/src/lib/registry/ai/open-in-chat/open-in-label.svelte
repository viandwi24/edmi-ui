<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof DropdownMenu.Label> = $props();
</script>

<DropdownMenu.Label {...restProps}>
	{@render children?.()}
</DropdownMenu.Label>
