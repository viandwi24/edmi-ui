import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import { useState } from "react";

const MAX = 1240;

export default function Demo() {
	const [tab, setTab] = useState("join");
	const [amount, setAmount] = useState("100");
	const n = Number(amount.replace(/,/g, "")) || 0;
	return (
		<JoinPanel
			tabs={[
				{ value: "join", label: "Join" },
				{ value: "redeem", label: "Redeem" },
			]}
			tab={tab}
			onTabChange={setTab}
			label={tab === "join" ? "Amount" : "Shares"}
			currency={tab === "join" ? "USDC" : "MAG4"}
			amount={amount}
			onAmountChange={setAmount}
			onMax={() => setAmount(MAX.toLocaleString("en-US"))}
			amountSize="lg"
			maxLabel="Max 1,240"
			quickAmounts={[
				{ label: "$10", value: "10" },
				{ label: "$50", value: "50" },
				{ label: "$100", value: "100" },
				{ label: "Max" },
			]}
			rows={[
				{
					label: tab === "join" ? "Estimated shares" : "Estimated payout",
					value: (n * 0.9986).toFixed(2),
				},
				{ label: tab === "join" ? "Entry fee" : "Exit fee", value: "0%" },
			]}
			joinLabel={`${tab === "join" ? "Join" : "Redeem"} with ${amount || 0} ${tab === "join" ? "USDC" : "MAG4"}`}
			disabled={n === 0}
			footnote="Self-custodied · Redeem anytime"
			className="w-[380px]"
		/>
	);
}
