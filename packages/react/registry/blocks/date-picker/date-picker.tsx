import { cn } from "cn";
import { endOfMonth, format, startOfMonth, subDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

import { Button } from "@/registry/edmi/ui/button";
import { Calendar } from "@/registry/edmi/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/edmi/ui/popover";

// Date Picker = composition, not a component: Popover + outline Button + Calendar.

type TriggerProps = Omit<React.ComponentProps<typeof Button>, "value">;

function DatePicker({
	value,
	defaultValue,
	onValueChange,
	placeholder = "Pick a date",
	raised = false,
	className,
	...props
}: Omit<TriggerProps, "defaultValue" | "onChange"> & {
	value?: Date;
	defaultValue?: Date;
	onValueChange?: (date: Date | undefined) => void;
	placeholder?: string;
	/** ✦ forwarded to the trigger Button and the Calendar */
	raised?: boolean;
}) {
	const [inner, setInner] = React.useState<Date | undefined>(defaultValue);
	const [open, setOpen] = React.useState(false);
	const date = value ?? inner;
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						raised={raised}
						data-empty={!date}
						className={cn(
							"w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
							className,
						)}
						{...props}
					/>
				}
			>
				<IconPlaceholder
					lucide="CalendarIcon"
					tabler="IconCalendar"
					hugeicons="CalendarIcon"
					phosphor="CalendarBlankIcon"
					remixicon="RiCalendarLine"
				/>
				{date ? format(date, "PPP") : <span>{placeholder}</span>}
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					raised={raised}
					captionLayout="dropdown"
					selected={date}
					defaultMonth={date}
					onSelect={(next) => {
						setInner(next);
						onValueChange?.(next);
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}

// ✦ Ranges can offer presets in a column to the left of the calendar.
type Preset = { label: string; range: () => DateRange };

const defaultPresets: Preset[] = [
	{ label: "Today", range: () => ({ from: new Date(), to: new Date() }) },
	{
		label: "Last 7 days",
		range: () => ({ from: subDays(new Date(), 6), to: new Date() }),
	},
	{
		label: "Last 30 days",
		range: () => ({ from: subDays(new Date(), 29), to: new Date() }),
	},
	{
		label: "This month",
		range: () => ({
			from: startOfMonth(new Date()),
			to: endOfMonth(new Date()),
		}),
	},
];

function formatRange(range: DateRange | undefined, placeholder: string) {
	if (!range?.from) return <span>{placeholder}</span>;
	if (!range.to) return format(range.from, "LLL dd, y");
	return `${format(range.from, "LLL dd, y")} – ${format(range.to, "LLL dd, y")}`;
}

function DateRangePicker({
	value,
	defaultValue,
	onValueChange,
	placeholder = "Pick a date range",
	presets,
	raised = false,
	className,
	...props
}: Omit<TriggerProps, "defaultValue" | "onChange"> & {
	value?: DateRange;
	defaultValue?: DateRange;
	onValueChange?: (range: DateRange | undefined) => void;
	placeholder?: string;
	/** ✦ `true` for the default presets, or your own list. */
	presets?: boolean | Preset[];
	/** ✦ forwarded to the trigger Button and the Calendar */
	raised?: boolean;
}) {
	const [inner, setInner] = React.useState<DateRange | undefined>(defaultValue);
	const range = value ?? inner;
	const list = presets === true ? defaultPresets : presets || [];
	const set = (next: DateRange | undefined) => {
		setInner(next);
		onValueChange?.(next);
	};
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						raised={raised}
						data-empty={!range?.from}
						className={cn(
							"w-[260px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
							className,
						)}
						{...props}
					/>
				}
			>
				<IconPlaceholder
					lucide="CalendarIcon"
					tabler="IconCalendar"
					hugeicons="CalendarIcon"
					phosphor="CalendarBlankIcon"
					remixicon="RiCalendarLine"
				/>
				{formatRange(range, placeholder)}
			</PopoverTrigger>
			<PopoverContent className="w-auto flex-row gap-0 p-0" align="start">
				{list.length > 0 && (
					<div className="flex w-36 flex-col gap-0.5 border-r border-border p-1.5">
						{list.map((preset) => (
							<Button
								key={preset.label}
								variant="ghost"
								size="sm"
								className="justify-start font-normal"
								onClick={() => set(preset.range())}
							>
								{preset.label}
							</Button>
						))}
					</div>
				)}
				<Calendar
					mode="range"
					raised={raised}
					numberOfMonths={1}
					selected={range}
					defaultMonth={range?.from}
					onSelect={set}
				/>
			</PopoverContent>
		</Popover>
	);
}

export type { Preset as DatePickerPreset };
export { DatePicker, DateRangePicker };
