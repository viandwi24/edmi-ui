<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { LayoutTypes } from "."
import { ChevronDown } from "@lucide/vue"
import { useDateFormatter } from "reka-ui"
import { createYear, createYearRange, toDate } from "reka-ui/date"
import { computed } from "vue"

// ✦ Month/year dropdown caption (React `captionLayout="dropdown"`): a styled native <select> under a label.
const props = defineProps<{
  date: DateValue
  layout?: LayoutTypes
  locale?: string
  yearRange?: DateValue[]
  minValue?: DateValue
  maxValue?: DateValue
}>()
const emit = defineEmits<{ (e: "update:placeholder", value: DateValue): void }>()

const formatter = useDateFormatter(props.locale ?? "en")

const years = computed(
  () =>
    props.yearRange ??
    createYearRange({
      start: props.minValue ?? props.date.cycle("year", -100),
      end: props.maxValue ?? props.date.cycle("year", 10),
    }),
)
const months = computed(() => createYear({ dateObj: props.date }))

const wrap =
  "relative rounded-md border border-input bg-card has-focus:border-ring has-focus:shadow-ring"
const label =
  "pointer-events-none flex h-7 items-center gap-1 rounded-md pr-1.5 pl-2 text-[13px] font-medium [&>svg]:size-3.5 [&>svg]:text-muted-foreground"
const select = "absolute inset-0 w-full cursor-pointer bg-popover opacity-0"
</script>

<template>
  <div class="flex h-7 w-full items-center justify-center gap-1.5">
    <div v-if="layout !== 'year-only'" :class="wrap">
      <div :class="label">
        {{ formatter.custom(toDate(date), { month: "short" }) }}
        <ChevronDown />
      </div>
      <select
        :class="select"
        aria-label="Month"
        :value="date.month"
        @change="(e: Event) => emit('update:placeholder', date.set({ month: Number((e.target as HTMLSelectElement).value) }))"
      >
        <option v-for="m in months" :key="m.toString()" :value="m.month">
          {{ formatter.custom(toDate(m), { month: "short" }) }}
        </option>
      </select>
    </div>
    <span v-else class="text-[13px] font-medium">
      {{ formatter.custom(toDate(date), { month: "short" }) }}
    </span>
    <div v-if="layout !== 'month-only'" :class="wrap">
      <div :class="label">
        {{ formatter.custom(toDate(date), { year: "numeric" }) }}
        <ChevronDown />
      </div>
      <select
        :class="select"
        aria-label="Year"
        :value="date.year"
        @change="(e: Event) => emit('update:placeholder', date.set({ year: Number((e.target as HTMLSelectElement).value) }))"
      >
        <option v-for="y in years" :key="y.toString()" :value="y.year">
          {{ formatter.custom(toDate(y), { year: "numeric" }) }}
        </option>
      </select>
    </div>
    <span v-else class="text-[13px] font-medium">
      {{ formatter.custom(toDate(date), { year: "numeric" }) }}
    </span>
  </div>
</template>
