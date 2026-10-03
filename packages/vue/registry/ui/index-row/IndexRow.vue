<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IndexRowData } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/registry/edmi/ui/avatar'
import { Badge } from '@/registry/edmi/ui/badge'
import { TableCell, TableRow } from '@/registry/edmi/ui/table'
import Sparkline from './Sparkline.vue'

const props = defineProps<{
  index: IndexRowData
  class?: HTMLAttributes['class']
}>()

const down = computed(() => /^[-−–]/.test(props.index.change.trim()))
</script>

<template>
  <!-- One market row: avatar stack, name + ticker + tags, mono numbers, delta, sparkline. Use inside `<TableBody>`. -->
  <TableRow data-slot="index-row" :class="props.class">
    <TableCell>
      <div class="flex items-center gap-3">
        <AvatarGroup>
          <Avatar v-for="t in index.tokens" :key="t.label" class="size-7">
            <AvatarImage v-if="t.image" :src="t.image" alt="" />
            <AvatarFallback class="text-[10px]">
              {{ t.label }}
            </AvatarFallback>
          </Avatar>
        </AvatarGroup>
        <div>
          <div class="flex items-center gap-2">
            <a v-if="index.href" :href="index.href" class="font-semibold hover:underline">{{ index.name }}</a>
            <span v-else class="font-semibold">{{ index.name }}</span>
            <span class="font-mono text-[11.5px] text-muted-foreground">{{ index.symbol }}</span>
          </div>
          <div v-if="index.tags?.length" class="mt-1 flex items-center gap-1">
            <Badge v-for="tag in index.tags" :key="tag" variant="secondary" class="h-5 text-[11px]">
              {{ tag }}
            </Badge>
          </div>
        </div>
      </div>
    </TableCell>
    <TableCell class="font-mono text-xs text-muted-foreground">
      {{ index.creator }}
    </TableCell>
    <TableCell class="text-right font-mono text-[12.5px] font-semibold">
      {{ index.price }}
    </TableCell>
    <TableCell :class="cn('text-right font-mono text-[12.5px]', down ? 'text-destructive-text' : 'text-success-text')">
      {{ index.change }}
    </TableCell>
    <TableCell class="text-right font-mono text-[12.5px]">
      {{ index.aum }}
    </TableCell>
    <TableCell class="text-right font-mono text-[12.5px]">
      {{ index.holders }}
    </TableCell>
    <TableCell class="text-right">
      <Sparkline v-if="index.spark" :data="index.spark" :tone="down ? 'down' : 'up'" />
    </TableCell>
  </TableRow>
</template>
