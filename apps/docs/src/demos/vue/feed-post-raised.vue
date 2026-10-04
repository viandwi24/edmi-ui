<script setup lang="ts">
import { ChartLineIcon, HeartIcon, GlobeIcon, ListIcon } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import {
  FeedPost,
  FeedPostContent,
  FeedPostFooter,
  FeedPostHeader,
  FeedPostIndex,
  FeedPostStat,
} from "@edmi-vue/ui/feed-post";

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <FeedPost :elevation="l.value" class="w-[460px] max-w-full">
    <FeedPostHeader name="Dewi Lestari" handle="@dewi" time="2h" initials="DL" />
    <FeedPostContent>
      Rebalanced MAG4 after NVDAx drifted to 32.4%. Fees this week: 4.1 USDC.
    </FeedPostContent>
    <FeedPostIndex title="MAG4 · Magnificent Four" description="$0.9998 · +0.53%">
      <template #icon><ChartLineIcon /></template>
      <template #action><Button size="sm">Join</Button></template>
    </FeedPostIndex>
    <FeedPostFooter>
      <FeedPostStat><HeartIcon />24</FeedPostStat>
      <FeedPostStat><ListIcon />6</FeedPostStat>
      <FeedPostStat><GlobeIcon />Share</FeedPostStat>
    </FeedPostFooter>
  </FeedPost>
		</div>
	</div>
</template>
