<script setup lang="ts">
import type { HTMLAttributes } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span :class="props.class">
    <slot>·</slot>
  </span>
</template>
