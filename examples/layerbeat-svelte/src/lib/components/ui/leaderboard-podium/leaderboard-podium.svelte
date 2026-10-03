<script lang="ts" module>
	export type PodiumEntry = {
		rank: 1 | 2 | 3;
		name: string;
		/** Mono caption under the name, e.g. `$49.2K AUM · 412 holders`. */
		meta: string;
		image?: string;
		/** Avatar initials; defaults to the first two letters of `name`. */
		initials?: string;
		href?: string;
	};
</script>

<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "#lib/components/ui/avatar/index.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLOlAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		entries,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLOlAttributes, "children">, HTMLOListElement> & {
		entries: PodiumEntry[];
		/** ✦ opt-in one-step 3D look for the podium cards. */
		raised?: boolean;
	} = $props();

	// Top three: #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
	const ordered = $derived(
		([2, 1, 3] as const)
			.map((r) => entries.find((e) => e.rank === r))
			.filter((e): e is PodiumEntry => !!e)
	);
</script>

<ol bind:this={ref} data-slot="leaderboard-podium" class={cn("flex items-start gap-3", className)} {...restProps}>
	{#each ordered as e (e.rank)}
		<li class={cn("w-[200px]", e.rank !== 1 && "mt-6")}>
			<Card size="sm" {raised} class="items-center gap-0 p-[18px] text-center">
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
				<div class="mt-0.5 font-mono text-xs text-muted-foreground">{e.meta}</div>
			</Card>
		</li>
	{/each}
</ol>
