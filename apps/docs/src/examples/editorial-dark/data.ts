// Sample data for the editorial (dark) marketing page. Plain TS, no framework imports.

export type Link = { label: string; href: string };
export type MenuColumn = { title: string; links: Link[] };

export const nav = {
	product: [
		{
			title: "Products",
			links: [
				{ label: "Stockbreak", href: "#stockbreak" },
				{ label: "Explore", href: "#explore" },
				{ label: "Leaderboard", href: "#leaderboard" },
				{ label: "Create index", href: "#create" },
			],
		},
		{
			title: "Capabilities",
			links: [
				{ label: "Research agent", href: "#research" },
				{ label: "Vault", href: "#vault" },
				{ label: "Keeper", href: "#keeper" },
				{ label: "Feeds", href: "#feeds" },
				{ label: "Blinks", href: "#blinks" },
			],
		},
		{
			title: "Extensions",
			links: [
				{ label: "MCP server", href: "#mcp" },
				{ label: "Agent wallet", href: "#wallet" },
			],
		},
		{
			title: "Docs",
			links: [
				{ label: "Quickstart", href: "#quickstart" },
				{ label: "Mandates", href: "#mandates" },
				{ label: "Fees", href: "#fees" },
				{ label: "API", href: "#api" },
			],
		},
	] satisfies MenuColumn[],
	others: ["Developers", "Enterprise", "Resources", "Pricing"],
	login: "Login",
	contact: "Contact sales",
	launch: "Launch an index",
};

export const hero = {
	title: "Think fast, index faster",
	lead: "Research in chat, launch in one signature",
	wallet: "Connect Solana wallet",
	email: "Continue with email",
	or: "OR",
	terms:
		"By continuing, you agree to the Stockbreak terms and to get occasional product emails and notifications.",
	devnet: "Open the app on devnet",
};

export const index = {
	label: "MAG4 · Magnificent Four",
	price: "$0.9998",
	delta: "+0.53% today",
	rows: [
		{ code: "NV", name: "NVDAx", weight: "32%" },
		{ code: "MS", name: "MSFTx", weight: "28%" },
		{ code: "AA", name: "AAPLx", weight: "24%" },
		{ code: "PR", name: "ANTHRP-pre", weight: "16%" },
	],
	join: "Join the index",
};

export const plans = {
	title: "Explore plans",
	tabs: [
		{ value: "individual", label: "Individual" },
		{ value: "teams", label: "Teams and funds" },
	],
	items: [
		{
			name: "Holder",
			tagline: "Join any index",
			price: "0% to join",
			note: "Plus the 1% management fee set by each creator.",
			features: [
				"Browse and join every index",
				"Live NAV and feeds",
				"Leaderboard and portfolio",
				"Devnet faucet access",
			],
		},
		{
			name: "Creator",
			tagline: "Launch your own index",
			price: "1% fee to you",
			note: "Earn the management fee on every holder's share.",
			features: ["Custom weights and mandate", "Pre-IPO sleeve", "Share cards and Blinks", "Research agent"],
		},
		{
			name: "Keeper",
			tagline: "Automate rebalancing",
			price: "5% drift trigger",
			note: "Keeper rebalances when weights drift past your limit.",
			features: ["Scheduled rebalances", "Agent wallet and MCP", "Priority execution", "Fee analytics"],
		},
	],
	cta: "Launch an index",
};

export const faq = [
	{
		value: "use",
		q: "What should I use Stockbreak for?",
		a: "Turn a stock thesis into a tokenized index: research it in chat, set weights and rules, then launch it with one signature.",
	},
	{
		value: "rebalance",
		q: "How does an index get rebalanced?",
		a: "A permissionless keeper rebalances atomically whenever weights drift past the limit you set in the mandate.",
	},
	{
		value: "cost",
		q: "How much does it cost to use?",
		a: "Joining is free. Creators earn a 1% management fee on every holder's share.",
	},
];

export const footer = {
	columns: [
		{
			title: "Product",
			links: ["Stockbreak", "Explore", "Leaderboard", "Create index", "Feeds", "Portfolio", "Faucet"].map((label) => ({ label, href: `#${label.toLowerCase().replace(" ", "-")}` })),
		},
		{
			title: "Capabilities",
			links: ["Research agent", "Vault", "Keeper", "Blinks"].map((label) => ({ label, href: `#${label.toLowerCase().replace(" ", "-")}` })),
		},
		{
			title: "Developers",
			links: ["Docs", "API", "MCP server", "Community"].map((label) => ({ label, href: `#${label.toLowerCase().replace(" ", "-")}` })),
		},
		{
			title: "Company",
			links: ["About", "Careers", "Research", "News"].map((label) => ({ label, href: `#${label.toLowerCase()}` })),
		},
	],
	description: "Ask the research agent anything about your thesis.",
	legal: "© 2026 Stockbreak",
	note: "English",
};
