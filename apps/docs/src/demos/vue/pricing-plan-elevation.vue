<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { PricingPlan } from "@edmi-vue/ui/pricing-plan";

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <PricingPlan :elevation="l.value"
    class="w-[300px] max-w-full"
    name="Creator"
    tagline="Launch your own index"
    price="1% fee to you"
    price-note="Earned on every holder’s share."
    :features="['Custom weights and mandate', 'Pre-IPO sleeve', 'Share cards and Blinks']"
  >
    <template #action><Button size="lg">Launch an index</Button></template>
  </PricingPlan>
		</div>
	</div>
</template>
