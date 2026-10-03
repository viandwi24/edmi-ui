<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { PricingPlan } from "@edmi-vue/ui/pricing-plan";
</script>

<template>
  <PricingPlan
    class="w-[300px] max-w-full"
    name="Creator"
    tagline="Launch your own index"
    price="1% fee to you"
    price-note="Earned on every holder’s share."
    :features="['Custom weights and mandate', 'Pre-IPO sleeve', 'Share cards and Blinks']"
  >
    <template #action><Button size="lg">Launch an index</Button></template>
  </PricingPlan>
</template>
