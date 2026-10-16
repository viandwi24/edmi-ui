<script setup lang="ts">
import type { Rect } from "../data";

/** Decorative pixel art drawn from the rect lists in data.ts. */
defineProps<{ w: number; h: number; rects: Rect[] }>();
</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${h}`"
    shape-rendering="crispEdges"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <rect v-for="(r, i) in rects" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.c" />
  </svg>
</template>
