<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  title?: string
  description?: string
  /**
   * `default`: icon tile, title and description centered.
   * `home` ✦: greeting heading and subtitle on the empty chat; put the composer and suggestions in the default slot.
   */
  variant?: "default" | "home"
}>(), {
  title: "No messages yet",
  description: "Start a conversation to see messages here",
  variant: "default",
})
</script>

<template>
  <div
    data-slot="ai-conversation-empty"
    :data-variant="props.variant"
    :class="cn(
      'flex size-full flex-col items-center justify-center gap-3 p-8 text-center',
      props.variant === 'home' && 'gap-6',
      props.class,
    )"
  >
    <template v-if="props.variant === 'home'">
      <div class="flex flex-col items-center gap-2">
        <div v-if="$slots.icon" class="text-muted-foreground">
          <slot name="icon" />
        </div>
        <h2 class="text-[28px] leading-tight font-normal tracking-[-0.6px] text-foreground-2">
          {{ props.title }}
        </h2>
        <p v-if="props.description" class="text-[15px] text-muted-foreground">
          {{ props.description }}
        </p>
      </div>
      <slot />
    </template>
    <slot v-else>
      <div
        v-if="$slots.icon"
        data-slot="ai-conversation-empty-icon"
        class="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5"
      >
        <slot name="icon" />
      </div>
      <div class="space-y-1">
        <h3 class="text-sm font-semibold">
          {{ props.title }}
        </h3>
        <p v-if="props.description" class="text-[13px] text-muted-foreground">
          {{ props.description }}
        </p>
      </div>
    </slot>
  </div>
</template>
