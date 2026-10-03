<script setup lang="ts">
import { ChartLineIcon, HeartIcon, MessageSquareIcon } from "@lucide/vue";
import { ref } from "vue";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-vue/ui/avatar";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
	FeedPost,
	FeedPostContent,
	FeedPostFooter,
	FeedPostHeader,
	FeedPostIndex,
	FeedPostStat,
} from "@edmi-vue/ui/feed-post";
import { Textarea } from "@edmi-vue/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { maxChars, moreUpdates, nav, posts, updates, views } from "./data";

const view = ref("following");
const draft = ref("");
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					raised
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#feed"
				/>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Feed</h1>
					<p class="mt-1 text-lg text-muted-foreground">Ideas from creators and what happens on chain.</p>
				</div>
				<ToggleGroup
					type="single"
					raised
					variant="segmented"
					:model-value="view"
					aria-label="Feed view"
					@update:model-value="(v) => v && (view = String(v))"
				>
					<ToggleGroupItem v-for="v in views" :key="v.value" :value="v.value">{{ v.label }}</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<Card raised class="gap-0 p-0">
				<Textarea
					v-model="draft"
					:maxlength="maxChars"
					placeholder="Share a thesis, a trade idea or an update…"
					aria-label="New post"
					class="min-h-[96px] resize-none rounded-none border-0 bg-transparent px-6 pt-6 shadow-none focus-visible:shadow-none"
				/>
				<div class="mx-6 flex flex-wrap items-center gap-3 border-t border-border-2 py-4">
					<span class="flex-1 text-[13px] text-muted-foreground">Plain text · up to 2 links · needs on-chain activity</span>
					<span class="font-mono text-[13px] text-muted-foreground">{{ draft.length }}/{{ maxChars }}</span>
					<Button raised @click="draft = ''">Post</Button>
				</div>
			</Card>

			<template v-if="view === 'all'">
				<FeedPost v-for="p in posts" :key="p.id" raised>
					<FeedPostHeader :name="p.name" :handle="p.handle" :time="p.time" :initials="p.initials" />
					<FeedPostContent>{{ p.text }}</FeedPostContent>
					<FeedPostIndex :title="p.index.title" :description="p.index.description">
						<template #icon><ChartLineIcon /></template>
						<template #action><Button raised size="sm">Join</Button></template>
					</FeedPostIndex>
					<FeedPostFooter>
						<FeedPostStat><HeartIcon />{{ p.likes }}</FeedPostStat>
						<FeedPostStat><MessageSquareIcon />{{ p.replies }}</FeedPostStat>
					</FeedPostFooter>
				</FeedPost>
			</template>

			<Card raised class="gap-0 p-0">
				<ul class="px-6">
					<li v-for="u in updates" :key="u.id" class="flex items-center gap-3 border-b border-border-2 py-4">
						<span class="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">{{ u.initial }}</span>
						<div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
							<span class="font-mono font-semibold">{{ u.who }}</span>
							<span class="text-foreground-2">{{ u.action }}{{ u.detail ? ` · ${u.detail}` : "" }}</span>
							<span class="text-muted-foreground">·</span>
							<span class="font-mono font-semibold">{{ u.symbol }}</span>
							<AvatarGroup>
								<Avatar v-for="t in u.tokens" :key="t" class="size-7">
									<AvatarFallback class="text-[10px]">{{ t }}</AvatarFallback>
								</Avatar>
							</AvatarGroup>
						</div>
						<span class="text-[13px] whitespace-nowrap text-muted-foreground">{{ u.ago }}</span>
					</li>
				</ul>
				<div class="px-6 py-4 text-[13px] text-muted-foreground">Show {{ moreUpdates }} more updates</div>
			</Card>

			<div class="flex justify-center">
				<Button raised variant="outline" size="lg">Load more</Button>
			</div>
		</div>
	</div>
</template>
