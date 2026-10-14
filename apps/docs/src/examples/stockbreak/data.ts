// Sample data for the Stockbreak app (all pages). Plain TS, no framework imports; shared by react.tsx, vue.vue and svelte.svelte.
// Each page owns a prefixed section (exploreIndexes, feedPosts, ...); tickers, the index row type and the sparkline helpers are shared.
export interface TickerItem {
	symbol: string;
	price: string;
	change: string;
}

export interface IndexRowData {
	name: string;
	symbol: string;
	tokens: { label: string }[];
	tags?: string[];
	creator: string;
	price: string;
	change: string;
	aum: string;
	holders: number;
	spark?: number[];
	/** Row link, used by the app navigation (`#/index` opens Index detail). */
	href?: string;
}

const up = [1.0, 1.01, 1.03, 1.02, 1.04, 1.04, 1.05, 1.06];
const down = [1.0, 0.99, 0.98, 0.985, 0.97, 0.972, 0.97, 0.965];
const pre = "Pre-IPO · PreStocks";
const withHref = <T extends IndexRowData>(rows: T[]): T[] =>
	rows.map((row) => ({ ...row, href: "#/index" }));
/** Maps a Stockbreak index onto the neutral shape of the `index-row` item (`avatars`, `owner`, `value`, `count`). */
export const toIndexRow = (i: IndexRowData) => ({
	...i,
	avatars: i.tokens,
	owner: i.creator,
	value: i.aum,
	count: i.holders,
});
/** Column labels of the Stockbreak index table (`IndexRowHeader labels`). */
export const indexRowLabels = {
	name: "Index",
	owner: "Creator",
	price: "Price",
	change: "7d",
	value: "AUM",
	count: "Holders",
	trend: "30d",
};
const t = (...labels: string[]) => labels.map((label) => ({ label }));

// ---- markets ----
export const tickers: TickerItem[] = [
	{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
	{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
	{ symbol: "TSLAx", price: "$370.21", change: "-0.31%" },
	{ symbol: "MSFTx", price: "$513.15", change: "+0.12%" },
	{ symbol: "GOOGLx", price: "$340.43", change: "+0.55%" },
	{ symbol: "AMZNx", price: "$247.93", change: "-0.20%" },
	{ symbol: "METAx", price: "$730.50", change: "+1.02%" },
	{ symbol: "SPYx", price: "$767.86", change: "+0.30%" },
];

const marketsIndexesRaw: IndexRowData[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens: [{ label: "A" }, { label: "N" }, { label: "T" }],
		tags: [pre, "Clone"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
		spark: up,
	},
	{
		name: "AI Frontier",
		symbol: "AIFR",
		tokens: [{ label: "N" }, { label: "M" }, { label: "G" }],
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.01",
		change: "+0.84%",
		aum: "$82.4K",
		holders: 2,
		spark: up,
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		tokens: [{ label: "S" }, { label: "A" }, { label: "T" }],
		tags: [pre],
		creator: "7Ge1…kXSq",
		price: "$0.9791",
		change: "-2.09%",
		aum: "$29K",
		holders: 1,
		spark: down,
	},
	{
		name: "Mag Four Mirror",
		symbol: "MAGM",
		tokens: [{ label: "A" }, { label: "N" }, { label: "T" }],
		tags: [pre, "Follows MAG4"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+0.21%",
		aum: "$19.8K",
		holders: 1,
		spark: up,
	},
	{
		name: "Magnificent Four",
		symbol: "MAG4",
		tokens: [{ label: "A" }, { label: "N" }, { label: "T" }],
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.00",
		change: "+2.38%",
		aum: "$14.1K",
		holders: 14,
		spark: up,
	},
];

export const marketsIndexes = withHref(marketsIndexesRaw);

export const marketsHumanVsAi = {
	human: {
		label: "Human · median 7d",
		value: "+0.84%",
		note: "34 indexes · best MAGT",
	},
	ai: { label: "AI · median 7d", value: "—", note: "0 indexes" },
};

export const marketsCreators = [
	{
		rank: "G",
		address: "GbFK…ZUWS",
		meta: "Level 2 · 2 indexes",
		aum: "$140K",
		joiners: "1 joiners",
	},
	{
		rank: "8",
		address: "8FcD…cL9y",
		meta: "Level 4 · 2 indexes",
		aum: "$96.5K",
		joiners: "14 joiners",
	},
	{
		rank: "7",
		address: "7Ge1…kXSq",
		meta: "Level 2 · 2 indexes",
		aum: "$32K",
		joiners: "1 joiners",
	},
];

export const marketsActivity = [
	{
		symbol: "MAGT",
		text: "Joined · 983.75 shares",
		ago: "5d ago",
		tone: "brand",
	},
	{
		symbol: "PHMAKER",
		text: "Joined · 987.03 shares",
		ago: "5d ago",
		tone: "warning",
	},
	{ symbol: "PHMAKER", text: "Created", ago: "5d ago", tone: "brand" },
	{
		symbol: "MM41",
		text: "Claimed creator fees",
		ago: "5d ago",
		tone: "warning",
	},
	{ symbol: "MM41", text: "Paused", ago: "5d ago", tone: "brand" },
] as const;

// ---- explore ----
export type exploreKind = "human" | "ai";

const exploreIndexesRaw: (IndexRowData & { kind: exploreKind })[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens: t("A", "N", "T"),
		tags: [pre, "Clone"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
		spark: up,
		kind: "human",
	},
	{
		name: "AI Frontier",
		symbol: "AIFR",
		tokens: t("N", "M", "G"),
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.01",
		change: "+0.84%",
		aum: "$82.4K",
		holders: 2,
		spark: up,
		kind: "human",
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		tokens: t("S", "A", "T"),
		tags: [pre],
		creator: "7Ge1…kXSq",
		price: "$0.9791",
		change: "-2.09%",
		aum: "$29K",
		holders: 1,
		spark: down,
		kind: "human",
	},
	{
		name: "Mag Four Mirror",
		symbol: "MAGM",
		tokens: t("A", "N", "T"),
		tags: [pre, "Follows MAG4"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+0.21%",
		aum: "$19.8K",
		holders: 1,
		spark: up,
		kind: "human",
	},
	{
		name: "Magnificent Four",
		symbol: "MAG4",
		tokens: t("A", "N", "T"),
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.00",
		change: "+2.38%",
		aum: "$14.1K",
		holders: 14,
		spark: up,
		kind: "human",
	},
	{
		name: "Atlas Momentum",
		symbol: "ATLS",
		tokens: t("A", "T", "L"),
		tags: ["AI"],
		creator: "CB7H…iTLG",
		price: "$0.9893",
		change: "-0.64%",
		aum: "$4,570",
		holders: 3,
		spark: down,
		kind: "ai",
	},
	{
		name: "Steady Megacaps",
		symbol: "MEGA",
		tokens: t("A", "M", "G"),
		creator: "7Ge1…kXSq",
		price: "$1.00",
		change: "-0.54%",
		aum: "$3,013",
		holders: 2,
		spark: down,
		kind: "human",
	},
	{
		name: "PHONEMAKER",
		symbol: "PHMAKER",
		tokens: t("A", "S"),
		creator: "abHa…umq7",
		price: "$0.9942",
		change: "+0.12%",
		aum: "$981.41",
		holders: 1,
		spark: up,
		kind: "human",
	},
	{
		name: "BIG FIVE",
		symbol: "BIGF",
		tokens: t("A", "M", "G"),
		creator: "abHa…umq7",
		price: "$0.9932",
		change: "+0.08%",
		aum: "$980.48",
		holders: 1,
		spark: up,
		kind: "human",
	},
	{
		name: "Pilot 1866",
		symbol: "PL1866",
		tokens: t("A", "N"),
		creator: "Diat…T4RL",
		price: "$1.00",
		change: "+0.02%",
		aum: "$99.18",
		holders: 1,
		spark: up,
		kind: "human",
	},
];

export const exploreIndexes = withHref(exploreIndexesRaw);

export const exploreKinds = [
	{ value: "all", label: "All" },
	{ value: "human", label: "Human" },
	{ value: "ai", label: "AI" },
] as const;

export const exploreStrategies = [
	{ value: "any", label: "Any strategy" },
	{ value: "clone", label: "Clone" },
	{ value: "follow", label: "Follows" },
];

export const exploreSorts = [
	{ value: "aum", label: "AUM" },
	{ value: "change", label: "7d change" },
	{ value: "holders", label: "Holders" },
];

// ---- leaderboard ----
export interface leaderboardAllocationSegment {
	label: string;
	value: number;
}

export interface leaderboardPodiumEntry {
	rank: 1 | 2 | 3;
	name: string;
	symbol: string;
	owner: string;
	change: string;
	value: string;
	count: number;
	spark: number[];
	allocation: leaderboardAllocationSegment[];
}

export const leaderboardPodium: leaderboardPodiumEntry[] = [
	{
		rank: 1,
		name: "Mag Four Tilt",
		symbol: "MAGT",
		owner: "GbFK…ZUWS",
		change: "+1.12%",
		value: "$120.1K",
		count: 2,
		spark: up,
		allocation: [
			{ label: "AAPLx", value: 30 },
			{ label: "NVDAx", value: 40 },
			{ label: "TSLAx", value: 20 },
			{ label: "SPACEX-pre", value: 10 },
		],
	},
	{
		rank: 2,
		name: "AI Frontier",
		symbol: "AIFR",
		owner: "8FcD…cL9y",
		change: "+0.84%",
		value: "$82.4K",
		count: 2,
		spark: up,
		allocation: [
			{ label: "NVDAx", value: 30 },
			{ label: "MSFTx", value: 25 },
			{ label: "GOOGLx", value: 20 },
			{ label: "OPENAI-pre", value: 15 },
			{ label: "ANTHRP-pre", value: 10 },
		],
	},
	{
		rank: 3,
		name: "Defense & Space",
		symbol: "DFSP",
		owner: "7Ge1…kXSq",
		change: "-2.09%",
		value: "$29K",
		count: 1,
		spark: down,
		allocation: [
			{ label: "SPACEX-pre", value: 40 },
			{ label: "ANDURL-pre", value: 30 },
			{ label: "TSLAx", value: 30 },
		],
	},
];

const leaderboardIndexesRaw: IndexRowData[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens: t("A", "N", "T"),
		tags: [pre, "Clone"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
		spark: up,
	},
	{
		name: "AI Frontier",
		symbol: "AIFR",
		tokens: t("N", "M", "G"),
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.01",
		change: "+0.84%",
		aum: "$82.4K",
		holders: 2,
		spark: up,
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		tokens: t("S", "A", "T"),
		tags: [pre],
		creator: "7Ge1…kXSq",
		price: "$0.9791",
		change: "-2.09%",
		aum: "$29K",
		holders: 1,
		spark: down,
	},
	{
		name: "Mag Four Mirror",
		symbol: "MAGM",
		tokens: t("A", "N", "T"),
		tags: [pre, "Follows MAG4"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+0.21%",
		aum: "$19.8K",
		holders: 1,
		spark: up,
	},
	{
		name: "Magnificent Four",
		symbol: "MAG4",
		tokens: t("A", "N", "T"),
		tags: [pre],
		creator: "8FcD…cL9y",
		price: "$1.00",
		change: "+2.38%",
		aum: "$14.1K",
		holders: 14,
		spark: up,
	},
];

export const leaderboardIndexes = withHref(leaderboardIndexesRaw);

export const leaderboardTabs = [
	{ value: "indexes", label: "Indexes" },
	{ value: "creators", label: "Creators" },
];

export const leaderboardPeriods = [
	{ value: "24h", label: "24H" },
	{ value: "7d", label: "7D" },
	{ value: "30d", label: "30D" },
	{ value: "all", label: "ALL" },
];

export const leaderboardKinds = [
	{ value: "all", label: "All" },
	{ value: "human", label: "Human" },
	{ value: "ai", label: "AI" },
];

export const leaderboardBenchmark = "SPYx 7D: +0.48%";

// ---- create ----
export interface createAsset {
	symbol: string;
	name: string;
	price: string;
	/** Source tag shown as a badge next to the symbol. */
	tag?: string;
	detail: string;
}

export const createSteps = [
	{ value: "assets", label: "Assets" },
	{ value: "weights", label: "Weights" },
	{ value: "strategy", label: "Strategy" },
	{ value: "fees", label: "Fees" },
	{ value: "review", label: "Review" },
] as const;

export type createStepValue = (typeof createSteps)[number]["value"];

export const createAssets: createAsset[] = [
	{
		symbol: "USDC",
		name: "USD Coin",
		detail: "USD Coin · stable",
		price: "$1.00",
	},
	{ symbol: "AAPLx", name: "Apple", detail: "Apple", price: "$339.86" },
	{ symbol: "NVDAx", name: "NVIDIA", detail: "NVIDIA", price: "$227.06" },
	{ symbol: "TSLAx", name: "Tesla", detail: "Tesla", price: "$370.21" },
	{ symbol: "MSFTx", name: "Microsoft", detail: "Microsoft", price: "$513.15" },
	{ symbol: "GOOGLx", name: "Alphabet", detail: "Alphabet", price: "$340.43" },
	{ symbol: "AMZNx", name: "Amazon", detail: "Amazon", price: "$247.93" },
	{ symbol: "METAx", name: "Meta", detail: "Meta", price: "$730.50" },
	{
		symbol: "SPACEX-pre",
		name: "SpaceX",
		tag: "PreStocks",
		detail: "SpaceX (pre-IPO) · pre-IPO",
		price: "$117.49",
	},
	{
		symbol: "OPENAI-pre",
		name: "OpenAI",
		tag: "PreStocks",
		detail: "OpenAI (pre-IPO) · pre-IPO",
		price: "$1,379.64",
	},
	{
		symbol: "ANTHRP-pre",
		name: "Anthropic",
		tag: "PreStocks",
		detail: "Anthropic (pre-IPO) · pre-IPO",
		price: "$1,061.26",
	},
];

export const createRebalance = [
	{ value: "drift", label: "On drift" },
	{ value: "daily", label: "Daily" },
	{ value: "weekly", label: "Weekly" },
	{ value: "never", label: "Never" },
];

export const createDefaults = {
	drift: 5,
	fee: 1,
	entry: 0,
	exit: 0,
	rebalance: "drift",
};

// ---- feed ----
export const feedViews = [
	{ value: "following", label: "Following" },
	{ value: "all", label: "All" },
];

export interface feedUpdate {
	id: string;
	who: string;
	initial: string;
	action: string;
	detail?: string;
	symbol: string;
	tokens: string[];
	ago: string;
}

export const feedUpdates: feedUpdate[] = [
	{
		id: "u1",
		who: "abHa…umq7",
		initial: "a",
		action: "joined",
		detail: "983.75 shares",
		symbol: "MAGT",
		tokens: ["A", "N", "T"],
		ago: "6d ago",
	},
	{
		id: "u2",
		who: "abHa…umq7",
		initial: "a",
		action: "joined",
		detail: "987.03 shares",
		symbol: "PHMAKER",
		tokens: ["G", "A"],
		ago: "6d ago",
	},
	{
		id: "u3",
		who: "abHa…umq7",
		initial: "a",
		action: "created",
		symbol: "PHMAKER",
		tokens: ["G", "A"],
		ago: "6d ago",
	},
	{
		id: "u4",
		who: "HzXY…iuZU",
		initial: "H",
		action: "redeemed",
		detail: "98.19 shares",
		symbol: "MAG4",
		tokens: ["A", "N", "T"],
		ago: "6d ago",
	},
	{
		id: "u5",
		who: "8FcD…cL9y",
		initial: "8",
		action: "created",
		symbol: "MAG4",
		tokens: ["A", "N", "T"],
		ago: "6d ago",
	},
	{
		id: "u6",
		who: "GbFK…ZUWS",
		initial: "G",
		action: "joined",
		detail: "120.40 shares",
		symbol: "MAGT",
		tokens: ["A", "N", "T"],
		ago: "6d ago",
	},
];

export interface feedPost {
	id: string;
	name: string;
	handle: string;
	time: string;
	initials: string;
	text: string;
	index: { title: string; description: string };
	likes: number;
	replies: number;
}

export const feedPosts: feedPost[] = [
	{
		id: "p1",
		name: "Dewi Lestari",
		handle: "@dewi",
		time: "2h",
		initials: "DL",
		text: "Rebalanced MAG4 after NVDAx drifted to 32.4%. Fees this week: 4.1 USDC.",
		index: { title: "MAG4 · Magnificent Four", description: "$1.00 · +2.38%" },
		likes: 24,
		replies: 6,
	},
	{
		id: "p2",
		name: "GbFK…ZUWS",
		handle: "creator",
		time: "1d",
		initials: "GB",
		text: "Tilting toward pre-IPO names for the next epoch. Weights lock at launch, so read the mandate first.",
		index: { title: "MAGT · Mag Four Tilt", description: "$1.00 · +1.12%" },
		likes: 9,
		replies: 2,
	},
];

export const feedMoreUpdates = 6;
export const feedMaxChars = 500;

// ---- agents ----
export const agentsMcpUrl = "https://stockbreak.fun/api/mcp";

export interface agentsAgentStat {
	label: string;
	value: string;
}

export const agentsAgents: {
	name: string;
	address: string;
	tag: string;
	stats: agentsAgentStat[];
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

export const agentsClients: {
	value: string;
	label: string;
	steps: string[];
}[] = [
	{
		value: "claude-ai",
		label: "Claude.ai",
		steps: [
			"Settings → Connectors → Add custom connector",
			"Name: Stockbreak",
			`URL:  ${agentsMcpUrl}`,
		],
	},
	{
		value: "chatgpt",
		label: "ChatGPT",
		steps: [
			"Settings → Connectors → Advanced → Developer mode",
			"Create connector, name it Stockbreak",
			`MCP server URL: ${agentsMcpUrl}`,
		],
	},
	{
		value: "claude-code",
		label: "Claude Code",
		steps: [`claude mcp add --transport http stockbreak ${agentsMcpUrl}`],
	},
];

export const agentsApiKeyNote =
	"Create an agent and an API key under Your agents, then add the key as a header in a client that supports it (Claude Code, Cursor, your own script). Claude.ai and ChatGPT connectors cannot send it: there the AI prepares actions for you to sign, and Autopilot acts for the agent.";

export const agentsHeaderSnippet = '--header "Authorization: Bearer sbk_…"';

// ---- portfolio ----
export const portfolioTotals = {
	value: "$4,970.69",
	delta: "-$14.76",
	deltaNote: "-0.30% over 7d",
	breakdown: "Positions $3,930.69 · USDC $1,040.00",
	usdc: { value: "1,040", note: "Simulated · devnet" },
	sol: { value: "81.654", note: "For transaction fees" },
};

export interface portfolioPosition {
	name: string;
	symbol: string;
	tokens: string[];
	shares: string;
	price: string;
	value: string;
	pnl: string;
	pnlPct: string;
	spark: number[];
}

export const portfolioPositions: portfolioPosition[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens: ["A", "N", "T"],
		shares: "983.75",
		price: "$1.00",
		value: "$987.52",
		pnl: "+$3.80",
		pnlPct: "+0.39%",
		spark: up,
	},
	{
		name: "PHONEMAKER",
		symbol: "PHMAKER",
		tokens: ["G", "A"],
		shares: "987.03",
		price: "$0.9942",
		value: "$981.26",
		pnl: "-$7.67",
		pnlPct: "-0.78%",
		spark: down,
	},
	{
		name: "BIG FIVE",
		symbol: "BIGF",
		tokens: ["A", "N", "M"],
		shares: "987.03",
		price: "$0.9932",
		value: "$980.32",
		pnl: "-$7.70",
		pnlPct: "-0.78%",
		spark: down,
	},
	{
		name: "Magnificent Four",
		symbol: "MAG4",
		tokens: ["A", "N", "T"],
		shares: "980.2",
		price: "$1.00",
		value: "$981.59",
		pnl: "-$2.59",
		pnlPct: "-0.26%",
		spark: down,
	},
];

export const portfolioLooseAssets = [
	{ symbol: "AAPLx", letter: "A", amount: "0.0071" },
	{ symbol: "NVDAx", letter: "N", amount: "0.0058" },
	{ symbol: "MSFTx", letter: "M", amount: "0" },
	{ symbol: "METAx", letter: "M", amount: "0" },
	{ symbol: "SPACEX-pre", letter: "S", amount: "0.0051" },
];

export const portfolioLooseNote = "$0.00";

export const portfolioYourIndexes = [
	{ name: "PHONEMAKER", symbol: "PHMAKER", aum: "$981.41", tokens: ["G", "A"] },
	{ name: "BIG FIVE", symbol: "BIGF", aum: "$980.48", tokens: ["A", "N", "M"] },
];

// ---- profile ----
export const profileProfile = {
	short: "abHa…umq7",
	address: "abHaSb…ERumq7",
	followers: 0,
	following: 0,
	level: 2,
	xp: 260,
	nextLevelXp: 450,
	levelStartXp: 150,
	badges: ["First index", "First join", "Early on devnet"],
};

export interface profileCreated {
	name: string;
	symbol: string;
	tokens: string[];
	price: string;
	change: string;
	aum: string;
}

export const profileCreated: profileCreated[] = [
	{
		name: "PHONEMAKER",
		symbol: "PHMAKER",
		tokens: ["G", "A"],
		price: "$0.9942",
		change: "+0.12%",
		aum: "$981.41",
	},
	{
		name: "BIG FIVE",
		symbol: "BIGF",
		tokens: ["A", "N", "M"],
		price: "$0.9932",
		change: "+0.08%",
		aum: "$980.48",
	},
];

export interface profilePosition {
	name: string;
	symbol: string;
	tokens: string[];
	shares: string;
	price: string;
	value: string;
	pnl: string;
	pnlPct: string;
	spark: number[];
}

export const profilePositions: profilePosition[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens: ["A", "N", "T"],
		shares: "983.75",
		price: "$1.00",
		value: "$987.52",
		pnl: "+$3.80",
		pnlPct: "+0.39%",
		spark: up,
	},
	{
		name: "PHONEMAKER",
		symbol: "PHMAKER",
		tokens: ["G", "A"],
		shares: "987.03",
		price: "$0.9942",
		value: "$981.26",
		pnl: "-$7.67",
		pnlPct: "-0.78%",
		spark: down,
	},
	{
		name: "BIG FIVE",
		symbol: "BIGF",
		tokens: ["A", "N", "M"],
		shares: "987.03",
		price: "$0.9932",
		value: "$980.32",
		pnl: "-$7.70",
		pnlPct: "-0.78%",
		spark: down,
	},
	{
		name: "Magnificent Four",
		symbol: "MAG4",
		tokens: ["A", "N", "T"],
		shares: "980.2",
		price: "$1.00",
		value: "$981.59",
		pnl: "-$2.59",
		pnlPct: "-0.26%",
		spark: down,
	},
];

// ---- faucet ----
export const faucetWallet = {
	address: "abHaSbWAxCNM2DhyGe5U2eLRZzViRDSVLLMD7ERumq7",
	sol: 81.654,
	usdc: 1040,
};

export const faucetSolFaucet = {
	title: "1. SOL for transaction fees",
	description:
		"Sends 0.1 SOL from the app’s faucet wallet. Limited per wallet per day.",
	linkLabel: "faucet.solana.com",
	linkHref: "https://faucet.solana.com",
	buttonLabel: "Open faucet.solana.com",
};

export const faucetUsdcFaucet = {
	title: "2. Simulated USDC",
	description:
		"Minted by the mock market. Up to 10,000 per request. You sign one transaction.",
	amounts: [1000, 5000, 10000],
	defaultAmount: 5000,
};

// ---- landing ----
export type landingLink = { label: string; href: string };
export type landingSegment = { label: string; value: number };
export type landingFeature = { index: string; title: string; body: string };
export type landingStep = { index: string; title: string; description: string };
export type landingStat = { value: string; label: string };
export type landingFooterColumn = { title: string; links: landingLink[] };

export const landingNav: landingLink[] = [
	{ label: "How it works", href: "#how" },
	{ label: "Pre-IPO", href: "#pre-ipo" },
	{ label: "AI agents", href: "#agents" },
	{ label: "Creators", href: "#creators" },
	{ label: "FAQ", href: "#faq" },
	{ label: "GitHub", href: "#github" },
];

export const landingHero = {
	eyebrow: "The index launchpad for tokenized stocks, on Solana",
	title: "Turn your stock thesis into an index token.",
	lead: "Pick up to 10 tokenized stocks and pre-IPO names, set the weights and the rules. Others join with USDC in one click or one Blink. A Solana vault program enforces the rebalancing — not us.",
	facts:
		"Self-custodied · Redeem anytime · Rules enforced on-chain · PreStocks pre-IPO",
	disclaimer:
		"Live on Solana devnet. Assets are simulated; prices follow real market data. Not investment advice.",
};

export const landingIndex = {
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
	] satisfies landingSegment[],
	// viewBox 0 0 400 120 paths (index line + dashed benchmark)
	line: "M0 92 C30 92 50 94 80 86 C110 78 130 70 160 66 C190 62 210 66 240 56 C270 46 300 38 330 34 C360 30 380 26 400 22",
	benchmarkLine: "M0 94 C60 92 120 88 180 84 C240 80 300 74 400 66",
};

export const landingJoinRows = [{ label: "Estimated shares", value: "982.09" }];

export const landingStats: landingStat[] = [
	{ value: "[N]K+", label: "holders, all-time high" },
	{ value: "$[N]B", label: "volume in 30 days" },
	{ value: "[N]%+", label: "of activity outside US hours" },
	{ value: "[N]K", label: "holders of Anthropic pre-IPO" },
];
export const landingStatsNote =
	"Market data placeholders — fill with sourced figures before publishing.";

export const landingProblemTitle = {
	lead: "Tokenized stocks are here.",
	muted: "Portfolios aren't.",
};
export const landingProblems: landingFeature[] = [
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

export const landingStepsTitle = {
	lead: "From thesis to token",
	muted: "in four steps.",
};
export const landingSteps: landingStep[] = [
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

export const landingCta = {
	title: "Your thesis deserves a ticker.",
	body: "Create an index in minutes. Share it anywhere. Let the program keep it honest.",
};

export const landingPricing = [
	{
		name: "Holder",
		lead: "Included:",
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
		lead: "Everything in Holder, plus:",
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
		lead: "Everything in Creator, plus:",
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

export const landingFooter = {
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
	] satisfies landingFooterColumn[],
	legal: "© 2026 Stockbreak",
	note: "Devnet only · simulated assets · not investment advice",
};

// ---- detail ----
export interface detailAllocationSegment {
	label: string;
	value: number;
}

export const detailIndex = {
	name: "Magnificent Four",
	symbol: "MAG4",
	initial: "M",
	tags: ["Pre-IPO · PreStocks", "Simulated"],
	nav: "1.0000",
	navDelta: "+0.0055 (+0.55%)",
	navNote: "Share price · NAV updated 2m ago",
	ret7d: "+2.38%",
	retVs: "vs SPYx +1.9%",
	retNote: "7d return · benchmark SPYx",
};

export interface detailChartPoint {
	day: string;
	mag4: number;
	spyx: number;
}

const detailMag4 = [
	0.0, 0.0, -0.05, 0.3, 1.2, 2.2, 2.9, 3.2, 3.4, 3.5, 3.5, 3.9, 4.3, 4.6, 5.1,
	5.8, 6.2, 6.6, 7.0,
];
export const detailChart: detailChartPoint[] = detailMag4.map((v, i) => ({
	day: String(12 + i),
	mag4: v,
	spyx: Math.round(((i * 2.2) / 18) * 100) / 100,
}));

export const detailRanges = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

export const detailStatGroups: { label: string; value: string }[][] = [
	[
		{ label: "AUM", value: "$14.1K" },
		{ label: "Holders", value: "14" },
		{ label: "Clones", value: "2" },
		{ label: "Followers", value: "1" },
	],
	[
		{ label: "Rebalancing", value: "Drift > 5%" },
		{ label: "Max slippage", value: "1%" },
		{ label: "Cooldown", value: "1 min" },
		{ label: "Keeper", value: "Allowed" },
	],
	[
		{ label: "Mgmt fee", value: "1% / yr" },
		{ label: "Entry / exit", value: "0% / 0%" },
		{ label: "Timelock", value: "120s" },
		{ label: "Created", value: "Sep 20" },
	],
];

export const detailAssets = [
	{
		symbol: "AAPLx",
		initial: "A",
		weight: "41.2%",
		target: "40%",
		drift: "+1.2%",
		trend: "up",
	},
	{
		symbol: "NVDAx",
		initial: "N",
		weight: "29.1%",
		target: "30%",
		drift: "-0.9%",
		trend: "down",
	},
	{
		symbol: "TSLAx",
		initial: "T",
		weight: "19.8%",
		target: "20%",
		drift: "-0.2%",
		trend: "down",
	},
	{
		symbol: "SPACEX-pre",
		initial: "S",
		weight: "9.9%",
		target: "10%",
		drift: "-0.1%",
		trend: "down",
	},
] as const;

export const detailAllocation: detailAllocationSegment[] = [
	{ label: "AAPLx", value: 40 },
	{ label: "NVDAx", value: 30 },
	{ label: "TSLAx", value: 20 },
	{ label: "SPACEX-pre", value: 10 },
];

export const detailJoinTabs = [
	{ value: "join", label: "Join" },
	{ value: "redeem", label: "Redeem" },
];

export const detailQuickAmounts = [
	{ label: "$10", value: "10" },
	{ label: "$50", value: "50" },
	{ label: "$100", value: "100" },
	{ label: "Max", value: "1240" },
];

export const detailJoinRows = [
	{ label: "Estimated shares", value: "99.86" },
	{ label: "Entry fee", value: "0%" },
	{ label: "Route", value: "USDC → 4 swaps" },
	{ label: "Network fee", value: "~$0.001" },
];

export const detailMaxAmount = "1,240";

export const detailShareActions = ["Copy link", "Blink", "X post"];

export const detailCreator = {
	initial: "8",
	address: "8FcD…cL9y",
	meta: "Level 4 · 2 indexes",
};

// ---- app shell ----
// Hash links are intercepted by the app root (`#/<page>`), so the same data drives the navbar and the sidebar.
export const appNav = [
	{ label: "Markets", href: "#/markets" },
	{ label: "Explore", href: "#/explore" },
	{ label: "Feed", href: "#/feed" },
	{ label: "Leaderboard", href: "#/leaderboard" },
	{ label: "AI", href: "#/agents" },
	{ label: "Portfolio", href: "#/portfolio" },
];

export const sidebarNav = [
	{ label: "Dashboard", icon: "dashboard", href: "#/markets" },
	{ label: "Explore", icon: "explore", href: "#/explore" },
	{ label: "Feed", icon: "feed", href: "#/feed" },
	{ label: "Leaderboard", icon: "leaderboard", href: "#/leaderboard" },
	{ label: "AI agents", icon: "agents", href: "#/agents" },
	{ label: "Create index", icon: "create", href: "#/create" },
	{ label: "Portfolio", icon: "portfolio", href: "#/portfolio" },
	{ label: "Settings", icon: "settings", href: "#/profile" },
] as const;

export const watchlist = [
	{
		symbol: "MAG4",
		price: "1.0000",
		change: "+2.38%",
		letter: "M",
		color: "var(--chart-1)",
	},
	{
		symbol: "MAGT",
		price: "1.0012",
		change: "+1.12%",
		letter: "T",
		color: "var(--chart-2)",
	},
	{
		symbol: "AIFR",
		price: "1.0104",
		change: "+0.84%",
		letter: "A",
		color: "var(--chart-3)",
	},
	{
		symbol: "ATLS",
		price: "0.9893",
		change: "-0.64%",
		letter: "A",
		color: "var(--chart-4)",
	},
] as const;

/** Page ids and the nav entry each one highlights, per layout. */
export type PageId =
	| "markets"
	| "explore"
	| "index"
	| "leaderboard"
	| "create"
	| "feed"
	| "agents"
	| "portfolio"
	| "profile"
	| "faucet"
	| "landing";

export const pageTitles: Record<PageId, string> = {
	markets: "Markets",
	explore: "Explore",
	index: "Index detail",
	leaderboard: "Leaderboard",
	create: "Create index",
	feed: "Feed",
	agents: "AI agents",
	portfolio: "Portfolio",
	profile: "Profile",
	faucet: "Faucet",
	landing: "Home",
};

/** Which nav href is active for a page (detail pages belong to Explore, Create to the Create entry, ...). */
export const pageNav: Record<PageId, string> = {
	markets: "#/markets",
	explore: "#/explore",
	index: "#/explore",
	leaderboard: "#/leaderboard",
	create: "#/create",
	feed: "#/feed",
	agents: "#/agents",
	portfolio: "#/portfolio",
	profile: "#/profile",
	faucet: "#/faucet",
	landing: "#/landing",
};

export const pageIds = Object.keys(pageTitles) as PageId[];
