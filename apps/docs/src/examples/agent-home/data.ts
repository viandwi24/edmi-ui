// Sample data for the Agent home example (Keeper = the sample agent). Shared by react.tsx, vue.vue and svelte.svelte.

export const greeting = "Good evening, Dwi";
export const project = "Roadmap";

export interface Task {
	id: string;
	title: string;
	/** Short age on the right (`1m`, `4d`). */
	age: string;
	/** Agent working on it: seed and color of its avatar. */
	agent: { id: string; color: string };
	status: "running" | "done";
}

export const tasks: Task[] = [
	{
		id: "1",
		title: "Draft feed post",
		age: "1m",
		agent: { id: "writer", color: "chart-4" },
		status: "running",
	},
	{
		id: "2",
		title: "Rebalance MAG4",
		age: "4d",
		agent: { id: "keeper", color: "chart-3" },
		status: "done",
	},
];

export const suggestions = [
	"Write a launch post",
	"Compare fees",
	"Add a token",
];

export interface AgentOption {
	id: string;
	name: string;
	scope: string;
	color: string;
}

export const agent: AgentOption = {
	id: "keeper",
	name: "Keeper",
	scope: "trading",
	color: "chart-3",
};
