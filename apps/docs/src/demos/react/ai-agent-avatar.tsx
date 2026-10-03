import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";

const agents = ["Keeper", "Writer", "Analyst", "Engineer", "Designer"];

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-5">
				{agents.map((name) => (
					<div key={name} className="flex flex-col items-center gap-1.5">
						<AgentAvatar seed={name.toLowerCase()} label={name} />
						<span className="text-xs text-muted-foreground">{name}</span>
					</div>
				))}
			</div>
			<div className="flex items-center gap-3.5">
				<AgentAvatar seed="keeper" size={20} />
				<AgentAvatar seed="keeper" size={28} />
				<AgentAvatar seed="keeper" size={40} />
				<AgentAvatar seed="keeper" size={56} />
				<AgentAvatar seed="keeper" size={28} tile={false} color="chart-2" />
			</div>
		</div>
	);
}
