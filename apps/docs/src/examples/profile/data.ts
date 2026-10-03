// Sample data for the User profile example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export const profile = {
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

export interface Created {
	name: string;
	symbol: string;
	tokens: string[];
	price: string;
	change: string;
	aum: string;
}

export const created: Created[] = [
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

export interface Position {
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

const up = [1.0, 1.01, 1.03, 1.02, 1.04, 1.04, 1.05, 1.06];
const down = [1.0, 0.99, 0.98, 0.985, 0.97, 0.972, 0.97, 0.965];

export const positions: Position[] = [
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
