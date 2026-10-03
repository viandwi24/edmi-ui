// Sample data for the Agent workspace example (Keeper = the sample agent). Shared by all three ports.

export const tabs = ["Agent", "Tasks", "Index", "Library"] as const;

export const reasoning = {
	label: "Thought through the next step",
	text: "MAG4 has no mandate or launch plan yet. The index brief is updated, so the two missing inputs are the next blockers.",
};

export const reply = `**Index brief updated.** Model now: **open weights + hosted keeper**.

Two things still need you:

1. **Mandate** — one sentence on who MAG4 is for
2. **Launch** — how the first 100 holders find it`;

export const userMessage = "What should I do next?";

export const agent = { id: "keeper", name: "Keeper", color: "chart-3" };

export const agentReply =
	"Based on what we set up for MAG4, start with one of these:";

export const suggestions = [
	{ title: "Build the join page", note: "Engineering" },
	{ title: "Set the drift limit", note: "Operations" },
	{ title: "Invite first holders", note: "Growth" },
];

export const composerPlaceholder = "Ask Keeper anything about your index…";

export type SetupIcon = "domain" | "email" | "fees" | "rpc";

export const index = {
	name: "MAG4",
	stack: [
		{
			icon: "domain",
			title: "Domain",
			note: "Connect your index page domain",
			action: "Setup",
		},
		{
			icon: "email",
			title: "Email",
			note: "Holder notifications",
			action: "Setup",
		},
		{
			icon: "fees",
			title: "Fees",
			note: "Connect a fee wallet",
			action: "Setup",
		},
		{ icon: "rpc", title: "RPC", note: "Network provider", action: "Helius" },
	] as { icon: SetupIcon; title: string; note: string; action: string }[],
	links: [
		{ title: "Index page", note: "Public page, source and deploy links." },
		{ title: "Feed", note: "Posts, replies and Blinks." },
	],
	agents: [
		{
			id: "keeper",
			name: "Keeper",
			note: "Rebalances within limits.",
			color: "chart-3",
		},
		{
			id: "writer",
			name: "Writer",
			note: "Drafts feed posts.",
			color: "chart-2",
		},
	],
};
