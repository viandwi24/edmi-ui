import { Calendar } from "@edmi-react/ui/calendar";
import * as React from "react";
import type { DateRange } from "react-day-picker";

export default function Demo() {
	const [range, setRange] = React.useState<DateRange | undefined>({
		from: new Date(2026, 9, 12),
		to: new Date(2026, 9, 18),
	});
	return (
		<Calendar
			mode="range"
			selected={range}
			onSelect={setRange}
			defaultMonth={range?.from}
			className="rounded-xl border border-border"
		/>
	);
}
