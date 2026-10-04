<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { JoinPanelQuickAmount, JoinPanelRow, JoinPanelTab } from '.'
import { computed, ref, useId } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/registry/edmi/ui/input-group'
import { Tabs, TabsList, TabsTrigger } from '@/registry/edmi/ui/tabs'

const props = withDefaults(defineProps<{
  /** ✦ depth of the card; raised +1 / floating +2 also raise the tabs, chips and join Button */
  elevation?: Elevation
  label?: string
  currency?: string
  defaultAmount?: string
  /** Summary rows (estimated shares, fee, …). Values render mono. */
  rows?: JoinPanelRow[]
  /** ✦ Join / Redeem style mode tabs above the amount (the IndexDetail board). */
  tabs?: JoinPanelTab[]
  defaultTab?: string
  /** ✦ Chips under the amount field, e.g. `[{ label: '$10', value: '10' }, { label: 'Max' }]`. */
  quickAmounts?: JoinPanelQuickAmount[]
  /** ✦ Small centred note under the action. */
  footnote?: string
  /** ✦ `lg`: taller field with a 26px mono amount (the IndexDetail board). */
  amountSize?: 'default' | 'lg'
  /** ✦ Plain muted text in the field (e.g. `Max 1,240`) instead of the Max button and currency. */
  maxLabel?: string
  joinLabel?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  label: 'Amount',
  currency: 'USDC',
  amountSize: 'default',
  defaultAmount: '',
  rows: () => [],
  joinLabel: 'Join',
  elevation: undefined,
})

// Controls follow an explicit card level: raised/floating raise them, flat/sunken keep them flat; auto leaves them to their own role.
const control = computed(() =>
  props.elevation && props.elevation !== 'auto'
    ? (props.elevation === 'raised' || props.elevation === 'floating' ? 'raised' : 'flat')
    : undefined,
)

const emit = defineEmits<{
  (e: 'max'): void
  (e: 'join'): void
}>()

// ✦ `v-model:tab` = controlled; without it the panel keeps its own tab.
const tab = defineModel<string>('tab')
const innerTab = ref(props.defaultTab ?? props.tabs?.[0]?.value ?? '')
const tabValue = computed({
  get: () => tab.value ?? innerTab.value,
  set: (v: string) => {
    innerTab.value = v
    tab.value = v
  },
})

// `v-model:amount` = controlled; without it the panel keeps its own value.
const amount = defineModel<string>('amount')
const value = computed(() => amount.value ?? props.defaultAmount)
const id = useId()

// Digits, thousands separators and a decimal point only.
function sanitize(v: string) {
  return v.replace(/[^\d.,]/g, '')
}
function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  const clean = sanitize(el.value)
  if (clean !== el.value)
    el.value = clean
}
</script>

<template>
  <!-- Amount field (mono, Max button, currency) + summary rows + one big action. -->
  <Card :elevation="elevation" data-slot="join-panel" size="sm" :class="cn('w-80 gap-0', props.class)">
    <div v-if="tabs?.length" class="mb-5 px-(--card-spacing)">
      <Tabs v-model="tabValue">
        <TabsList :elevation="control" class="w-full">
          <TabsTrigger v-for="t in tabs" :key="t.value" :value="t.value">
            {{ t.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <label :for="id" class="px-(--card-spacing) text-xs text-muted-foreground">
      {{ label }} ({{ currency }})
    </label>
    <div class="px-(--card-spacing)">
      <InputGroup :class="cn('mt-2', amountSize === 'lg' ? 'h-14' : 'h-11')">
        <InputGroupInput
          :id="id"
          inputmode="decimal"
          autocomplete="off"
          :model-value="value"
          :class="cn('font-mono', amountSize === 'lg' ? 'text-[26px]' : 'text-[17px]')"
          @input="onInput"
          @update:model-value="(v: string | number) => (amount = sanitize(String(v)))"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText v-if="maxLabel" class="bg-transparent text-xs">
            {{ maxLabel }}
          </InputGroupText>
          <template v-else>
            <InputGroupButton variant="secondary" @click="emit('max')">
              Max
            </InputGroupButton>
            <InputGroupText class="bg-transparent px-1.5 text-xs">
              {{ currency }}
            </InputGroupText>
          </template>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div v-if="quickAmounts?.length" class="mt-3 flex gap-2 px-(--card-spacing)">
      <Button
        v-for="(q, i) in quickAmounts"
        :key="i"
        type="button"
        variant="secondary"
        size="sm"
        :elevation="control"
        class="flex-1 font-mono"
        @click="q.value !== undefined ? (amount = q.value) : emit('max')"
      >
        {{ q.label }}
      </Button>
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
      <Button size="lg" class="w-full" :elevation="control" :disabled="disabled" @click="emit('join')">
        {{ joinLabel }}
      </Button>
    </div>
    <div v-if="footnote" class="mt-3 px-(--card-spacing) text-center text-xs text-muted-foreground-2">
      {{ footnote }}
    </div>
  </Card>
</template>
