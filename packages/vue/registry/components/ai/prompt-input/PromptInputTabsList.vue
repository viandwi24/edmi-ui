<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
