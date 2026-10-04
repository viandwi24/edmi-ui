import { FeatureRow } from "@edmi-react/blocks/feature-row/feature-row";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex w-[420px] max-w-full flex-col gap-2">
			<FeatureRow elevation={elevation} index="1.1" title="Thesis and weights">
				Describe the thesis, pick up to 10 assets and set their weights.
			</FeatureRow>
			<FeatureRow elevation={elevation} index="1.2" title="Index identity" />
			<FeatureRow elevation={elevation} index="1.3" title="Vault deployment" />
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
