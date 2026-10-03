import type { IndexRowData } from "@/components/index-row";
import type { TickerItem } from "@/components/ticker-strip";

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

const up = [1.0, 1.01, 1.03, 1.02, 1.04, 1.04, 1.05, 1.06];
const down = [1.0, 0.99, 0.98, 0.985, 0.97, 0.972, 0.97, 0.965];

const pre = "Pre-IPO · PreStocks";

export const indexes: IndexRowData[] = [
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

export const watchlist = [
	{ symbol: "MAG4", price: "1.0000", change: "+2.38%", color: "var(--brand)" },
	{ symbol: "MAGT", price: "1.0012", change: "+1.12%", color: "var(--info)" },
	{ symbol: "AIFR", price: "1.0104", change: "+0.84%", color: "#9a8cf0" },
	{
		symbol: "ATLS",
		price: "0.9893",
		change: "-0.64%",
		color: "var(--warning)",
	},
];

export const humanVsAi = {
	human: {
		label: "Human · median 7d",
		value: "+0.84%",
		note: "34 indexes · best MAGT",
	},
	ai: { label: "AI · median 7d", value: "—", note: "0 indexes" },
};

export const creators = [
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

export const activity = [
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

export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];
