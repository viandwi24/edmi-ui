import { TickerStrip } from "@edmi-react/blocks/ticker-strip/ticker-strip";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<TickerStrip
			elevation={elevation}
			items={[
				{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
				{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
				{ symbol: "TSLAx", price: "$370.21", change: "−0.31%" },
				{ symbol: "MSFTx", price: "$513.15", change: "+0.12%" },
				{ symbol: "SPYx", price: "$767.86", change: "+0.30%" },
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
