<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Label } from '@/registry/edmi/ui/label'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ choice-card look: one-step 3D (only when the label wraps a Field) */
  raised?: boolean
}>(), { raised: false })
</script>

<template>
  <Label
    data-slot="field-label"
    :class="cn(
      'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:shadow-ring has-[>[data-slot=field]]:has-data-[state=checked]:border-ring has-[>[data-slot=field]]:has-data-[state=checked]:shadow-[0_0_0_1px_var(--ring)] *:data-[slot=field]:p-3.5',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      props.raised && 'has-[>[data-slot=field]]:border-b-lip has-[>[data-slot=field]]:shadow-card has-[>[data-slot=field]]:has-data-[state=checked]:border-b-ring',
      props.class,
    )"
  >
    <slot />
  </Label>
</template>
