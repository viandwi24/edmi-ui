// Sample data for the Feed example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export const views = [
	{ value: "following", label: "Following" },
	{ value: "all", label: "All" },
];

export interface Update {
	id: string;
	who: string;
	initial: string;
	action: string;
	detail?: string;
	symbol: string;
	tokens: string[];
	ago: string;
}

export const updates: Update[] = [
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

export interface Post {
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

export const posts: Post[] = [
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

export const moreUpdates = 6;
export const maxChars = 500;
