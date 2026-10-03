<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { DateRangePickerPreset } from "."
import type { HTMLAttributes, Ref } from "vue"
import { DateFormatter, endOfMonth, getLocalTimeZone, startOfMonth, today } from "@internationalized/date"
import { CalendarIcon } from "@lucide/vue"
import { useVModel } from "@vueuse/core"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { RangeCalendar } from "@/registry/edmi/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/edmi/ui/popover"

type DateRange = { start: DateValue | undefined; end: DateValue | undefined }

const props = withDefaults(
  defineProps<{
    modelValue?: DateRange
    defaultValue?: DateRange
    placeholder?: string
    locale?: string
    disabled?: boolean
    /** ✦ `true` for the default presets, or your own list. */
    presets?: boolean | DateRangePickerPreset[]
    /** ✦ forwarded to the trigger Button and the RangeCalendar */
    raised?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { placeholder: "Pick a date range", locale: "en-US", raised: false },
)
const emits = defineEmits<{ (e: "update:modelValue", value: DateRange | undefined): void }>()

const range = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
}) as Ref<DateRange | undefined>

const tz = getLocalTimeZone()
const defaultPresets: DateRangePickerPreset[] = [
  { label: "Today", range: () => ({ start: today(tz), end: today(tz) }) },
  { label: "Last 7 days", range: () => ({ start: today(tz).subtract({ days: 6 }), end: today(tz) }) },
  { label: "Last 30 days", range: () => ({ start: today(tz).subtract({ days: 29 }), end: today(tz) }) },
  { label: "This month", range: () => ({ start: startOfMonth(today(tz)), end: endOfMonth(today(tz)) }) },
]
const list = computed(() => (props.presets === true ? defaultPresets : props.presets || []))

const formatter = computed(() => new DateFormatter(props.locale, { dateStyle: "medium" }))
const label = computed(() => {
  const r = range.value
  if (!r?.start) return props.placeholder
  const from = formatter.value.format(r.start.toDate(tz))
  if (!r.end) return from
  return `${from} – ${formatter.value.format(r.end.toDate(tz))}`
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :raised="raised"
        :disabled="disabled"
        :data-empty="!range?.start"
        :class="cn('w-[260px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground', props.class)"
      >
        <CalendarIcon />
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto flex-row gap-0 p-0" align="start">
      <div v-if="list.length > 0" class="flex w-36 flex-col gap-0.5 border-r border-border p-1.5">
        <Button
          v-for="preset in list"
          :key="preset.label"
          variant="ghost"
          size="sm"
          class="justify-start font-normal"
          @click="range = preset.range()"
        >
          {{ preset.label }}
        </Button>
      </div>
      <RangeCalendar
        v-model="range as any"
        :raised="raised"
        layout="month-and-year"
        :locale="locale"
        :number-of-months="1"
        :default-placeholder="range?.start"
      />
    </PopoverContent>
  </Popover>
</template>
