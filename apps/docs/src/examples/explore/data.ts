// Sample data for the Explore example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
// Types are structural copies of the registry's IndexRowData so this file stays framework-free.
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
}

export type Kind = "human" | "ai";

const up = [1.0, 1.01, 1.03, 1.02, 1.04, 1.04, 1.05, 1.06];
const down = [1.0, 0.99, 0.98, 0.985, 0.97, 0.972, 0.97, 0.965];
const pre = "Pre-IPO · PreStocks";
const t = (...labels: string[]) => labels.map((label) => ({ label }));

export const indexes: (IndexRowData & { kind: Kind })[] = [
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

export const kinds = [
	{ value: "all", label: "All" },
	{ value: "human", label: "Human" },
	{ value: "ai", label: "AI" },
] as const;

export const strategies = [
	{ value: "any", label: "Any strategy" },
	{ value: "clone", label: "Clone" },
	{ value: "follow", label: "Follows" },
];

export const sorts = [
	{ value: "aum", label: "AUM" },
	{ value: "change", label: "7d change" },
	{ value: "holders", label: "Holders" },
];

export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];
