import { Calendar } from "@edmi-react/ui/calendar";
import * as React from "react";

export default function Demo() {
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2026, 9, 16),
	);
	return (
		<Calendar
			raised
			mode="single"
			selected={date}
			onSelect={setDate}
			defaultMonth={date}
			className="rounded-xl border border-border"
		/>
	);
}
