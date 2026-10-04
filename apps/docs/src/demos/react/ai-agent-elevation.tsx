import {
	Agent,
	AgentContent,
	AgentHeader,
	AgentInstructions,
} from "@edmi-react/components/ai/agent";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Agent elevation={value} className="max-w-lg">
						<AgentHeader name="Keeper agent" model="claude-opus" />
						<AgentContent>
							<AgentInstructions>
								Keep every index within its drift limit. Never trade without
								approval when the order is above <b>$500</b>.
							</AgentInstructions>
						</AgentContent>
					</Agent>
				</div>
			))}
		</div>
	);
}
