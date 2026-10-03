<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.LinkProps = $props();
</script>

<NavigationMenuPrimitive.Link
	bind:ref
	data-slot="navigation-menu-link"
	class={cn(
		"flex items-center gap-2.5 rounded-lg p-2 text-[13.5px] transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring in-data-[slot=navigation-menu-content]:rounded-[7px] data-[active]:bg-accent data-[active]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
/>
