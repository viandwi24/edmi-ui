<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as FeedPost from "@edmi-svelte/ui/feed-post";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<FeedPost.Root elevation={l.value} class="w-[460px] max-w-full">
	<FeedPost.Header name="Dewi Lestari" handle="@dewi" time="2h" initials="DL" />
	<FeedPost.Content>
		Rebalanced MAG4 after NVDAx drifted to 32.4%. Fees this week: 4.1 USDC.
	</FeedPost.Content>
	<FeedPost.Index title="MAG4 · Magnificent Four" description="$0.9998 · +0.53%">
		{#snippet icon()}
			<IconPlaceholder lucide="ChartLineIcon" tabler="IconChartLine" hugeicons="ChartIcon" phosphor="ChartLineIcon" remixicon="RiLineChartLine" />
		{/snippet}
		{#snippet action()}
			<Button size="sm" elevation={l.value}>Join</Button>
		{/snippet}
	</FeedPost.Index>
	<FeedPost.Footer>
		<FeedPost.Stat>
			<IconPlaceholder lucide="HeartIcon" tabler="IconBell" hugeicons="Notification02Icon" phosphor="HeartIcon" remixicon="RiHeartLine" />
			24
		</FeedPost.Stat>
		<FeedPost.Stat>
			<IconPlaceholder lucide="ListIcon" tabler="IconListDetails" hugeicons="Menu01Icon" phosphor="ListIcon" remixicon="RiListUnordered" />
			6
		</FeedPost.Stat>
		<FeedPost.Stat>
			<IconPlaceholder lucide="LinkIcon" tabler="IconLink" hugeicons="LinkIcon" phosphor="LinkIcon" remixicon="RiLinksLine" />
			Share
		</FeedPost.Stat>
	</FeedPost.Footer>
</FeedPost.Root>
		</div>
	{/each}
</div>
