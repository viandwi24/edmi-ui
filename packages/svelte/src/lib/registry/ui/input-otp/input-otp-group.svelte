<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const group = getContext<(() => Elevation) | undefined>("inputOTPElevation");
	const level = useElevation(() => group?.(), "field");

	// ✦ depth (v6): at sunken/raised/floating the group is one plate; slots turn transparent with 1px separators
	const groupElevation = {
		sunken: "rounded-lg border border-sk-bd bg-sk-bg shadow-sunken",
		flat: "",
		raised: "rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised",
		floating: "rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating",
	};
</script>

<div
	bind:this={ref}
	data-slot="input-otp-group"
	class={cn(
		"flex items-center gap-1.5",
		level.current !== "flat" && "inline-flex gap-0",
		groupElevation[level.current],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
