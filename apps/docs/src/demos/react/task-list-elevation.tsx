import { TaskList } from "@edmi-react/blocks/task-list/task-list";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<TaskList
			elevation={elevation}
			className="w-[300px] max-w-full"
			tasks={[
				{ title: "ICP analysis", agent: "Research agent", status: "review" },
				{ title: "Q1 analyst report", agent: "Vault agent", status: "running" },
				{
					title: "Q4 drift review",
					agent: "Keeper agent",
					status: "completed",
				},
				{
					title: "Rebalance playbook v2",
					agent: "Research agent",
					status: "completed",
				},
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
