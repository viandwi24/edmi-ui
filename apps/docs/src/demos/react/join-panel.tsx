import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import { useState } from "react";

export default function Demo() {
	const [amount, setAmount] = useState("1,000");
	const n = Number(amount.replace(/,/g, "")) || 0;
	return (
		<JoinPanel
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
		/>
	);
}
