<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import CalendarCaption from "./calendar-caption.svelte";
	import {
		calendarDayClass,
		calendarHeadCellClass,
		calendarNavButtonClass,
		calendarRangeCellClass,
		calendarRangeEdgeClass,
		calendarRangeEdgeRaisedClass,
		calendarRangeMiddleClass,
		calendarRootClass,
		calendarShellElevation,
		calendarShellInHost,
	} from "./classes.js";

	// ✦ Range selection (React `Calendar mode="range"`): start/end raised, days between on `bg-accent`.
	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
		captionLayout = "label",
		locale = "en-US",
		disableDaysOutsideMonth = false,
		elevation = "auto",
		...restProps
	}: WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		/** ✦ depth of the calendar shell: sunken -1, flat 0, raised +1, floating +2 (selected day rises when raised). */
		elevation?: Elevation;
	} = $props();

	const shell = useElevation(() => elevation, "surface");
	const handle = useElevation(() => (elevation === "sunken" ? "flat" : elevation), "handle");
	const raised = $derived(handle.current === "raised" || handle.current === "floating");
</script>

<RangeCalendarPrimitive.Root
	bind:value
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	{locale}
	data-slot="calendar"
	class={cn(calendarRootClass, calendarShellElevation[shell.current], calendarShellInHost, className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<div class="relative flex flex-col gap-4 md:flex-row">
			<nav
				class="pointer-events-none absolute inset-x-0 top-0 flex h-7 w-full items-center justify-between gap-1"
			>
				<RangeCalendarPrimitive.PrevButton
					data-slot="calendar-prev-button"
					class={cn(buttonVariants({ variant: "outline" }), calendarNavButtonClass)}
				>
					<IconPlaceholder
						lucide="ChevronLeftIcon"
						tabler="IconChevronLeft"
						hugeicons="ArrowLeft01Icon"
						phosphor="CaretLeftIcon"
						remixicon="RiArrowLeftSLine"
						class="size-4"
					/>
				</RangeCalendarPrimitive.PrevButton>
				<RangeCalendarPrimitive.NextButton
					data-slot="calendar-next-button"
					class={cn(buttonVariants({ variant: "outline" }), calendarNavButtonClass)}
				>
					<IconPlaceholder
						lucide="ChevronRightIcon"
						tabler="IconChevronRight"
						hugeicons="ArrowRight01Icon"
						phosphor="CaretRightIcon"
						remixicon="RiArrowRightSLine"
						class="size-4"
					/>
				</RangeCalendarPrimitive.NextButton>
			</nav>
			{#each months as month, monthIndex (month)}
				<div class="flex w-full flex-col gap-3">
					<RangeCalendarPrimitive.Header
						data-slot="calendar-header"
						class="flex h-7 w-full items-center justify-center gap-1.5 px-9"
					>
						<CalendarCaption
							{captionLayout}
							month={month.value}
							bind:placeholder
							{locale}
							{monthIndex}
							minValue={restProps.minValue}
							maxValue={restProps.maxValue}
						/>
					</RangeCalendarPrimitive.Header>
					<RangeCalendarPrimitive.Grid data-slot="calendar-grid" class="w-full border-collapse">
						<RangeCalendarPrimitive.GridHead>
							<RangeCalendarPrimitive.GridRow class="flex select-none">
								{#each weekdays as weekday, i (i)}
									<RangeCalendarPrimitive.HeadCell class={calendarHeadCellClass}>
										{weekday.slice(0, 2)}
									</RangeCalendarPrimitive.HeadCell>
								{/each}
							</RangeCalendarPrimitive.GridRow>
						</RangeCalendarPrimitive.GridHead>
						<RangeCalendarPrimitive.GridBody>
							{#each month.weeks as weekDates (weekDates)}
								<RangeCalendarPrimitive.GridRow class="flex w-full">
									{#each weekDates as date (date)}
										<RangeCalendarPrimitive.Cell
											{date}
											month={month.value}
											data-slot="calendar-cell"
											class={calendarRangeCellClass}
										>
											<RangeCalendarPrimitive.Day
												data-slot="calendar-day"
												class={cn(
													buttonVariants({ variant: "ghost", size: "icon" }),
													calendarDayClass,
													calendarRangeMiddleClass,
													calendarRangeEdgeClass,
													raised && calendarRangeEdgeRaisedClass
												)}
											/>
										</RangeCalendarPrimitive.Cell>
									{/each}
								</RangeCalendarPrimitive.GridRow>
							{/each}
						</RangeCalendarPrimitive.GridBody>
					</RangeCalendarPrimitive.Grid>
				</div>
			{/each}
		</div>
	{/snippet}
</RangeCalendarPrimitive.Root>
