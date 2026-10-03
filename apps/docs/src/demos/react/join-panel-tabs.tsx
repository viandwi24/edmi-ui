import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import { useState } from "react";

export default function Demo() {
	const [tab, setTab] = useState("join");
	const [amount, setAmount] = useState("100");
	return (
		<JoinPanel
			tabs={[
				{ value: "join", label: "Join" },
				{ value: "redeem", label: "Redeem" },
			]}
			tab={tab}
			onTabChange={setTab}
			amount={amount}
			onAmountChange={setAmount}
			onMax={() => setAmount("1240")}
			amountSize="lg"
			maxLabel="Max 1,240"
			quickAmounts={[
				{ label: "$10", value: "10" },
				{ label: "$50", value: "50" },
				{ label: "$100", value: "100" },
				{ label: "Max" },
			]}
			rows={[
				{ label: "Estimated shares", value: "99.86" },
				{ label: "Entry fee", value: "0%" },
			]}
			joinLabel={`${tab === "join" ? "Join" : "Redeem"} with ${amount || 0} USDC`}
			footnote="Self-custodied · Redeem anytime"
			className="w-[380px]"
		/>
	);
}
