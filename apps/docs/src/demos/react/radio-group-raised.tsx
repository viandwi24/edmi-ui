import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@edmi-react/ui/field";
import { RadioGroup, RadioGroupItem } from "@edmi-react/ui/radio-group";

const options = [
	{ value: "weekly", title: "Weekly", description: "Rebalance every Monday." },
	{
		value: "drift",
		title: "On drift",
		description: "Only when a weight drifts.",
	},
];

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
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
					<RadioGroup defaultValue="weekly" className="max-w-sm">
						{options.map((o) => (
							<FieldLabel
								key={o.value}
								elevation={value}
								htmlFor={`${value}-${o.value}`}
							>
								<Field orientation="horizontal">
									<FieldContent>
										<FieldTitle>{o.title}</FieldTitle>
										<FieldDescription>{o.description}</FieldDescription>
									</FieldContent>
									<RadioGroupItem id={`${value}-${o.value}`} value={o.value} />
								</Field>
							</FieldLabel>
						))}
					</RadioGroup>
				</div>
			))}
		</div>
	);
}
