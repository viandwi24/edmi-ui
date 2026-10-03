import { TaskList } from "@edmi-react/blocks/task-list/task-list";

export default function Demo() {
	return (
		<TaskList
			raised
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
