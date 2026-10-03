<script setup lang="ts">
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "@edmi-vue/components/ai/plan";
import { Button } from "@edmi-vue/ui/button";

const steps = [
  "1. Quote all four legs on Jupiter",
  "2. Ask for approval",
  "3. Send one transaction and verify weights",
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <Plan v-for="streaming in [false, true]" :key="String(streaming)" :is-streaming="streaming" default-open class="w-full max-w-md">
      <PlanHeader>
        <div>
          <PlanTitle>{{ streaming ? "Planning…" : "Rebalance MAG4" }}</PlanTitle>
          <PlanDescription>3 steps · about 1 minute</PlanDescription>
        </div>
        <PlanAction>
          <PlanTrigger />
        </PlanAction>
      </PlanHeader>
      <PlanContent>
        <p v-for="s in steps" :key="s">{{ s }}</p>
      </PlanContent>
      <PlanFooter>
        <Button size="sm">Start</Button>
        <Button size="sm" variant="ghost">Edit plan</Button>
      </PlanFooter>
    </Plan>
  </div>
</template>
