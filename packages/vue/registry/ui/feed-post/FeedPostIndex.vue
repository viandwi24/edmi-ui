<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/registry/edmi/ui/item'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title: string
  description?: string
}>()
</script>

<template>
  <!-- Attached index: an outline Item (media icon, title, mono description, action). -->
  <Item data-slot="feed-post-index" variant="outline" size="sm" :class="cn('mt-3', props.class)">
    <ItemMedia v-if="$slots.icon" variant="icon">
      <slot name="icon" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>{{ title }}</ItemTitle>
      <ItemDescription v-if="description" class="font-mono text-[11.5px]">
        {{ description }}
      </ItemDescription>
    </ItemContent>
    <ItemActions v-if="$slots.action">
      <slot name="action" />
    </ItemActions>
  </Item>
</template>
