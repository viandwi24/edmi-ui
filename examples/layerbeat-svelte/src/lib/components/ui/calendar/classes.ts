// Class strings shared by Calendar and RangeCalendar. Literal for Tailwind's scanner.
// Selected day (single, range start/end) is flat primary; the raised strings (v4 handle recipe) apply when the
// calendar elevation is raised or floating. The calendar SHELL takes the elevation, never the day grid.

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

export const calendarDayClass =
	"relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col items-center justify-center gap-1 rounded-(--cell-radius) border-0 text-[13px] leading-none font-normal whitespace-nowrap cursor-default select-none focus-visible:z-10 focus-visible:shadow-ring [&>span]:text-xs [&>span]:opacity-70 [&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:font-semibold data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground data-[disabled]:opacity-50 data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 data-[unavailable]:text-muted-foreground data-[unavailable]:line-through";

export const calendarSingleSelectedClass =
	"data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground";

export const calendarRangeEdgeClass =
	"data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground";

export const calendarShellElevation = {
	sunken: "rounded-xl border border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "rounded-xl border border-transparent shadow-raised",
	floating: "rounded-xl border border-transparent shadow-floating",
};

// popover / card hosts own the shell: the calendar drops its own edge there
export const calendarShellInHost =
	"in-data-[slot=popover-content]:border-0 in-data-[slot=popover-content]:shadow-none";

// handle recipe: the selected day rises
export const calendarSingleSelectedRaisedClass =
	"data-[selected]:border-transparent data-[selected]:[background-image:var(--r1-p-face)] data-[selected]:shadow-btn-raised-primary";

export const calendarRangeEdgeRaisedClass =
	"data-[selection-start]:border-transparent data-[selection-start]:[background-image:var(--r1-p-face)] data-[selection-start]:shadow-btn-raised-primary data-[selection-end]:border-transparent data-[selection-end]:[background-image:var(--r1-p-face)] data-[selection-end]:shadow-btn-raised-primary";

export const calendarRangeMiddleClass =
	"[&[data-selected]:not([data-selection-start]):not([data-selection-end])]:rounded-none [&[data-selected]:not([data-selection-start]):not([data-selection-end])]:bg-accent [&[data-selected]:not([data-selection-start]):not([data-selection-end])]:text-foreground data-[highlighted]:rounded-none data-[highlighted]:bg-accent";
