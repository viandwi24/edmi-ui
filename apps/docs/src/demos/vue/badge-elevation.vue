<script setup lang="ts">
import { Badge } from "@edmi-vue/ui/badge";

const variants = ["default", "secondary", "brand", "success", "destructive", "outline"] as const;

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-2">
        <Badge v-for="variant in variants" :key="variant" :variant="variant" :elevation="level.value">{{ variant }}</Badge>
        <Badge variant="brand" shape="pill" :elevation="level.value">pill</Badge>
      </div>
    </div>
  </div>
</template>
