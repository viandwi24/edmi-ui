<script lang="ts" module>
	export type AllocationSegment = {
		label: string;
		/** Weight in percent (any positive number; bars are proportional). */
		value: number;
		/** Any CSS color; defaults cycle `--chart-1…5`. */
		color?: string;
	};
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		segments,
		showLegend = true,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children">> & {
		segments: AllocationSegment[];
		showLegend?: boolean;
	} = $props();

	const colored = $derived(
		segments.map((s, i) => ({ ...s, color: s.color ?? `var(--chart-${(i % 5) + 1})` }))
	);
</script>

<!-- Weights bar with a legend of label + mono percentage. -->
<div bind:this={ref} data-slot="allocation-bar" class={cn("w-full", className)} {...restProps}>
	<div class="flex gap-[3px]" role="img" aria-label={colored.map((s) => `${s.label} ${s.value}%`).join(", ")}>
		{#each colored as s (s.label)}
			<span class="h-2.5 rounded-full" style:flex={s.value} style:background={s.color}></span>
		{/each}
	</div>
	{#if showLegend}
		<ul class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px]">
			{#each colored as s (s.label)}
				<li class="flex items-center gap-1.5">
					<span class="size-[9px] rounded-[3px]" style:background={s.color}></span>
					{s.label}
					<b class="font-mono font-medium">{s.value}%</b>
				</li>
			{/each}
		</ul>
	{/if}
</div>
