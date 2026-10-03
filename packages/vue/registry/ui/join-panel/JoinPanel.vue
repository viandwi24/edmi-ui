<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { JoinPanelRow } from '.'
import { computed, useId } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'
import { Card } from '@/registry/edmi/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/registry/edmi/ui/input-group'

const props = withDefaults(defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  label?: string
  currency?: string
  defaultAmount?: string
  /** Summary rows (estimated shares, fee, …). Values render mono. */
  rows?: JoinPanelRow[]
  joinLabel?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  label: 'Amount',
  currency: 'USDC',
  defaultAmount: '',
  rows: () => [],
  joinLabel: 'Join',
})

const emit = defineEmits<{
  (e: 'max'): void
  (e: 'join'): void
}>()

// `v-model:amount` = controlled; without it the panel keeps its own value.
const amount = defineModel<string>('amount')
const value = computed(() => amount.value ?? props.defaultAmount)
const id = useId()
</script>

<template>
  <!-- Amount field (mono, Max button, currency) + summary rows + one big action. -->
  <Card :raised="raised" data-slot="join-panel" size="sm" :class="cn('w-80 gap-0', props.class)">
    <label :for="id" class="px-(--card-spacing) text-xs text-muted-foreground">
      {{ label }} ({{ currency }})
    </label>
    <div class="px-(--card-spacing)">
      <InputGroup class="mt-2 h-11">
        <InputGroupInput
          :id="id"
          inputmode="decimal"
          autocomplete="off"
          :model-value="value"
          class="font-mono text-[17px]"
          @update:model-value="(v: string | number) => (amount = String(v))"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" @click="emit('max')">
            Max
          </InputGroupButton>
          <InputGroupText class="bg-transparent px-1.5 text-xs">
            {{ currency }}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div
      v-for="(r, i) in rows"
      :key="i"
      :class="cn('flex items-center justify-between px-(--card-spacing) text-[13px]', i === 0 ? 'mt-3' : 'mt-1.5')"
    >
      <span class="text-muted-foreground">{{ r.label }}</span>
      <span class="font-mono">{{ r.value }}</span>
    </div>
    <div class="mt-3.5 px-(--card-spacing)">
      <Button size="lg" class="w-full" :raised="raised" :disabled="disabled" @click="emit('join')">
        {{ joinLabel }}
      </Button>
    </div>
  </Card>
</template>
