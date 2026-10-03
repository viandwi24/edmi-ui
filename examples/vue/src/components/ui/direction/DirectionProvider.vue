<script setup lang="ts">
import type { Direction } from 'reka-ui'
import { ConfigProvider } from 'reka-ui'

// Same API as the React item (`direction`); Reka's ConfigProvider calls it `dir`.
// It only provides context (no DOM node): set `dir` on a wrapper element too.
defineProps<{ direction?: Direction }>()
</script>

<template>
  <ConfigProvider :dir="direction ?? 'ltr'">
    <slot />
  </ConfigProvider>
</template>
