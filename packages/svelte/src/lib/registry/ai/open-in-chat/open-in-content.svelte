<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		align = "start",
		children,
		...restProps
	}: ComponentProps<typeof DropdownMenu.Content> = $props();
</script>

<DropdownMenu.Content data-slot="ai-open-in-content" {align} class={cn("w-[230px]", className)} {...restProps}>
	{@render children?.()}
</DropdownMenu.Content>
