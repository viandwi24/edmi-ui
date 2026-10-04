<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@edmi-vue/ui/button-group";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-4">
        <ButtonGroup :elevation="level.value">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
        <ButtonGroup :elevation="level.value">
          <Button variant="secondary">Buy</Button>
          <ButtonGroupSeparator />
          <Button variant="secondary">Sell</Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
</template>
