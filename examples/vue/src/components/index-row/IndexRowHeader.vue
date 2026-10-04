<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableHead, TableRow } from '@/components/ui/table'

const props = defineProps<{
  /** ✦ Leading empty cell for the `rank` column of IndexRow. */
  rank?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- Header row matching the IndexRow columns. Place it in `<TableHeader>`. -->
  <TableRow :class="props.class">
    <TableHead v-if="props.rank" class="w-10" />
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
