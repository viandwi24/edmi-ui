import { Toggle } from "@edmi-react/ui/toggle";

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
					<div className="flex flex-wrap items-center gap-3">
						<Toggle elevation={value} aria-label="Bold" defaultPressed>
							<b>B</b>
						</Toggle>
						<Toggle elevation={value} variant="outline" aria-label="Italic">
							<i>I</i>
						</Toggle>
						<Toggle
							elevation={value}
							variant="outline"
							aria-label="Underline"
							defaultPressed
						>
							<u>U</u>
						</Toggle>
					</div>
				</div>
			))}
		</div>
	);
}
