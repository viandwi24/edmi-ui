<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IndexRowHeaderLabels } from '.'
import { computed } from 'vue'
import { TableHead, TableRow } from '@/components/ui/table'

const props = defineProps<{
  /** ✦ Leading empty cell for the `rank` column of IndexRow. */
  rank?: boolean
  /** Column labels (each defaults to a neutral English word). */
  labels?: IndexRowHeaderLabels
  class?: HTMLAttributes['class']
}>()

const l = computed(() => ({
  name: 'Name',
  owner: 'Owner',
  price: 'Price',
  change: 'Change',
  value: 'Value',
  count: 'Count',
  trend: 'Trend',
  ...props.labels,
}))
</script>

<template>
  <!-- Header row matching the IndexRow columns. Place it in `<TableHeader>`. -->
  <TableRow :class="props.class">
    <TableHead v-if="props.rank" class="w-10" />
    <TableHead>{{ l.name }}</TableHead>
    <TableHead>{{ l.owner }}</TableHead>
    <TableHead class="text-right">
      {{ l.price }}
    </TableHead>
    <TableHead class="text-right">
      {{ l.change }}
    </TableHead>
    <TableHead class="text-right">
      {{ l.value }}
    </TableHead>
    <TableHead class="text-right">
      {{ l.count }}
    </TableHead>
    <TableHead class="text-right">
      {{ l.trend }}
    </TableHead>
  </TableRow>
</template>
