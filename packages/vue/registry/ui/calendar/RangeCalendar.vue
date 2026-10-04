<script lang="ts" setup>
import type { DateValue, RangeCalendarRootEmits, RangeCalendarRootProps } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import type { LayoutTypes } from "."
import { getLocalTimeZone, today } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "@lucide/vue"
import { reactiveOmit, useVModel } from "@vueuse/core"
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"
import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation"
import CalendarCaption from "./CalendarCaption.vue"
import {
  calendarHeadCellClass,
  calendarNavButtonClass,
  calendarRangeCellClass,
  calendarRangeEdgeClass,
  calendarRangeEdgeRaisedClass,
  calendarRangeMiddleClass,
  calendarRootClass,
  calendarShellElevation,
  calendarShellInHost,
  calendarTriggerClass,
} from "./classes"

// ✦ Range selection (React `Calendar mode="range"`): start/end raised, days between on `bg-accent`.
const props = withDefaults(
  defineProps<
    RangeCalendarRootProps & {
      class?: HTMLAttributes["class"]
      layout?: LayoutTypes
      yearRange?: DateValue[]
      /** ✦ depth of the calendar shell: sunken -1, flat 0, raised +1, floating +2 (selected day rises when raised) */
      elevation?: Elevation
    }
  >(),
  { modelValue: undefined, layout: undefined, elevation: undefined },
)
const emits = defineEmits<RangeCalendarRootEmits>()

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
  <RangeCalendarRoot
    v-slot="{ grid, weekDays, date }"
    v-bind="forwarded"
    :weekday-format="props.weekdayFormat ?? 'short'"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn(calendarRootClass, calendarShellElevation[shell], calendarShellInHost, props.class)"
  >
    <RangeCalendarHeader data-slot="calendar-header" class="relative flex h-7 w-full items-center justify-center px-9">
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
      <RangeCalendarHeading v-else data-slot="calendar-heading" class="text-sm font-semibold select-none" />

      <nav class="pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1">
        <RangeCalendarPrev
          data-slot="calendar-prev-button"
          :class="cn(buttonVariants({ variant: 'outline' }), calendarNavButtonClass)"
        >
          <slot name="calendar-prev-icon"><ChevronLeft class="size-4" /></slot>
        </RangeCalendarPrev>
        <RangeCalendarNext
          data-slot="calendar-next-button"
          :class="cn(buttonVariants({ variant: 'outline' }), calendarNavButtonClass)"
        >
          <slot name="calendar-next-icon"><ChevronRight class="size-4" /></slot>
        </RangeCalendarNext>
      </nav>
    </RangeCalendarHeader>

    <div class="mt-3 flex flex-col gap-4 sm:flex-row">
      <RangeCalendarGrid v-for="month in grid" :key="month.value.toString()" data-slot="calendar-grid" class="w-full border-collapse">
        <RangeCalendarGridHead>
          <RangeCalendarGridRow class="flex">
            <RangeCalendarHeadCell v-for="day in weekDays" :key="day" :class="calendarHeadCellClass">
              {{ day.slice(0, 2) }}
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody>
          <RangeCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="flex w-full">
            <RangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="calendar-cell"
              :class="calendarRangeCellClass"
            >
              <RangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="calendar-cell-trigger"
                :class="cn(buttonVariants({ variant: 'ghost', size: 'icon' }), calendarTriggerClass, calendarRangeMiddleClass, calendarRangeEdgeClass, raised && calendarRangeEdgeRaisedClass)"
              />
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
    </div>
  </RangeCalendarRoot>
</template>
