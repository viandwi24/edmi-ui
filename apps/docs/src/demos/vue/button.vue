<script setup lang="ts">
import { ArrowRight, Plus } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button>Join index</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Delete</Button>
    <Button variant="link">Link</Button>
    <Button variant="brand">
      Continue
      <ArrowRight data-icon="inline-end" />
    </Button>
    <Button size="sm">
      <Plus data-icon="inline-start" />
      Create
    </Button>
    <Button size="icon" variant="outline" aria-label="Add">
      <Plus />
    </Button>
  </div>
</template>
