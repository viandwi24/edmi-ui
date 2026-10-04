import { SiteHeader } from "@edmi-react/blocks/site-header/site-header";
import { Button } from "@edmi-react/ui/button";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<SiteHeader
			elevation={elevation}
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
			action={<Button elevation={elevation}>Create an index</Button>}
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
