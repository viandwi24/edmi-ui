<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableHead, TableRow } from '@/components/ui/table'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- Header row matching the IndexRow columns. Place it in `<TableHeader>`. -->
  <TableRow :class="props.class">
    <TableHead>Index</TableHead>
    <TableHead>Creator</TableHead>
    <TableHead class="text-right">
      Price
    </TableHead>
    <TableHead class="text-right">
      7d
    </TableHead>
    <TableHead class="text-right">
      AUM
    </TableHead>
    <TableHead class="text-right">
      Holders
    </TableHead>
    <TableHead class="text-right">
      30d
    </TableHead>
  </TableRow>
</template>
