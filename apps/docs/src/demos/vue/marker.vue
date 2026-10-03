<script setup lang="ts">
import { Marker, MarkerContent, MarkerIcon } from "@edmi-vue/ui/marker";
import { CircleCheckIcon, SparklesIcon } from "@lucide/vue";
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon><SparklesIcon /></MarkerIcon>
      <MarkerContent>Keeper rebalanced MAG4 · 3 trades</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon><CircleCheckIcon /></MarkerIcon>
      <MarkerContent>Transaction confirmed · slot 318,204,551</MarkerContent>
    </Marker>
  </div>
</template>
