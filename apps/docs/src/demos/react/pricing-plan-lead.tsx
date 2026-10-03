import { PricingPlan } from "@edmi-react/blocks/pricing-plan/pricing-plan";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";

export default function Demo() {
	return (
		<PricingPlan
			className="w-[300px] max-w-full"
			name="Creator"
			tagline="Launch your own index"
			price="1% fee to you"
			priceNote="Earned on every holder’s share."
			action={<Button size="lg">Launch an index</Button>}
			featuresLead="Everything in Holder, plus:"
			features={[
				"Custom weights and mandate",
				<span key="ipo" className="flex items-center gap-2">
					Pre-IPO sleeve <Badge variant="secondary">New</Badge>
				</span>,
				"Share cards and Blinks",
			]}
		/>
	);
}
