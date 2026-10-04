<script setup lang="ts">
import type { Layout } from './layout'

defineProps<{ layout: Layout }>()

const bar = 'block rounded-sm bg-[color-mix(in_srgb,var(--muted-foreground)_20%,var(--card))]'
</script>

<template>
  <div class="flex h-24 w-full overflow-hidden rounded-lg border border-sk-bd bg-sk-bg shadow-sunken">
    <template v-if="layout === 'dashboard'">
      <div class="flex w-[46px] flex-col gap-1.5 border-r border-border p-1.5">
        <span v-for="i in 4" :key="i" :class="`${bar} h-1.5`" />
      </div>
      <div class="flex flex-1 flex-col gap-1.5 p-2">
        <span :class="`${bar} h-2 w-3/5`" />
        <span :class="`${bar} h-10`" />
      </div>
    </template>
    <div v-else class="flex flex-1 flex-col">
      <div class="flex h-4 items-center gap-3 border-b border-border px-2">
        <span :class="`${bar} h-1.5 w-[30px]`" />
        <span :class="`${bar} h-1.5 w-[60px]`" />
      </div>
      <div class="flex flex-col gap-1.5 p-2">
        <span :class="`${bar} h-2 w-3/5`" />
        <span :class="`${bar} h-10`" />
      </div>
    </div>
  </div>
</template>
