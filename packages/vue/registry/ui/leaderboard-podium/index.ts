export type PodiumAllocation = {
	label: string;
	/** Weight in percent (bars are proportional). */
	value: number;
	/** Any CSS color; defaults cycle `--chart-1…5`. */
	color?: string;
};

export type PodiumEntry = {
	rank: 1 | 2 | 3;
	name: string;
	/** Mono caption under the name, e.g. `$49.2K · 412 members`. */
	meta?: string;
	image?: string;
	/** Avatar initials; defaults to the first two letters of `name`. */
	initials?: string;
	href?: string;
	/** ✦ `variant="cards"`: mono ticker under the name. */
	symbol?: string;
	/** ✦ `variant="cards"`: mono owner, top right of the card. */
	owner?: string;
	/** ✦ `variant="cards"`: signed headline percentage, e.g. `+1.12%`. */
	change?: string;
	/** ✦ `variant="cards"`: series for the sparkline. */
	spark?: number[];
	/** ✦ `variant="cards"`: weights bar with legend. */
	allocation?: PodiumAllocation[];
	/** ✦ `variant="cards"`: footer stat, labelled by `valueLabel`. */
	value?: string;
	/** ✦ `variant="cards"`: footer stat, labelled by `countLabel`. */
	count?: string | number;
};

export { default as LeaderboardPodium } from "./LeaderboardPodium.vue";
