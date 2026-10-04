import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import type { Elevation } from "@edmi-react/ui/elevation";
import { useState } from "react";

function Sample({ elevation }: { elevation: Elevation }) {
	const [amount, setAmount] = useState("1,000");
	const n = Number(amount.replace(/,/g, "")) || 0;
	return (
		<JoinPanel
			elevation={elevation}
			amount={amount}
			onAmountChange={setAmount}
			onMax={() => setAmount("2,500")}
			label="Amount"
			currency="USDC"
			rows={[
				{ label: "Estimated shares", value: (n * 0.98209).toFixed(2) },
				{ label: "Fee", value: "1.00%" },
			]}
			joinLabel="Join MAG4"
			disabled={n === 0}
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
