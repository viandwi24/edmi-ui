<script setup lang="ts">
/** Task status: spinning ring while running, green dot when done. */
defineProps<{ status: "running" | "done" }>();
</script>

<template>
  <span v-if="status === 'done'" class="size-1.5 rounded-full bg-success" role="img" aria-label="Done" />
  <svg v-else viewBox="0 0 16 16" class="size-3.5 animate-spin text-muted-foreground" role="img" aria-label="Running">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" />
    <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>
