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
		/** Mono caption under the name, e.g. `$49.2K AUM · 412 holders`. */
		meta?: string;
		image?: string;
		/** Avatar initials; defaults to the first two letters of `name`. */
		initials?: string;
		href?: string;
		/** ✦ `variant="cards"`: mono ticker under the name. */
		symbol?: string;
		/** ✦ `variant="cards"`: mono creator, top right of the card. */
		creator?: string;
		/** ✦ `variant="cards"`: signed headline percentage, e.g. `+1.12%`. */
		change?: string;
		/** ✦ `variant="cards"`: series for the sparkline. */
		spark?: number[];
		/** ✦ `variant="cards"`: weights bar with legend. */
		allocation?: PodiumAllocation[];
		/** ✦ `variant="cards"`: footer stats. */
		aum?: string;
		holders?: string | number;
	};
</script>

<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/registry/ui/avatar/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLOlAttributes } from "svelte/elements";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		entries,
		elevation = "auto",
		variant = "podium",
		...restProps
	}: WithElementRef<Omit<HTMLOlAttributes, "children">, HTMLOListElement> & {
		entries: PodiumEntry[];
		/** ✦ depth of the cards (forwarded to each Card). */
		elevation?: Elevation;
		/** ✦ `podium` (default) or `cards`. */
		variant?: "podium" | "cards";
	} = $props();

	const isDown = (s: string) => /^[-−–]/.test(s.trim());
	const color = (c: string | undefined, i: number) => c ?? `var(--chart-${(i % 5) + 1})`;

	// `podium` (default): #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
	// `cards` ✦: three equal stat cards in rank order (leaderboard board).
	const ordered = $derived(
		(variant === "cards" ? ([1, 2, 3] as const) : ([2, 1, 3] as const))
			.map((r) => entries.find((e) => e.rank === r))
			.filter((e): e is PodiumEntry => !!e)
	);

	function sparkPoints(data: number[], width = 150, height = 34) {
		const min = Math.min(...data);
		const span = Math.max(...data) - min || 1;
		const pad = 2;
		return data
			.map((v, i) => {
				const x = pad + (i / (data.length - 1)) * (width - pad * 2);
				const y = pad + (1 - (v - min) / span) * (height - pad * 2);
				return `${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(" ");
	}
</script>

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
						{#if e.creator}<span class="font-mono text-xs text-muted-foreground">{e.creator}</span>{/if}
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
							{#if e.spark && e.spark.length > 1}
								<svg
									width="150"
									height="34"
									viewBox="0 0 150 34"
									fill="none"
									aria-hidden="true"
									class={cn("max-w-[45%]", down ? "text-destructive-text" : "text-success-text")}
								>
									<polyline
										points={sparkPoints(e.spark)}
										stroke="currentColor"
										stroke-width="1.6"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							{/if}
						</div>
					{/if}
					{#if e.allocation?.length}
						<div class="mt-4">
							<div class="flex h-2 gap-[3px]" role="img" aria-label={e.allocation.map((s) => `${s.label} ${s.value}%`).join(", ")}>
								{#each e.allocation as s, i (s.label)}
									<span class="rounded-[3px]" style="flex: {s.value}; background: {color(s.color, i)}"></span>
								{/each}
							</div>
							<ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-2">
								{#each e.allocation as s, i (s.label)}
									<li class="flex items-center gap-1.5">
										<span class="size-2 rounded-[2px]" style="background: {color(s.color, i)}"></span>
										<span class="font-mono">{s.label}</span>
										<b class="font-semibold text-foreground">{s.value}%</b>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if e.aum !== undefined || e.holders !== undefined}
						<div class="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground">
							{#if e.aum !== undefined}<span>AUM <b class="font-mono font-medium text-foreground">{e.aum}</b></span>{/if}
							{#if e.holders !== undefined}<span>Holders <b class="font-mono font-medium text-foreground">{e.holders}</b></span>{/if}
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
