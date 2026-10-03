<script lang="ts" module>
	export type AgentCardStat = { label: string; value: string | number };
</script>

<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import AgentIdenticon from "./agent-identicon.svelte";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		name,
		address,
		tag,
		autopilot,
		stats,
		seed,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "children"> & {
		name: string;
		/** Mono sub line, usually a shortened address. */
		address?: string;
		/** Secondary badge next to the name (e.g. "AI"). */
		tag?: string;
		/** Shows the brand "Autopilot" badge. */
		autopilot?: boolean;
		stats?: AgentCardStat[];
		/** Identicon seed; defaults to `name`. */
		seed?: string;
	} = $props();
</script>

<Card data-slot="agent-card" class={cn("gap-0 p-5", className)} {...restProps}>
	<div class="flex items-center gap-3.5">
		<AgentIdenticon seed={seed ?? name} />
		<div class="min-w-0">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-base font-semibold">{name}</span>
				{#if tag}<Badge variant="secondary">{tag}</Badge>{/if}
				{#if autopilot}
					<Badge variant="brand">
						<span class="size-1.5 rounded-full bg-current"></span>
						Autopilot
					</Badge>
				{/if}
			</div>
			{#if address}
				<div class="mt-1 font-mono text-xs text-muted-foreground">{address}</div>
			{/if}
		</div>
	</div>
	{#if stats?.length}
		<div class="mt-4 flex justify-between border-t border-border pt-3.5">
			{#each stats as s (s.label)}
				<div>
					<div class="text-xs text-muted-foreground">{s.label}</div>
					<div class="mt-1 font-mono text-[19px]">{s.value}</div>
				</div>
			{/each}
		</div>
	{/if}
</Card>
