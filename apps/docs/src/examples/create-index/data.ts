// Sample data for the Create index example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
export interface Asset {
	symbol: string;
	name: string;
	price: string;
	/** Source tag shown as a badge next to the symbol. */
	tag?: string;
	detail: string;
}

export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export const steps = [
	{ value: "assets", label: "Assets" },
	{ value: "weights", label: "Weights" },
	{ value: "strategy", label: "Strategy" },
	{ value: "fees", label: "Fees" },
	{ value: "review", label: "Review" },
] as const;

export type StepValue = (typeof steps)[number]["value"];

export const assets: Asset[] = [
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

export const rebalance = [
	{ value: "drift", label: "On drift" },
	{ value: "daily", label: "Daily" },
	{ value: "weekly", label: "Weekly" },
	{ value: "never", label: "Never" },
];

export const defaults = {
	drift: 5,
	fee: 1,
	entry: 0,
	exit: 0,
	rebalance: "drift",
};
