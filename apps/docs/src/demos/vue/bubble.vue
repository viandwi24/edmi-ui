<script setup lang="ts">
import { Bubble, BubbleContent, BubbleGroup, BubbleReaction, BubbleReactions } from "@edmi-vue/ui/bubble";
import { SmileIcon } from "@lucide/vue";

const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const;
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <BubbleGroup>
      <Bubble v-for="variant in variants" :key="variant" :variant="variant">
        <BubbleContent>{{ variant }} bubble</BubbleContent>
      </Bubble>
    </BubbleGroup>
    <BubbleGroup>
      <Bubble align="end">
        <BubbleContent>Run it and send me the transaction.</BubbleContent>
      </Bubble>
    </BubbleGroup>
    <Bubble variant="secondary" class="mb-3">
      <BubbleContent>The keeper just rebalanced MAG4.</BubbleContent>
      <BubbleReactions>
        <BubbleReaction active>👍 4</BubbleReaction>
        <BubbleReaction>🚀 2</BubbleReaction>
        <BubbleReaction aria-label="Add reaction">
          <SmileIcon class="size-3" />
        </BubbleReaction>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
