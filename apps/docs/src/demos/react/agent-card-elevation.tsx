import { AgentCard } from "@edmi-react/blocks/agent-card/agent-card";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<AgentCard
			elevation={elevation}
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
