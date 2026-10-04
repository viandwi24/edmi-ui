<script setup lang="ts">
import { Bubble, BubbleContent, BubbleReaction, BubbleReactions } from "@edmi-vue/ui/bubble";

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
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
      <BubbleReactions :elevation="l.value">
        <BubbleReaction active>👍 4</BubbleReaction>
        <BubbleReaction>🚀 2</BubbleReaction>
      </BubbleReactions>
    </Bubble>
  </div>
		</div>
	</div>
</template>
