<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";
	import { setProgressPercent } from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		variant = "default",
		children,
		...restProps
	}: Omit<ProgressPrimitive.RootProps, "child"> & { variant?: "default" | "brand" } = $props();

	const percent = $derived(value == null ? null : Math.round((100 * value) / (max ?? 1)));
	setProgressPercent(() => percent);
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	data-variant={variant}
	class={cn("flex flex-wrap gap-3", className)}
	{value}
	{max}
	{...restProps}
>
	{@render children?.()}
	<!-- 8px track: muted fill + 1px border, indicator is --primary (✦ variant="brand"). -->
	<div data-slot="progress-track" class="relative flex h-2 w-full items-center overflow-hidden rounded-full border border-border bg-muted">
		<div
			data-slot="progress-indicator"
			class="h-full w-full flex-1 rounded-full bg-primary transition-all [[data-variant=brand]_&]:bg-brand"
			style="transform: translateX(-{100 - (percent ?? 0)}%)"
		></div>
	</div>
</ProgressPrimitive.Root>
