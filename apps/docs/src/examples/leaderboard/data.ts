// Sample data for the Leaderboard example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
// Types are structural copies of the registry's IndexRowData / AllocationSegment so this file stays framework-free.
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

export interface AllocationSegment {
	label: string;
	value: number;
}

export interface PodiumEntry {
	rank: 1 | 2 | 3;
	name: string;
	symbol: string;
	creator: string;
	change: string;
	aum: string;
	holders: number;
	spark: number[];
	allocation: AllocationSegment[];
}

const up = [1.0, 1.01, 1.03, 1.02, 1.04, 1.04, 1.05, 1.06];
const down = [1.0, 0.99, 0.98, 0.985, 0.97, 0.972, 0.97, 0.965];
const pre = "Pre-IPO · PreStocks";
const t = (...labels: string[]) => labels.map((label) => ({ label }));

export const podium: PodiumEntry[] = [
	{
		rank: 1,
		name: "Mag Four Tilt",
		symbol: "MAGT",
		creator: "GbFK…ZUWS",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
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
		creator: "8FcD…cL9y",
		change: "+0.84%",
		aum: "$82.4K",
		holders: 2,
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
		creator: "7Ge1…kXSq",
		change: "-2.09%",
		aum: "$29K",
		holders: 1,
		spark: down,
		allocation: [
			{ label: "SPACEX-pre", value: 40 },
			{ label: "ANDURL-pre", value: 30 },
			{ label: "TSLAx", value: 30 },
		],
	},
];

export const indexes: IndexRowData[] = [
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

export const tabs = [
	{ value: "indexes", label: "Indexes" },
	{ value: "creators", label: "Creators" },
];

export const periods = [
	{ value: "24h", label: "24H" },
	{ value: "7d", label: "7D" },
	{ value: "30d", label: "30D" },
	{ value: "all", label: "ALL" },
];

export const kinds = [
	{ value: "all", label: "All" },
	{ value: "human", label: "Human" },
	{ value: "ai", label: "AI" },
];

export const benchmark = "SPYx 7D: +0.48%";

export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];
