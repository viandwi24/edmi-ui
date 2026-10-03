<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div
	class={cn(
		"absolute start-0 top-full isolate z-50 flex justify-center"
	)}
>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			"origin-top-center relative mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground duration-100 data-[state=open]:animate-in data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:zoom-out-90",
			"h-[calc(var(--bits-navigation-menu-viewport-height)_+_1rem)] md:w-[calc(var(--bits-navigation-menu-viewport-width)_+_1rem)]",
			className
		)}
		{...restProps}
	/>
</div>
