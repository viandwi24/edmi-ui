<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-svelte/ui/avatar";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as FeedPost from "@edmi-svelte/ui/feed-post";
	import { Textarea } from "@edmi-svelte/ui/textarea";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { maxChars, moreUpdates, nav, posts, updates, views } from "./data";

	let view = $state("following");
	let draft = $state("");
</script>

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#feed"
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Feed</h1>
				<p class="mt-1 text-lg text-muted-foreground">Ideas from creators and what happens on chain.</p>
			</div>
			<ToggleGroup.Root
				type="single"
				raised
				variant="segmented"
				value={view}
				aria-label="Feed view"
				onValueChange={(v) => v && (view = v)}
			>
				{#each views as v (v.value)}
					<ToggleGroup.Item value={v.value}>{v.label}</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
		</div>

		<Card raised class="gap-0 p-0">
			<Textarea
				bind:value={draft}
				maxlength={maxChars}
				placeholder="Share a thesis, a trade idea or an update…"
				aria-label="New post"
				class="min-h-[96px] resize-none rounded-none border-0 bg-transparent px-6 pt-6 shadow-none focus-visible:shadow-none"
			/>
			<div class="mx-6 flex flex-wrap items-center gap-3 border-t border-border-2 py-4">
				<span class="flex-1 text-[13px] text-muted-foreground">Plain text · up to 2 links · needs on-chain activity</span>
				<span class="font-mono text-[13px] text-muted-foreground">{draft.length}/{maxChars}</span>
				<Button raised onclick={() => (draft = "")}>Post</Button>
			</div>
		</Card>

		{#if view === "all"}
			{#each posts as p (p.id)}
				<FeedPost.Root raised>
					<FeedPost.Header name={p.name} handle={p.handle} time={p.time} initials={p.initials} />
					<FeedPost.Content>{p.text}</FeedPost.Content>
					<FeedPost.Index title={p.index.title} description={p.index.description}>
						{#snippet icon()}
							<IconPlaceholder
								lucide="ChartLineIcon"
								tabler="IconChartLine"
								hugeicons="ChartIcon"
								phosphor="ChartLineIcon"
								remixicon="RiLineChartLine"
							/>
						{/snippet}
						{#snippet action()}
							<Button raised size="sm">Join</Button>
						{/snippet}
					</FeedPost.Index>
					<FeedPost.Footer>
						<FeedPost.Stat>
							<IconPlaceholder
								lucide="HeartIcon"
								tabler="IconHeart"
								hugeicons="FavouriteIcon"
								phosphor="HeartIcon"
								remixicon="RiHeartLine"
							/>
							{p.likes}
						</FeedPost.Stat>
						<FeedPost.Stat>
							<IconPlaceholder
								lucide="MessageSquareIcon"
								tabler="IconMessage"
								hugeicons="Comment01Icon"
								phosphor="ChatIcon"
								remixicon="RiChat1Line"
							/>
							{p.replies}
						</FeedPost.Stat>
					</FeedPost.Footer>
				</FeedPost.Root>
			{/each}
		{/if}

		<Card raised class="gap-0 p-0">
			<ul class="px-6">
				{#each updates as u (u.id)}
					<li class="flex items-center gap-3 border-b border-border-2 py-4">
						<span class="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">{u.initial}</span>
						<div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
							<span class="font-mono font-semibold">{u.who}</span>
							<span class="text-foreground-2">{u.action}{u.detail ? ` · ${u.detail}` : ""}</span>
							<span class="text-muted-foreground">·</span>
							<span class="font-mono font-semibold">{u.symbol}</span>
							<AvatarGroup>
								{#each u.tokens as t (t)}
									<Avatar class="size-7">
										<AvatarFallback class="text-[10px]">{t}</AvatarFallback>
									</Avatar>
								{/each}
							</AvatarGroup>
						</div>
						<span class="text-[13px] whitespace-nowrap text-muted-foreground">{u.ago}</span>
					</li>
				{/each}
			</ul>
			<div class="px-6 py-4 text-[13px] text-muted-foreground">Show {moreUpdates} more updates</div>
		</Card>

		<div class="flex justify-center">
			<Button raised variant="outline" size="lg">Load more</Button>
		</div>
	</div>
</div>
