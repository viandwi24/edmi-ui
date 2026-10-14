<script lang="ts" module>
	export type PodiumAllocation = {
		label: string;
		/** Weight in percent (bars are proportional). */
		value: number;
		/** Any CSS color; defaults cycle `--chart-1…5`. */
		color?: string;
	};

	export type PodiumEntry = {
		rank: 1 | 2 | 3;
		name: string;
		/** Mono caption under the name, e.g. `$49.2K · 412 members`. */
		meta?: string;
		image?: string;
		/** Avatar initials; defaults to the first two letters of `name`. */
		initials?: string;
		href?: string;
		/** ✦ `variant="cards"`: mono ticker under the name. */
		symbol?: string;
		/** ✦ `variant="cards"`: mono owner, top right of the card. */
		owner?: string;
		/** ✦ `variant="cards"`: signed headline percentage, e.g. `+1.12%`. */
		change?: string;
		/** ✦ `variant="cards"`: series for the sparkline. */
		spark?: number[];
		/** ✦ `variant="cards"`: weights bar with legend. */
		allocation?: PodiumAllocation[];
		/** ✦ `variant="cards"`: footer stat, labelled by `valueLabel`. */
		value?: string;
		/** ✦ `variant="cards"`: footer stat, labelled by `countLabel`. */
		count?: string | number;
	};
</script>

<script lang="ts">
	import { AllocationBar } from "$lib/registry/ui/allocation-bar/index.js";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/registry/ui/avatar/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import { Sparkline } from "$lib/registry/ui/index-row/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLOlAttributes } from "svelte/elements";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		entries,
		elevation = "auto",
		variant = "podium",
		valueLabel = "Value",
		countLabel = "Count",
		...restProps
	}: WithElementRef<Omit<HTMLOlAttributes, "children">, HTMLOListElement> & {
		entries: PodiumEntry[];
		/** ✦ depth of the cards (forwarded to each Card). */
		elevation?: Elevation;
		/** ✦ `podium` (default) or `cards`. */
		variant?: "podium" | "cards";
		/** ✦ `cards`: label of the footer `value` stat. */
		valueLabel?: string | Snippet;
		/** ✦ `cards`: label of the footer `count` stat. */
		countLabel?: string | Snippet;
	} = $props();

	const isDown = (s: string) => /^[-−–]/.test(s.trim());

	// `podium` (default): #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
	// `cards` ✦: three equal stat cards in rank order (leaderboard board).
	const ordered = $derived(
		(variant === "cards" ? ([1, 2, 3] as const) : ([2, 1, 3] as const))
			.map((r) => entries.find((e) => e.rank === r))
			.filter((e): e is PodiumEntry => !!e)
	);
</script>

{#snippet text(v: string | Snippet)}
	{#if typeof v === "function"}{@render v()}{:else}{v}{/if}
{/snippet}

{#if variant === "cards"}
	<ol
		bind:this={ref}
		data-slot="leaderboard-podium"
		data-variant="cards"
		class={cn("grid gap-4 lg:grid-cols-3", className)}
		{...restProps}
	>
		{#each ordered as e (e.rank)}
			{@const down = e.change ? isDown(e.change) : false}
			<li>
				<Card {elevation} class="h-full gap-0 p-6">
					<div class="flex items-center justify-between text-[13px]">
						<span class="font-medium">No. {e.rank}</span>
						{#if e.owner}<span class="font-mono text-xs text-muted-foreground">{e.owner}</span>{/if}
					</div>
					<div class="mt-3 flex items-center gap-3">
						<Avatar class="size-11 rounded-xl after:rounded-xl">
							{#if e.image}<AvatarImage src={e.image} alt="" class="rounded-xl" />{/if}
							<AvatarFallback class="rounded-xl bg-muted font-mono text-sm text-foreground-2">
								{(e.initials ?? e.name.slice(0, 2)).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							{#if e.href}
								<a href={e.href} class="text-lg font-medium hover:underline">{e.name}</a>
							{:else}
								<div class="text-lg font-medium">{e.name}</div>
							{/if}
							{#if e.symbol}<div class="font-mono text-xs text-muted-foreground">{e.symbol}</div>{/if}
						</div>
					</div>
					{#if e.change}
						<div class="mt-4 flex items-end justify-between gap-3">
							<span class={cn("text-[30px] leading-none tracking-[-0.8px]", down ? "text-destructive-text" : "text-brand-text")}>
								{e.change}
							</span>
							{#if e.spark}
								<Sparkline data={e.spark} tone={down ? "down" : "up"} width={150} height={34} class="max-w-[45%]" />
							{/if}
						</div>
					{/if}
					{#if e.allocation?.length}
						<AllocationBar segments={e.allocation} size="sm" class="mt-4" />
					{/if}
					{#if e.value !== undefined || e.count !== undefined}
						<div class="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground">
							{#if e.value !== undefined}<span>{@render text(valueLabel)} <b class="font-mono font-medium text-foreground">{e.value}</b></span>{/if}
							{#if e.count !== undefined}<span>{@render text(countLabel)} <b class="font-mono font-medium text-foreground">{e.count}</b></span>{/if}
						</div>
					{/if}
				</Card>
			</li>
		{/each}
	</ol>
{:else}
	<ol bind:this={ref} data-slot="leaderboard-podium" class={cn("flex items-start gap-3", className)} {...restProps}>
		{#each ordered as e (e.rank)}
			<li class={cn("w-[200px]", e.rank !== 1 && "mt-6")}>
				<Card size="sm" {elevation} class="items-center gap-0 p-[18px] text-center">
					<Badge shape="number" variant={e.rank === 1 ? "warning" : "secondary"} class="rounded-full">#{e.rank}</Badge>
					<Avatar class="mt-3 size-11">
						{#if e.image}<AvatarImage src={e.image} alt="" />{/if}
						<AvatarFallback class="bg-linear-to-br from-info to-brand text-sm text-white">
							{(e.initials ?? e.name.slice(0, 2)).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					{#if e.href}
						<a href={e.href} class="mt-2.5 font-semibold hover:underline">{e.name}</a>
					{:else}
						<div class="mt-2.5 font-semibold">{e.name}</div>
					{/if}
					{#if e.meta}<div class="mt-0.5 font-mono text-xs text-muted-foreground">{e.meta}</div>{/if}
				</Card>
			</li>
		{/each}
	</ol>
{/if}
