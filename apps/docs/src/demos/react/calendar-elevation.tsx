import { Calendar } from "@edmi-react/ui/calendar";
import { useState } from "react";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

function Example({
	elevation,
}: {
	elevation: "sunken" | "flat" | "raised" | "floating";
}) {
	const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 16));
	return (
		<Calendar
			elevation={elevation}
			mode="single"
			selected={date}
			onSelect={setDate}
			defaultMonth={date}
		/>
	);
}

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Example elevation={value} />
				</div>
			))}
		</div>
	);
}
