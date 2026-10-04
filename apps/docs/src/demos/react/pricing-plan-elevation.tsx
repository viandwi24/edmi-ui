import { PricingPlan } from "@edmi-react/blocks/pricing-plan/pricing-plan";
import { Button } from "@edmi-react/ui/button";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<PricingPlan
			elevation={elevation}
			className="w-[300px] max-w-full"
			name="Creator"
			tagline="Launch your own index"
			price="1% fee to you"
			priceNote="Earned on every holder’s share."
			action={<Button size="lg">Launch an index</Button>}
			features={[
				"Custom weights and mandate",
				"Pre-IPO sleeve",
				"Share cards and Blinks",
			]}
		/>
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
