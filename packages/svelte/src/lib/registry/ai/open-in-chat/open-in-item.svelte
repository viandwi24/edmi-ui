<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof DropdownMenu.Item> = $props();
</script>

<DropdownMenu.Item {...restProps}>
	{@render children?.()}
</DropdownMenu.Item>
