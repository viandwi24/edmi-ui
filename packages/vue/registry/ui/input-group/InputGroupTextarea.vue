<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Textarea } from '@/registry/edmi/ui/textarea'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Textarea
    data-slot="input-group-control"
    elevation="flat"
    :class="cn(
      'flex-1 resize-none rounded-none border-0 bg-transparent py-2.5 shadow-none! focus-visible:shadow-none! disabled:bg-transparent aria-invalid:shadow-none!',
      props.class,
    )"
  />
</template>
