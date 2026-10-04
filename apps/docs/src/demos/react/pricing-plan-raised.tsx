import { PricingPlan } from "@edmi-react/blocks/pricing-plan/pricing-plan";
import { Button } from "@edmi-react/ui/button";

export default function Demo() {
	return (
		<PricingPlan
			elevation="raised"
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
