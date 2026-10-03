// Class strings shared by Calendar and RangeCalendar. Literal for Tailwind's scanner.
// Selected day (single, range start/end): flat solid primary; `raised` ✦ adds gradient + hard 2px primary lip.

export const calendarRootClass =
    "group/calendar w-fit bg-card p-3 [--cell-radius:8px] [--cell-size:36px] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent";

export const calendarNavButtonClass =
    "pointer-events-auto size-7 rounded-md p-0 select-none disabled:opacity-50 rtl:rotate-180";

export const calendarHeadCellClass =
    "flex h-7 flex-1 items-center justify-center text-[11.5px] font-normal text-muted-foreground select-none";

export const calendarCellClass =
    "relative flex-1 p-0 text-center focus-within:relative focus-within:z-20";

export const calendarRangeCellClass =
    "relative flex-1 p-0 text-center focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent [&:has([data-selection-start])]:rounded-l-(--cell-radius) [&:has([data-selection-end])]:rounded-r-(--cell-radius)";

export const calendarTriggerClass =
    "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-(--cell-radius) border-0 text-[13px] leading-none font-normal cursor-default focus-visible:z-10 focus-visible:shadow-ring [&>span]:text-xs [&>span]:opacity-70 [&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:font-semibold data-[disabled]:text-muted-foreground data-[disabled]:opacity-50 data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 data-[unavailable]:text-muted-foreground data-[unavailable]:line-through";

export const calendarSingleSelectedClass =
    "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground";

export const calendarSingleSelectedRaisedClass =
    "data-[selected]:bg-linear-to-b data-[selected]:from-primary-hi data-[selected]:to-primary data-[selected]:border-b-primary-lip data-[selected]:shadow-[0_2px_0_var(--primary-lip)] data-[selected]:hover:from-primary-hi data-[selected]:hover:to-primary";

export const calendarRangeEdgeClass =
    "data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground";

export const calendarRangeEdgeRaisedClass =
    "data-[selection-start]:bg-linear-to-b data-[selection-start]:from-primary-hi data-[selection-start]:to-primary data-[selection-start]:border-b-primary-lip data-[selection-start]:shadow-[0_2px_0_var(--primary-lip)] data-[selection-start]:hover:from-primary-hi data-[selection-start]:hover:to-primary data-[selection-end]:bg-linear-to-b data-[selection-end]:from-primary-hi data-[selection-end]:to-primary data-[selection-end]:border-b-primary-lip data-[selection-end]:shadow-[0_2px_0_var(--primary-lip)] data-[selection-end]:hover:from-primary-hi data-[selection-end]:hover:to-primary";

export const calendarRangeMiddleClass =
    "[&[data-selected]:not([data-selection-start]):not([data-selection-end])]:rounded-none [&[data-selected]:not([data-selection-start]):not([data-selection-end])]:bg-accent [&[data-selected]:not([data-selection-start]):not([data-selection-end])]:text-foreground data-[highlighted]:rounded-none data-[highlighted]:bg-accent";
