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

export default function Demo() {
	return (
		<div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
			{(["flat", "raised"] as const).map((kind) => (
				<RadioGroup key={kind} defaultValue="weekly">
					{options.map((o) => (
						<FieldLabel
							key={o.value}
							raised={kind === "raised"}
							htmlFor={`${kind}-${o.value}`}
						>
							<Field orientation="horizontal">
								<FieldContent>
									<FieldTitle>{o.title}</FieldTitle>
									<FieldDescription>{o.description}</FieldDescription>
								</FieldContent>
								<RadioGroupItem id={`${kind}-${o.value}`} value={o.value} />
							</Field>
						</FieldLabel>
					))}
				</RadioGroup>
			))}
		</div>
	);
}
