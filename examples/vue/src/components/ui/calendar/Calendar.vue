<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps, DateValue } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import type { LayoutTypes } from "."
import { getLocalTimeZone, today } from "@internationalized/date"
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import { reactiveOmit, useVModel } from "@vueuse/core"
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { computed } from "vue"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import CalendarCaption from "./CalendarCaption.vue"
import {
  calendarCellClass,
  calendarHeadCellClass,
  calendarNavButtonClass,
  calendarRootClass,
  calendarShellElevation,
  calendarShellInHost,
  calendarSingleSelectedClass,
  calendarSingleSelectedRaisedClass,
  calendarTriggerClass,
} from "./classes"

const props = withDefaults(
  defineProps<
    CalendarRootProps & {
      class?: HTMLAttributes["class"]
      /** ✦ month/year dropdowns instead of a text heading. */
      layout?: LayoutTypes
      yearRange?: DateValue[]
      /** ✦ depth of the calendar shell: sunken -1, flat 0, raised +1, floating +2 (selected day rises when raised) */
      elevation?: Elevation
    }
  >(),
  { modelValue: undefined, layout: undefined, elevation: undefined },
)
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "layout", "placeholder", "yearRange", "elevation")

const shell = useElevation(() => props.elevation, "surface")
const handle = useElevation(() => (props.elevation === "sunken" ? "flat" : props.elevation), "handle")
const raised = computed(() => handle.value === "raised" || handle.value === "floating")

const placeholder = useVModel(props, "placeholder", emits, {
  passive: true,
  defaultValue: props.defaultPlaceholder ?? today(getLocalTimeZone()),
}) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays, date }"
    v-bind="forwarded"
    :weekday-format="props.weekdayFormat ?? 'short'"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn(calendarRootClass, calendarShellElevation[shell], calendarShellInHost, props.class)"
  >
    <CalendarHeader data-slot="calendar-header" class="relative flex h-7 w-full items-center justify-center px-9">
      <CalendarCaption
        v-if="layout"
        :date="date"
        :layout="layout"
        :locale="props.locale"
        :year-range="props.yearRange"
        :min-value="props.minValue"
        :max-value="props.maxValue"
        @update:placeholder="(v) => (placeholder = v)"
      />
      <CalendarHeading v-else data-slot="calendar-heading" class="text-sm font-semibold select-none" />

      <nav class="pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1">
        <CalendarPrev
          data-slot="calendar-prev-button"
          :class="cn(buttonVariants({ variant: 'outline' }), calendarNavButtonClass)"
        >
          <slot name="calendar-prev-icon"><PhCaretLeft class="size-4" /></slot>
        </CalendarPrev>
        <CalendarNext
          data-slot="calendar-next-button"
          :class="cn(buttonVariants({ variant: 'outline' }), calendarNavButtonClass)"
        >
          <slot name="calendar-next-icon"><PhCaretRight class="size-4" /></slot>
        </CalendarNext>
      </nav>
    </CalendarHeader>

    <div class="mt-3 flex flex-col gap-4 sm:flex-row">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()" data-slot="calendar-grid" class="w-full border-collapse">
        <CalendarGridHead>
          <CalendarGridRow class="flex">
            <CalendarHeadCell v-for="day in weekDays" :key="day" :class="calendarHeadCellClass">
              {{ day.slice(0, 2) }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="flex w-full">
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="calendar-cell"
              :class="calendarCellClass"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="calendar-cell-trigger"
                :class="cn(buttonVariants({ variant: 'ghost', size: 'icon' }), calendarTriggerClass, calendarSingleSelectedClass, raised && calendarSingleSelectedRaisedClass)"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
