<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";

const variants = ["default", "secondary", "outline", "destructive", "brand", "ghost"] as const;

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }, { value: "sunken", label: "Sunken (-1)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="variant in variants" :key="variant" :variant="variant" :elevation="level.value">{{ variant }}</Button>
        <Button variant="link" :elevation="level.value">link</Button>
      </div>
    </div>
  </div>
</template>
