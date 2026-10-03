// Sample data for the Index detail example (Stockbreak, MAG4). Shared by react.tsx, vue.vue and svelte.svelte.
export interface AllocationSegment {
	label: string;
	value: number;
}

export const index = {
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

export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export interface ChartPoint {
	day: string;
	mag4: number;
	spyx: number;
}

const mag4 = [
	0.0, 0.0, -0.05, 0.3, 1.2, 2.2, 2.9, 3.2, 3.4, 3.5, 3.5, 3.9, 4.3, 4.6, 5.1,
	5.8, 6.2, 6.6, 7.0,
];
export const chart: ChartPoint[] = mag4.map((v, i) => ({
	day: String(12 + i),
	mag4: v,
	spyx: Math.round(((i * 2.2) / 18) * 100) / 100,
}));

export const ranges = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

export const statGroups: { label: string; value: string }[][] = [
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

export const assets = [
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

export const allocation: AllocationSegment[] = [
	{ label: "AAPLx", value: 40 },
	{ label: "NVDAx", value: 30 },
	{ label: "TSLAx", value: 20 },
	{ label: "SPACEX-pre", value: 10 },
];

export const joinTabs = [
	{ value: "join", label: "Join" },
	{ value: "redeem", label: "Redeem" },
];

export const quickAmounts = ["10", "50", "100"];

export const joinRows = [
	{ label: "Estimated shares", value: "99.86" },
	{ label: "Entry fee", value: "0%" },
	{ label: "Route", value: "USDC → 4 swaps" },
	{ label: "Network fee", value: "~$0.001" },
];

export const maxAmount = "1,240";

export const shareActions = ["Copy link", "Blink", "X post"];

export const creator = {
	initial: "8",
	address: "8FcD…cL9y",
	meta: "Level 4 · 2 indexes",
};
