<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import { DateFormatter, getLocalTimeZone } from "@internationalized/date"
import { PhCalendarBlank } from '@phosphor-icons/vue'
import { useVModel } from "@vueuse/core"
import { computed } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Date Picker = composition, not a component: Popover + outline Button + Calendar.
const props = withDefaults(
  defineProps<{
    modelValue?: DateValue
    defaultValue?: DateValue
    placeholder?: string
    locale?: string
    disabled?: boolean
    /** ✦ forwarded to the trigger Button and the Calendar */
    raised?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { placeholder: "Pick a date", locale: "en-US", raised: false },
)
const emits = defineEmits<{ (e: "update:modelValue", value: DateValue | undefined): void }>()

const date = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
}) as Ref<DateValue | undefined>

const formatter = computed(() => new DateFormatter(props.locale, { dateStyle: "long" }))
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :raised="raised"
        :disabled="disabled"
        :data-empty="!date"
        :class="cn('w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground', props.class)"
      >
        <PhCalendarBlank />
        {{ date ? formatter.format(date.toDate(getLocalTimeZone())) : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        :raised="raised"
        layout="month-and-year"
        :locale="locale"
        :default-placeholder="date"
      />
    </PopoverContent>
  </Popover>
</template>
