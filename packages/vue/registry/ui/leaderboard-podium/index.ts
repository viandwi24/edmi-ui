export type PodiumEntry = {
	rank: 1 | 2 | 3;
	name: string;
	/** Mono caption under the name, e.g. `$49.2K AUM · 412 holders`. */
	meta: string;
	image?: string;
	/** Avatar initials; defaults to the first two letters of `name`. */
	initials?: string;
	href?: string;
};

export { default as LeaderboardPodium } from "./LeaderboardPodium.vue";
