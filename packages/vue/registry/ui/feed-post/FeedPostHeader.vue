<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { MoreHorizontal } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/edmi/ui/avatar'
import { Button } from '@/registry/edmi/ui/button'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  name: string
  handle?: string
  time?: string
  /** Image URL; falls back to `initials`. */
  avatarSrc?: string
  initials?: string
}>()

const meta = computed(() => [props.handle, props.time].filter(Boolean).join(' · '))
</script>

<template>
  <div data-slot="feed-post-header" :class="cn('flex items-center gap-2.5', props.class)">
    <Avatar class="size-9">
      <AvatarImage v-if="avatarSrc" :src="avatarSrc" :alt="name" />
      <AvatarFallback class="bg-linear-to-br from-info to-brand text-xs text-white">
        {{ initials ?? name.slice(0, 2).toUpperCase() }}
      </AvatarFallback>
    </Avatar>
    <div class="min-w-0 flex-1 truncate text-sm font-semibold">
      {{ name }}
      <span v-if="meta" class="font-normal text-muted-foreground">{{ meta }}</span>
    </div>
    <!-- Right slot. Defaults to a ghost "more" icon button. -->
    <slot name="actions">
      <Button variant="ghost" size="icon-sm" aria-label="More">
        <MoreHorizontal />
      </Button>
    </slot>
  </div>
</template>
