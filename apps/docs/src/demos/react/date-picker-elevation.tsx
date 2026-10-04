import { DatePicker } from "@edmi-react/blocks/date-picker/date-picker";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<DatePicker elevation={value} defaultValue={new Date(2026, 9, 16)} />
				</div>
			))}
		</div>
	);
}
