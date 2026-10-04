<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import { DateFormatter, getLocalTimeZone } from "@internationalized/date"
import { CalendarIcon } from "@lucide/vue"
import { useVModel } from "@vueuse/core"
import { computed, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { Calendar } from "@/registry/edmi/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/edmi/ui/popover"

// Date Picker = composition, not a component: Popover + outline Button + Calendar.
const props = withDefaults(
  defineProps<{
    modelValue?: DateValue
    defaultValue?: DateValue
    placeholder?: string
    locale?: string
    disabled?: boolean
    /** ✦ forwarded to the trigger Button and the Calendar */
    elevation?: Elevation
    class?: HTMLAttributes["class"]
  }>(),
  { placeholder: "Pick a date", locale: "en-US", elevation: undefined },
)
const emits = defineEmits<{ (e: "update:modelValue", value: DateValue | undefined): void }>()

const date = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
}) as Ref<DateValue | undefined>

const open = ref(false)

const formatter = computed(() => new DateFormatter(props.locale, { dateStyle: "long" }))
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :elevation="elevation"
        :disabled="disabled"
        :data-empty="!date"
        :class="cn('w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground', props.class)"
      >
        <CalendarIcon />
        {{ date ? formatter.format(date.toDate(getLocalTimeZone())) : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        :elevation="elevation"
        layout="month-and-year"
        :locale="locale"
        :default-placeholder="date"
        @update:model-value="open = false"
      />
    </PopoverContent>
  </Popover>
</template>
