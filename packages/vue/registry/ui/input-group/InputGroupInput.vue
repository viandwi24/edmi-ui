<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Input } from '@/registry/edmi/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    data-slot="input-group-control"
    :class="cn(
      'h-auto flex-1 rounded-none border-0 bg-transparent shadow-none! focus-visible:shadow-none! disabled:bg-transparent aria-invalid:shadow-none! data-[invalid]:shadow-none!',
      props.class,
    )"
  />
</template>
