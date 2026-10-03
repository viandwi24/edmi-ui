<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Card } from '@/registry/edmi/ui/card'
import { Separator } from '@/registry/edmi/ui/separator'
import { cn } from '@/registry/edmi/lib/utils'
import type { FooterColumn } from './types'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  description?: string
  columns?: FooterColumn[]
  /** Bottom-left legal line (or slot `legal`). */
  legal?: string
  /** Bottom-right note (or slot `note`). */
  note?: string
}>()
// Slots: `brand` (logo + wordmark), `socials` (icon buttons), `legal`, `note`.
</script>

<template>
  <Card :raised="raised" data-slot="site-footer" :class="cn('gap-0 px-8 py-7', props.class)">
    <div class="flex flex-wrap justify-between gap-8">
      <div class="flex flex-col gap-3">
        <slot name="brand" />
        <span v-if="description" class="max-w-[260px] text-[12.5px] text-muted-foreground">
          {{ description }}
        </span>
        <div v-if="$slots.socials" class="flex items-center gap-2">
          <slot name="socials" />
        </div>
      </div>
      <nav v-for="(col, i) in columns" :key="i" class="flex flex-col gap-2 text-[13.5px]">
        <span class="text-xs text-muted-foreground">{{ col.title }}</span>
        <a
          v-for="l in col.links"
          :key="l.href + l.label"
          :href="l.href"
          class="w-fit hover:text-foreground-2"
        >{{ l.label }}</a>
      </nav>
    </div>
    <template v-if="legal || note || $slots.legal || $slots.note">
      <Separator class="mt-[22px] mb-3.5" />
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span><slot name="legal">{{ legal }}</slot></span>
        <span><slot name="note">{{ note }}</slot></span>
      </div>
    </template>
  </Card>
</template>
