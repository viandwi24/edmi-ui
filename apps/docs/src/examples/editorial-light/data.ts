// Sample data for the editorial (light) marketing page. Plain TS, no framework imports.

export type Link = { label: string; href: string };
export type Tone = "done" | "running" | "queued";

export const header = {
	lead: "How to",
	steps: [
		{ label: "Start", href: "#start" },
		{ label: "Build", href: "#build" },
		{ label: "Sell", href: "#sell" },
		{ label: "Scale", href: "#scale" },
	] satisfies Link[],
	links: [
		{ label: "Resources", href: "#resources" },
		{ label: "Pricing", href: "#pricing" },
	] satisfies Link[],
	cta: "Create an index",
};

export const hero = {
	lead: "Stockbreak is an index launchpad",
	muted: "designed to turn a stock thesis into a token",
	columns: [
		{
			title: "Agentic departments",
			body: "Stockbreak is organised like an index fund — research, vault, keeper and social, with shared context.",
		},
		{
			title: "Human in the loop",
			body: "Agents work alongside you, and every on-chain action waits for your signature before it moves funds.",
		},
		{
			title: "Fully extensible",
			body: "Connect over MCP, bring your own agent wallet, or drive it from Claude, ChatGPT or your own script.",
		},
	],
	closing:
		"Bring your thesis into the index launchpad and start with the next concrete step.",
	closingCta: "Start in Stockbreak",
};

export const workspace = {
	project: "Magnificent Four",
	zoom: "Z 60%",
	path: "stockbreak/indexes/magnificent-four",
	nodes: [
		"Research",
		"Fees",
		"Index",
		"Keeper",
		"Vault",
		"Social",
		"Pre-IPO",
		"Rebalance",
	],
	tabs: ["Home", "Index", "Vault", "Agents", "Context"],
	thread: [
		{
			role: "assistant",
			text: "That's a great way to check the thesis. I'm screening the megacaps against your mandate — drift, liquidity on Jupiter, and whether a pre-IPO sleeve fits.",
		},
		{
			role: "user",
			text: "The thesis is ready. Can you turn it into an index and share it?",
		},
	],
	tasks: [
		{
			name: "Research agent",
			detail: "Screening AAPLx, NVDAx, T…",
			status: "Running",
			tone: "running" as Tone,
		},
		{
			name: "Vault",
			detail: "Preparing join transaction for 50 USDC",
			status: "Queued",
			tone: "queued" as Tone,
		},
	],
	prompt: "How are the megacaps doing vs SPYx",
};

export const intro = {
	eyebrow: "What Stockbreak does",
	lead: "Keep researching the thesis.",
	muted: "Put Stockbreak to work on the index.",
	body: "Start with the outcome you need. Stockbreak brings the right index context and capabilities together, then keeps you in control of what goes on-chain.",
};

export type Section = {
	id: string;
	eyebrow: string;
	lead: string;
	muted: string;
	body: string;
	rows: { index: string; title: string; body: string }[];
};

export const launch: Section = {
	id: "launch",
	eyebrow: "1.0 — Launch",
	lead: "Stockbreak launches",
	muted: "an index with you",
	body: "Give Stockbreak the thesis you built. It turns that context into the mandate, weights, token and launch materials you need to go to market.",
	rows: [
		{
			index: "1.1",
			title: "Thesis and weights",
			body: "Paste your notes or pick tokens; the research agent proposes weights.",
		},
		{
			index: "1.2",
			title: "Index identity",
			body: "Name, ticker, avatar and a short mandate for holders.",
		},
		{
			index: "1.3",
			title: "Vault deployment",
			body: "The vault program is deployed once you sign the transaction.",
		},
		{
			index: "1.4",
			title: "Launch content",
			body: "Feed card, OG image and a Solana Blink ready to share.",
		},
	],
};

export const board = [
	{
		title: "Thesis stage",
		count: "1/1",
		cards: [{ name: "Initial thesis", sub: "User task" }],
	},
	{
		title: "Mandate stage",
		count: "0/3",
		cards: [
			{ name: "Pick tokens + weights", sub: "Agent task" },
			{ name: "Set drift + fees", sub: "Agent task" },
			{ name: "Review mandate", sub: "Agent requests approval" },
		],
	},
	{
		title: "Launch stage",
		count: "0/4",
		cards: [
			{ name: "Name + ticker", sub: "User task" },
			{ name: "Deploy vault", sub: "Agent requests approval" },
			{ name: "Feed card", sub: "Agent task" },
			{ name: "Share Blink", sub: "Agent task" },
		],
	},
];

export const operate: Section = {
	id: "operate",
	eyebrow: "3.0 — Operate",
	lead: "Stockbreak keeps the index moving",
	muted: "after launch",
	body: "Bring rebalancing, analytics, holder support and recurring keeper work into Stockbreak without giving up control. The same mandate keeps every part of the index moving together.",
	rows: [
		{
			index: "3.1",
			title: "Vault incorporation",
			body: "Bring an existing vault under the same mandate.",
		},
		{
			index: "3.2",
			title: "Index analytics",
			body: "Joins, daily active holders and AUM, updated live.",
		},
		{
			index: "3.3",
			title: "Holder support",
			body: "The support agent answers holders from your docs.",
		},
		{
			index: "3.4",
			title: "Recurring rebalances",
			body: "The keeper rebalances when weights drift past your limit.",
		},
	],
};

export const metrics = [
	{ label: "Joins", value: "234", delta: "+34%", fill: 0.62 },
	{ label: "Daily active holders", value: "10.291", delta: "+8%", fill: 0.55 },
	{ label: "AUM (USDC)", value: "49.182", delta: "+37%", fill: 0.7 },
];

export const joiners = [
	{ name: "Noah Garcia", place: "Lisbon, PT", initials: "NG" },
	{ name: "Emily Rodriguez", place: "Jakarta, ID", initials: "ER" },
	{ name: "Sarah Chen", place: "Singapore, SG", initials: "SC" },
	{ name: "Jordan Brown", place: "Denver, CO", initials: "JB" },
];
export const joinersFooter = {
	count: "2,846",
	text: "people joined an index this week",
};

export const guide = {
	title: "Learn how to launch an index",
	body: "Read the guide, then let Stockbreak turn each step into a roadmap, tasks, and agents.",
	cta: "Put the guide to work",
	download: "Download full guide",
	chapters: [
		{ n: "1", numeral: "I", title: "How To Launch", tone: "bg-chart-4" },
		{ n: "2", numeral: "II", title: "How To Research", tone: "bg-chart-3" },
		{ n: "3", numeral: "III", title: "How To Share", tone: "bg-chart-2" },
		{ n: "4", numeral: "IV", title: "How To Operate", tone: "bg-chart-1" },
	],
};

export const footer = {
	title: "Run an entire index",
	muted: "with AI agents",
	howTo: ["How to launch", "How to research", "How to share", "How to operate"],
	columns: [
		{
			title: "Stockbreak",
			links: [
				{ label: "Homepage", href: "#home" },
				{ label: "Resources", href: "#resources" },
				{ label: "Pricing", href: "#pricing" },
				{ label: "Careers", href: "#careers" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Privacy Policy", href: "#privacy" },
				{ label: "Terms of Service", href: "#terms" },
				{ label: "Docs", href: "#docs" },
				{ label: "Support", href: "#support" },
			],
		},
	],
	card: {
		text: "Stockbreak is an index launchpad designed to run an entire fund.",
		cta: "Create an index",
	},
	legal: "Copyright © 2026 Stockbreak",
	note: "Built on Solana devnet",
};
