"use client";

import { cn } from "cn";
import * as React from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
	type Locale,
} from "react-day-picker";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

import { Button, buttonVariants } from "@/registry/edmi/ui/button";
import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// Selected day (single, range start/end) is a flat --primary fill. ✦ `elevation` sits on the calendar SHELL
// (sunken / raised / floating); when raised or floating the selected day rises with the handle recipe.
// Class strings are literal for Tailwind's scanner.
const shellElevation = {
	sunken: "rounded-xl border border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "rounded-xl border border-transparent shadow-raised",
	floating: "rounded-xl border border-transparent shadow-floating",
};
function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "outline",
	locale,
	formatters,
	components,
	elevation,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
	/** ✦ depth of the calendar shell: sunken -1, flat 0, raised +1, floating +2 (selected day rises when raised). */
	elevation?: Elevation;
}) {
	const defaultClassNames = getDefaultClassNames();
	const shell = useElevation(elevation, "surface");
	const handle = useElevation(
		elevation === "sunken" ? "flat" : elevation,
		"handle",
	);

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"group/calendar bg-card p-3 [--cell-radius:8px] [--cell-size:36px] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				shellElevation[shell],
				"in-data-[slot=popover-content]:border-0 in-data-[slot=popover-content]:shadow-none",
				className,
			)}
			captionLayout={captionLayout}
			locale={locale}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString(locale?.code, { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit", defaultClassNames.root),
				months: cn(
					"relative flex flex-col gap-4 md:flex-row",
					defaultClassNames.months,
				),
				month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
				nav: cn(
					"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-7 rounded-md p-0 select-none aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-7 rounded-md p-0 select-none aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"flex h-7 w-full items-center justify-center px-9",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"flex h-7 w-full items-center justify-center gap-1.5 text-[13px] font-medium",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"relative rounded-md border border-input bg-card has-focus:border-ring has-focus:shadow-ring",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"absolute inset-0 bg-popover opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"font-semibold select-none",
					captionLayout === "label"
						? "text-sm"
						: "flex h-7 items-center gap-1 rounded-md pr-1.5 pl-2 text-[13px] font-medium [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
					defaultClassNames.caption_label,
				),
				month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
				weekdays: cn("flex", defaultClassNames.weekdays),
				weekday: cn(
					"flex h-7 flex-1 items-center justify-center text-[11.5px] font-normal text-muted-foreground select-none",
					defaultClassNames.weekday,
				),
				week: cn("flex w-full", defaultClassNames.week),
				week_number_header: cn(
					"w-(--cell-size) select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"text-[11.5px] text-muted-foreground select-none",
					defaultClassNames.week_number,
				),
				day: cn(
					"group/day relative aspect-square h-full w-full p-0 text-center select-none",
					defaultClassNames.day,
				),
				range_start: cn(
					"relative isolate z-0 rounded-l-(--cell-radius) bg-accent",
					defaultClassNames.range_start,
				),
				range_middle: cn("rounded-none", defaultClassNames.range_middle),
				range_end: cn(
					"relative isolate z-0 rounded-r-(--cell-radius) bg-accent",
					defaultClassNames.range_end,
				),
				today: cn("rounded-(--cell-radius)", defaultClassNames.today),
				outside: cn(
					"text-muted-foreground opacity-50 aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn(
					"text-muted-foreground opacity-50",
					defaultClassNames.disabled,
				),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<IconPlaceholder
								lucide="ChevronLeftIcon"
								tabler="IconChevronLeft"
								hugeicons="ArrowLeft01Icon"
								phosphor="CaretLeftIcon"
								remixicon="RiArrowLeftSLine"
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}
					if (orientation === "right") {
						return (
							<IconPlaceholder
								lucide="ChevronRightIcon"
								tabler="IconChevronRight"
								hugeicons="ArrowRight01Icon"
								phosphor="CaretRightIcon"
								remixicon="RiArrowRightSLine"
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}
					return (
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							className={cn("size-4", className)}
							{...props}
						/>
					);
				},
				DayButton: ({ ...props }) => (
					<CalendarDayButton locale={locale} elevation={handle} {...props} />
				),
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-(--cell-size) items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	locale,
	elevation = "flat",
	...props
}: React.ComponentProps<typeof DayButton> & {
	locale?: Partial<Locale>;
	/** selected day depth: raised or floating make it rise */
	elevation?: Elevation;
}) {
	const raised = elevation === "raised" || elevation === "floating";
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString(locale?.code)}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			data-today={modifiers.today && !modifiers.selected}
			className={cn(
				"relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-(--cell-radius) border-0 text-[13px] leading-none font-normal data-[today=true]:bg-accent data-[today=true]:font-semibold data-[today=true]:text-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:shadow-ring data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-foreground [&>span]:text-xs [&>span]:opacity-70",
				"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:hover:bg-primary data-[selected-single=true]:hover:text-primary-foreground",
				"data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:hover:bg-primary data-[range-start=true]:hover:text-primary-foreground",
				"data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:hover:bg-primary data-[range-end=true]:hover:text-primary-foreground",
				raised &&
					"data-[selected-single=true]:border-transparent data-[selected-single=true]:[background-image:var(--r1-p-face)] data-[selected-single=true]:shadow-btn-raised-primary data-[range-start=true]:border-transparent data-[range-start=true]:[background-image:var(--r1-p-face)] data-[range-start=true]:shadow-btn-raised-primary data-[range-end=true]:border-transparent data-[range-end=true]:[background-image:var(--r1-p-face)] data-[range-end=true]:shadow-btn-raised-primary",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
