<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	// Edmi API parity with the React/Vue drawer: `swipeDirection` is the dismiss direction
	// (down = bottom drawer). vaul-svelte names the edge instead (`direction`); either works.
	type SwipeDirection = "up" | "down" | "left" | "right";
	const edgeOf: Record<SwipeDirection, "top" | "bottom" | "left" | "right"> = {
		up: "top",
		down: "bottom",
		left: "left",
		right: "right",
	};

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		swipeDirection,
		direction,
		...restProps
	}: DrawerPrimitive.RootProps & { swipeDirection?: SwipeDirection } = $props();

	const edge = $derived(direction ?? (swipeDirection ? edgeOf[swipeDirection] : undefined));
</script>

<DrawerPrimitive.Root
	{shouldScaleBackground}
	bind:open
	bind:activeSnapPoint
	direction={edge}
	{...restProps}
/>
