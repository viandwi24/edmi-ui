// Sample data for the Agent workflow example. Shared by react.tsx, vue.vue and svelte.svelte: the same
// nodes and edges feed React Flow, Vue Flow and Svelte Flow.

export type StepData = {
	title: string;
	description?: string;
	/** Monospace line in the node body. */
	body?: string;
	/** `body` rendered as a secondary badge (the trigger schedule). */
	bodyBadge?: boolean;
	footer?: string;
	/** Decision answers: first = success badge, second = outline badge. */
	badges?: string[];
	/** Buttons in the body (`Approve`, `Reject`). */
	actions?: string[];
	/** Show the node toolbar while the node is selected. */
	toolbar?: boolean;
	handles: { target: boolean; source: boolean };
};

export type FlowNode = {
	id: string;
	type: "step";
	position: { x: number; y: number };
	selected?: boolean;
	data: StepData;
};

export type FlowEdge = {
	id: string;
	source: string;
	target: string;
	type?: "animated" | "temporary";
};

export const nodes: FlowNode[] = [
	{
		id: "start",
		type: "step",
		position: { x: 0, y: 110 },
		data: {
			title: "Start",
			description: "Trigger · every hour",
			body: "cron 0 * * * *",
			bodyBadge: true,
			handles: { target: false, source: true },
		},
	},
	{
		id: "drift",
		type: "step",
		position: { x: 330, y: 0 },
		data: {
			title: "Check drift",
			description: "Tool · get_prices",
			body: "MAG4 drift: 2.4%",
			footer: "412 ms",
			handles: { target: true, source: true },
		},
	},
	{
		id: "post",
		type: "step",
		position: { x: 330, y: 200 },
		data: {
			title: "Draft feed post",
			description: "Agent · writer",
			body: "Writing...",
			footer: "running",
			handles: { target: true, source: true },
		},
	},
	{
		id: "decision",
		type: "step",
		position: { x: 680, y: 0 },
		selected: true,
		data: {
			title: "Decision",
			description: "drift > 2%?",
			badges: ["yes", "no"],
			toolbar: true,
			handles: { target: true, source: true },
		},
	},
	{
		id: "approval",
		type: "step",
		position: { x: 680, y: 200 },
		data: {
			title: "Ask approval",
			description: "Human in the loop",
			actions: ["Approve", "Reject"],
			handles: { target: true, source: false },
		},
	},
];

export const edges: FlowEdge[] = [
	{ id: "e1", source: "start", target: "drift", type: "animated" },
	{ id: "e2", source: "start", target: "post" },
	{ id: "e3", source: "drift", target: "decision", type: "animated" },
	{ id: "e4", source: "drift", target: "approval", type: "temporary" },
];

export const legend = [
	{ label: "active flow", color: "var(--brand)", dash: "6 5" },
	{ label: "conditional", color: "var(--muted-foreground-2)", dash: "2 5" },
];
