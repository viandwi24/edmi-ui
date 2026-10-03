<script setup lang="ts">
import { Skeleton } from "@edmi-vue/ui/skeleton";
</script>

<template>
  <div class="flex items-center gap-4">
    <Skeleton class="size-10 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-60" />
      <Skeleton class="h-4 w-44" />
    </div>
  </div>
</template>
