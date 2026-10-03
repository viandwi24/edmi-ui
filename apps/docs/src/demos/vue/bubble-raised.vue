<script setup lang="ts">
import { Bubble, BubbleContent, BubbleReaction, BubbleReactions } from "@edmi-vue/ui/bubble";
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-8">
    <Bubble variant="secondary">
      <BubbleContent>Flat reactions.</BubbleContent>
      <BubbleReactions>
        <BubbleReaction active>👍 4</BubbleReaction>
        <BubbleReaction>🚀 2</BubbleReaction>
      </BubbleReactions>
    </Bubble>
    <Bubble variant="secondary">
      <BubbleContent>Raised reactions.</BubbleContent>
      <BubbleReactions raised>
        <BubbleReaction active>👍 4</BubbleReaction>
        <BubbleReaction>🚀 2</BubbleReaction>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
