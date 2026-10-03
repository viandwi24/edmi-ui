import { Calendar } from "@edmi-react/ui/calendar";
import * as React from "react";

export default function Demo() {
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2026, 9, 16),
	);
	return (
		<Calendar
			mode="single"
			captionLayout="dropdown"
			selected={date}
			onSelect={setDate}
			defaultMonth={date}
			startMonth={new Date(2020, 0)}
			endMonth={new Date(2030, 11)}
			className="rounded-xl border border-border"
		/>
	);
}
