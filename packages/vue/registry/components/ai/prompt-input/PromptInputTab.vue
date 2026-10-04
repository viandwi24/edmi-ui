<script setup lang="ts">
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
