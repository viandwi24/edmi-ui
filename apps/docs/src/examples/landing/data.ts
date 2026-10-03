// Sample data for the Stockbreak landing page. Plain TS, no framework imports.

export type Link = { label: string; href: string };
export type Segment = { label: string; value: number };
export type Feature = { index: string; title: string; body: string };
export type Step = { index: string; title: string; description: string };
export type Stat = { value: string; label: string };
export type FooterColumn = { title: string; links: Link[] };

export const nav: Link[] = [
	{ label: "How it works", href: "#how" },
	{ label: "Pre-IPO", href: "#pre-ipo" },
	{ label: "AI agents", href: "#agents" },
	{ label: "Creators", href: "#creators" },
	{ label: "FAQ", href: "#faq" },
	{ label: "GitHub", href: "#github" },
];

export const hero = {
	eyebrow: "The index launchpad for tokenized stocks, on Solana",
	title: "Turn your stock thesis into an index token.",
	lead: "Pick up to 10 tokenized stocks and pre-IPO names, set the weights and the rules. Others join with USDC in one click or one Blink. A Solana vault program enforces the rebalancing — not us.",
	facts:
		"Self-custodied · Redeem anytime · Rules enforced on-chain · PreStocks pre-IPO",
	disclaimer:
		"Live on Solana devnet. Assets are simulated; prices follow real market data. Not investment advice.",
};

export const index = {
	name: "Magnificent Four",
	ticker: "MAG4",
	creator: "by @alice",
	tags: ["Pre-IPO·PreStocks", "Simulated"],
	price: "$0.9998",
	d24: "+0.53%",
	d7: "+2.38%",
	benchmark: "Is it beating SPYx?",
	segments: [
		{ label: "AAPLx", value: 40 },
		{ label: "NVDAx", value: 30 },
		{ label: "TSLAx", value: 20 },
		{ label: "SPACEX-pre", value: 10 },
	] satisfies Segment[],
	// viewBox 0 0 400 120 paths (index line + dashed benchmark)
	line: "M0 92 C30 92 50 94 80 86 C110 78 130 70 160 66 C190 62 210 66 240 56 C270 46 300 38 330 34 C360 30 380 26 400 22",
	benchmarkLine: "M0 94 C60 92 120 88 180 84 C240 80 300 74 400 66",
};

export const joinRows = [{ label: "Estimated shares", value: "982.09" }];

export const stats: Stat[] = [
	{ value: "[N]K+", label: "holders, all-time high" },
	{ value: "$[N]B", label: "volume in 30 days" },
	{ value: "[N]%+", label: "of activity outside US hours" },
	{ value: "[N]K", label: "holders of Anthropic pre-IPO" },
];
export const statsNote =
	"Market data placeholders — fill with sourced figures before publishing.";

export const problemTitle = {
	lead: "Tokenized stocks are here.",
	muted: "Portfolios aren't.",
};
export const problems: Feature[] = [
	{
		index: "01",
		title: "Every token is one ticker.",
		body: "If you believe in AI infrastructure plus Anthropic and SpaceX, you're managing ten positions by hand — and rebalancing them yourself, forever.",
	},
	{
		index: "02",
		title: "Creators can't ship their thesis.",
		body: "Packaging a thesis into something people can buy still means starting a fund. Copy apps are off-chain, US-only and run on subscriptions.",
	},
	{
		index: "03",
		title: "Pre-IPO tokens come with deadlines.",
		body: "After an IPO, pre-IPO tokens must be swapped into the listed stock before a deadline — or they expire. Holders who forget lose everything.",
	},
];

export const stepsTitle = {
	lead: "From thesis to token",
	muted: "in four steps.",
};
export const steps: Step[] = [
	{
		index: "01",
		title: "Create",
		description:
			"Pick up to 10 assets, set weights, choose a strategy and your fees.",
	},
	{
		index: "02",
		title: "Share",
		description:
			"Every index gets a link, an OG image, a feed card and a Solana Blink.",
	},
	{
		index: "03",
		title: "Join",
		description:
			"Investors pay in USDC. Stockbreak swaps into every asset and mints share tokens.",
	},
	{
		index: "04",
		title: "Stay balanced",
		description:
			"When weights drift past your rule, a permissionless keeper rebalances atomically.",
	},
];

export const cta = {
	title: "Your thesis deserves a ticker.",
	body: "Create an index in minutes. Share it anywhere. Let the program keep it honest.",
};

export const pricing = [
	{
		name: "Holder",
		tagline: "Join any index",
		price: "0% to join",
		note: "Plus the 1% management fee set by each creator.",
		features: [
			"Browse and join every index",
			"Live NAV and feeds",
			"Leaderboard and portfolio",
		],
	},
	{
		name: "Creator",
		tagline: "Launch your own index",
		price: "1% fee to you",
		note: "Earn the management fee on every holder's share.",
		features: [
			"Custom weights and mandate",
			"Pre-IPO sleeve",
			"Share cards and Blinks",
		],
	},
	{
		name: "Keeper",
		tagline: "Automate rebalancing",
		price: "5% drift trigger",
		note: "Keeper rebalances when weights drift past your limit.",
		features: [
			"Scheduled rebalances",
			"Agent wallet and MCP",
			"Priority execution",
		],
	},
];

export const footer = {
	description: "Index launchpad for tokenized stocks, on Solana.",
	columns: [
		{
			title: "Product",
			links: [
				{ label: "Explore", href: "#explore" },
				{ label: "Leaderboard", href: "#leaderboard" },
				{ label: "Create index", href: "#create" },
			],
		},
		{
			title: "Developers",
			links: [
				{ label: "Docs", href: "#docs" },
				{ label: "MCP server", href: "#mcp" },
				{ label: "GitHub", href: "#github" },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About", href: "#about" },
				{ label: "Careers", href: "#careers" },
				{ label: "News", href: "#news" },
			],
		},
	] satisfies FooterColumn[],
	legal: "© 2026 Stockbreak",
	note: "Devnet only · simulated assets · not investment advice",
};
