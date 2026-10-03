<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { setOpenInContext } from "./context.js";

	/** Dropdown that sends `query` to another AI app. */
	let {
		open = $bindable(false),
		query,
		children,
		...restProps
	}: DropdownMenuPrimitive.RootProps & { query: string } = $props();

	setOpenInContext({
		get query() {
			return query;
		},
	});
</script>

<DropdownMenu.Root bind:open {...restProps}>
	{@render children?.()}
</DropdownMenu.Root>
