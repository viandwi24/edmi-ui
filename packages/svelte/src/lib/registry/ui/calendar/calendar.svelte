<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import CalendarCaption from "./calendar-caption.svelte";
	import {
		calendarCellClass,
		calendarDayClass,
		calendarHeadCellClass,
		calendarNavButtonClass,
		calendarRootClass,
		calendarSingleSelectedClass,
		calendarSingleSelectedRaisedClass,
	} from "./classes.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
		captionLayout = "label",
		locale = "en-US",
		disableDaysOutsideMonth = false,
		raised = false,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		/** ✦ `dropdown*` renders month/year selects instead of a text heading. */
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		/** ✦ opt-in one-step 3D look for the selected day. */
		raised?: boolean;
	} = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	{locale}
	data-slot="calendar"
	class={cn(calendarRootClass, className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<div class="relative flex flex-col gap-4 md:flex-row">
			<nav
				class="pointer-events-none absolute inset-x-0 top-0 flex h-7 w-full items-center justify-between gap-1"
			>
				<CalendarPrimitive.PrevButton
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
				</CalendarPrimitive.PrevButton>
				<CalendarPrimitive.NextButton
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
				</CalendarPrimitive.NextButton>
			</nav>
			{#each months as month, monthIndex (month)}
				<div class="flex w-full flex-col gap-3">
					<CalendarPrimitive.Header
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
					</CalendarPrimitive.Header>
					<CalendarPrimitive.Grid data-slot="calendar-grid" class="w-full border-collapse">
						<CalendarPrimitive.GridHead>
							<CalendarPrimitive.GridRow class="flex select-none">
								{#each weekdays as weekday, i (i)}
									<CalendarPrimitive.HeadCell class={calendarHeadCellClass}>
										{weekday.slice(0, 2)}
									</CalendarPrimitive.HeadCell>
								{/each}
							</CalendarPrimitive.GridRow>
						</CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridBody>
							{#each month.weeks as weekDates (weekDates)}
								<CalendarPrimitive.GridRow class="flex w-full">
									{#each weekDates as date (date)}
										<CalendarPrimitive.Cell
											{date}
											month={month.value}
											data-slot="calendar-cell"
											class={calendarCellClass}
										>
											<CalendarPrimitive.Day
												data-slot="calendar-day"
												class={cn(
													buttonVariants({ variant: "ghost", size: "icon" }),
													calendarDayClass,
													calendarSingleSelectedClass,
													raised && calendarSingleSelectedRaisedClass
												)}
											/>
										</CalendarPrimitive.Cell>
									{/each}
								</CalendarPrimitive.GridRow>
							{/each}
						</CalendarPrimitive.GridBody>
					</CalendarPrimitive.Grid>
				</div>
			{/each}
		</div>
	{/snippet}
</CalendarPrimitive.Root>
