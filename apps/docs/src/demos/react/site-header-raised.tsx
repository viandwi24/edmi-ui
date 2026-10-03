import { SiteHeader } from "@edmi-react/blocks/site-header/site-header";
import { Button } from "@edmi-react/ui/button";

export default function Demo() {
	return (
		<SiteHeader
			raised
			lead="How to"
			steps={[
				{ label: "Start", href: "#start" },
				{ label: "Build", href: "#build" },
				{ label: "Sell", href: "#sell" },
				{ label: "Scale", href: "#scale" },
			]}
			links={[
				{ label: "Resources", href: "#resources" },
				{ label: "Pricing", href: "#pricing" },
			]}
			action={<Button raised>Create an index</Button>}
		/>
	);
}
