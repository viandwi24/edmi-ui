// Sample data for the Faucet example (Stockbreak). Shared by react.tsx, vue.vue and svelte.svelte.
export const nav = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export const wallet = {
	address: "abHaSbWAxCNM2DhyGe5U2eLRZzViRDSVLLMD7ERumq7",
	sol: 81.654,
	usdc: 1040,
};

export const solFaucet = {
	title: "1. SOL for transaction fees",
	description:
		"Sends 0.1 SOL from the app’s faucet wallet. Limited per wallet per day.",
	linkLabel: "faucet.solana.com",
	linkHref: "https://faucet.solana.com",
	buttonLabel: "Open faucet.solana.com",
};

export const usdcFaucet = {
	title: "2. Simulated USDC",
	description:
		"Minted by the mock market. Up to 10,000 per request. You sign one transaction.",
	amounts: [1000, 5000, 10000],
	defaultAmount: 5000,
};
