<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { Card } from '@/registry/edmi/ui/card'
import { Separator } from '@/registry/edmi/ui/separator'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  name: string
  tagline?: string
  /** Headline price, e.g. "1% fee to you". */
  price?: string
  /** Small note under the price. */
  priceNote?: string
  features?: string[]
  /** ✦ Lead row above the features, e.g. "Included:" or "Everything in Holder, plus:". */
  featuresLead?: string
}>()
// Slot `action` = call to action, usually a full-width `Button`.
// ✦ Slot `features-lead` = rich lead row (overrides `featuresLead`).
// ✦ Scoped slot `feature` ({ feature, index }) = rich content for a feature row (default: the text).
</script>

<template>
  <Card :raised="raised" data-slot="pricing-plan" :class="cn('gap-0 p-6', props.class)">
    <div class="text-[22px] font-semibold">{{ name }}</div>
    <div v-if="tagline" class="mt-1 text-[13.5px] text-muted-foreground">{{ tagline }}</div>
    <div v-if="price" class="mt-[22px] text-[22px] font-semibold">{{ price }}</div>
    <div v-if="priceNote" class="mt-1 text-[12.5px] text-muted-foreground">{{ priceNote }}</div>
    <div v-if="$slots.action" class="mt-[18px] [&>[data-slot=button]]:w-full">
      <slot name="action" />
    </div>
    <template v-if="features?.length">
      <Separator class="my-[18px]" />
      <div v-if="featuresLead || $slots['features-lead']" data-slot="pricing-plan-lead" class="mb-3.5 text-[15px] font-semibold">
        <slot name="features-lead">
          {{ featuresLead }}
        </slot>
      </div>
      <ul class="flex flex-col gap-2.5 text-[13.5px]">
        <li v-for="(f, i) in features" :key="i" class="flex items-center gap-2.5">
          <Check class="size-3.5 text-muted-foreground" />
          <slot name="feature" :feature="f" :index="i">
            {{ f }}
          </slot>
        </li>
      </ul>
    </template>
  </Card>
</template>
