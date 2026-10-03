<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps, Snippet } from "svelte";
	import StatMeter from "./stat-meter.svelte";

	let {
		ref = $bindable(null),
		class: className,
		label,
		value,
		delta,
		deltaLabel,
		trend,
		meter,
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "children" | "size"> & {
		label: Snippet | string;
		value: Snippet | string | number;
		delta?: string;
		deltaLabel?: string;
		/** Overrides the sign-based direction of `delta`. */
		trend?: "up" | "down";
		/** Segmented meter under the value. */
		meter?: ComponentProps<typeof StatMeter>;
		children?: Snippet;
	} = $props();

	const down = $derived(trend ? trend === "down" : delta ? /^[-−–]/.test(delta.trim()) : false);
</script>

<!-- KPI tile: label, mono value, delta badge (+ optional meter). Delta direction comes from its sign. -->
<Card bind:ref data-slot="stat-tile" class={cn("w-60 gap-0 px-5 py-[18px]", className)} {...restProps}>
	<div class="text-[13px] text-muted-foreground">
		{#if typeof label === "function"}{@render label()}{:else}{label}{/if}
	</div>
	<div class="mt-1.5 font-mono text-[28px] leading-tight tracking-[-0.5px]">
		{#if typeof value === "function"}{@render value()}{:else}{value}{/if}
	</div>
	{#if meter}
		<StatMeter {...meter} class={cn("mt-2.5", meter.class)} />
	{/if}
	{#if delta}
		<div class="mt-2.5 flex items-center gap-2">
			<Badge variant={down ? "destructive" : "success"} shape="number" class="px-[7px]">{delta}</Badge>
			{#if deltaLabel}<span class="text-xs text-muted-foreground">{deltaLabel}</span>{/if}
		</div>
	{/if}
	{@render children?.()}
</Card>
