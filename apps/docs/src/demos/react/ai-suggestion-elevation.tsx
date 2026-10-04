import { Suggestion } from "@edmi-react/components/ai/suggestion";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap gap-2">
						<Suggestion suggestion="Rebalance now" elevation={value} />
						<Suggestion suggestion="Draft a post" elevation={value} />
						<Suggestion
							suggestion="Explain the keeper"
							variant="card"
							elevation={value}
						>
							How rebalancing works
						</Suggestion>
					</div>
				</div>
			))}
		</div>
	);
}
