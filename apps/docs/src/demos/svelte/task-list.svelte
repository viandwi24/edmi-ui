<script lang="ts">
	import { TaskList, type Task } from "@edmi-svelte/ui/task-list";

	const tasks: Task[] = [
		{ title: "ICP analysis", agent: "Research agent", status: "review" },
		{ title: "Q1 analyst report", agent: "Vault agent", status: "running" },
		{ title: "Q4 drift review", agent: "Keeper agent", status: "completed" },
		{ title: "Rebalance playbook v2", agent: "Research agent", status: "completed" },
	];
</script>

<TaskList class="w-[300px] max-w-full" {tasks} />
