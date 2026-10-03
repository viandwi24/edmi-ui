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
</script>

<template>
  <FeedPost raised class="w-[460px] max-w-full">
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
</template>
