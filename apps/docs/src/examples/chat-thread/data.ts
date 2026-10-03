// Sample data for the Chat thread example (Keeper = the sample agent). Shared by react.tsx, vue.vue and
// svelte.svelte: all three render the same `thread`.

export type Block =
	| { type: "markdown"; text: string }
	| { type: "code"; code: string; language: "bash" | "typescript" }
	| {
			type: "artifact";
			title: string;
			meta: string;
			kind: "archive" | "document";
	  };

export interface Turn {
	id: string;
	role: "assistant" | "user";
	blocks: Block[];
}

export const title = "Keeper starter plan";

export const thread: Turn[] = [
	{
		id: "t1",
		role: "assistant",
		blocks: [
			{
				type: "markdown",
				text: `**Check before you start:** the quote path for \`@jup-ag/api\` is not confirmed yet (probably \`@jup-ag/api/quote\`). Flagged in \`docs/open-questions.md\`.

**Two open questions** in \`docs/open-questions.md\`:

- Managed RPC in production (default) or your own node?
- Start with one keeper instance? Default is 1.`,
			},
			{
				type: "artifact",
				title: "Keeper starter",
				meta: "ZIP",
				kind: "archive",
			},
		],
	},
	{
		id: "t2",
		role: "user",
		blocks: [
			{
				type: "markdown",
				text: "What prompt starts the agent after the repo is cloned?",
			},
		],
	},
	{
		id: "t3",
		role: "assistant",
		blocks: [
			{
				type: "markdown",
				text: "The kit ships a `/next-phase` command. After cloning and unzipping into the repo root, type this in your coding agent:",
			},
			{ type: "code", language: "bash", code: "/next-phase 00" },
			{ type: "markdown", text: "Or the short plain prompt:" },
			{
				type: "code",
				language: "bash",
				code: 'Read AGENTS.md, then docs/README.md in order. Do phase 00 in docs/plans/00-scaffold.md until the "Done when" checklist passes.',
			},
		],
	},
];

export const composer = {
	disclaimer: "Edmi is AI and can make mistakes.",
	models: [
		{ id: "opus", label: "Opus" },
		{ id: "sonnet", label: "Sonnet" },
	],
	efforts: [
		{ id: "low", label: "Low" },
		{ id: "medium", label: "Medium" },
		{ id: "high", label: "High" },
	],
	modes: [
		{ id: "auto", label: "Auto" },
		{ id: "ask", label: "Ask first" },
	],
};
