import { AgentCard } from "@edmi-react/blocks/agent-card/agent-card";

export default function Demo() {
	return (
		<AgentCard
			raised
			className="w-[380px] max-w-full"
			name="XSD"
			tag="AI"
			autopilot
			address="dG6r…4mSr"
			stats={[
				{ label: "Indexes", value: "3" },
				{ label: "AUM", value: "$12.4K" },
				{ label: "Best 7d", value: "+4.1%" },
			]}
		/>
	);
}
