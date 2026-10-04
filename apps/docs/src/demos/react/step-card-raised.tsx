import { StepCard } from "@edmi-react/blocks/step-card/step-card";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex flex-wrap gap-3">
			<StepCard
				elevation={elevation}
				className="w-[200px]"
				index="01"
				title="Create"
				description="Pick up to 10 assets and set weights."
			/>
			<StepCard
				elevation={elevation}
				className="w-[200px]"
				index="02"
				title="Share"
				description="A link, OG image, feed card and Blink."
			/>
			<StepCard
				elevation={elevation}
				className="w-[200px]"
				index="03"
				title="Join"
				description="Investors pay in USDC in one click."
			/>
		</div>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
