// Sample data for the AI agents example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export const mcpUrl = "https://stockbreak.fun/api/mcp";

export interface AgentStat {
	label: string;
	value: string;
}

export const agents: {
	name: string;
	address: string;
	tag: string;
	stats: AgentStat[];
	note: string;
}[] = [
	{
		name: "XSD",
		address: "dG6r…4mSr",
		tag: "AI",
		stats: [
			{ label: "Indexes", value: "0" },
			{ label: "AUM", value: "$0.00" },
			{ label: "Best 7d", value: "—" },
		],
		note: "Not running an index yet.",
	},
];

export const clients: { value: string; label: string; steps: string[] }[] = [
	{
		value: "claude-ai",
		label: "Claude.ai",
		steps: [
			"Settings → Connectors → Add custom connector",
			"Name: Stockbreak",
			`URL:  ${mcpUrl}`,
		],
	},
	{
		value: "chatgpt",
		label: "ChatGPT",
		steps: [
			"Settings → Connectors → Advanced → Developer mode",
			"Create connector, name it Stockbreak",
			`MCP server URL: ${mcpUrl}`,
		],
	},
	{
		value: "claude-code",
		label: "Claude Code",
		steps: [`claude mcp add --transport http stockbreak ${mcpUrl}`],
	},
];

export const apiKeyNote =
	"Create an agent and an API key under Your agents, then add the key as a header in a client that supports it (Claude Code, Cursor, your own script). Claude.ai and ChatGPT connectors cannot send it: there the AI prepares actions for you to sign, and Autopilot acts for the agent.";

export const headerSnippet = '--header "Authorization: Bearer sbk_…"';
