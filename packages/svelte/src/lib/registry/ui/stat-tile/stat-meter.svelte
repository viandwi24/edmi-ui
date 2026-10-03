<script lang="ts" module>
	export type MeterZone = {
		/** Upper bound of the zone, 0..1. */
		upTo: number;
		/** Any CSS color, e.g. `var(--chart-1)`. */
		color: string;
	};

	const defaultZones: MeterZone[] = [
		{ upTo: 0.5, color: "var(--chart-1)" },
		{ upTo: 0.8, color: "var(--chart-3)" },
		{ upTo: 1, color: "var(--chart-5)" },
	];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		value,
		steps = 30,
		zones = defaultZones,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children">> & {
		value: number;
		steps?: number;
		zones?: MeterZone[];
	} = $props();

	// Segmented meter: `steps` flat bars, filled up to `value` (0..1), the rest dimmed.
	const bars = $derived(
		Array.from({ length: steps }, (_, i) => {
			const at = (i + 1) / steps;
			const zone = zones.find((z) => at <= z.upTo) ?? zones[zones.length - 1];
			return { dim: at > value, color: zone?.color };
		})
	);
</script>

<div
	bind:this={ref}
	data-slot="stat-meter"
	role="meter"
	aria-valuemin={0}
	aria-valuemax={1}
	aria-valuenow={value}
	class={cn("flex gap-0.5", className)}
	{...restProps}
>
	{#each bars as b, i (i)}
		<span class={cn("h-[7px] flex-1", b.dim && "opacity-30")} style:background={b.color}></span>
	{/each}
</div>
