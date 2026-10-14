<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import { Separator } from '@/registry/edmi/ui/separator'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
  name?: string
  tagline?: string
  /** Headline price, e.g. "1% fee to you". */
  price?: string
  /** Small note under the price. */
  priceNote?: string
  features?: string[]
  /** ✦ Lead row above the features, e.g. "Included:" or "Everything in Holder, plus:". */
  featuresLead?: string
}>()
// Slots `name`, `tagline`, `price`, `price-note` (string props are the fallback).
// Slot `action` = call to action, usually a full-width `Button`.
// ✦ Slot `features-lead` = rich lead row (overrides `featuresLead`).
// ✦ Scoped slot `feature` ({ feature, index }) = rich content for a feature row (default: the text).
</script>

<template>
  <Card :elevation="elevation" data-slot="pricing-plan" :class="cn('gap-0 p-6', props.class)">
    <div class="text-[22px] font-semibold"><slot name="name">{{ name }}</slot></div>
    <div v-if="tagline || $slots.tagline" class="mt-1 text-[13.5px] text-muted-foreground"><slot name="tagline">{{ tagline }}</slot></div>
    <div v-if="price || $slots.price" class="mt-[22px] text-[22px] font-semibold"><slot name="price">{{ price }}</slot></div>
    <div v-if="priceNote || $slots['price-note']" class="mt-1 text-[12.5px] text-muted-foreground"><slot name="price-note">{{ priceNote }}</slot></div>
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
