// Sample data for the Artifact library example. Shared by react.tsx, vue.vue and svelte.svelte.

export type ArtifactType = "docs" | "slides" | "design";

export const tabs = [
	{ value: "all", label: "All" },
	{ value: "yours", label: "Yours" },
	{ value: "shared", label: "Shared with you" },
];

export const banner = {
	title: "Designs live here now",
	text: "New slides and designs are saved as artifacts.",
	action: "Open the design home",
};

export const tiles: { type: ArtifactType; label: string }[] = [
	{ type: "docs", label: "Docs" },
	{ type: "slides", label: "Slides" },
	{ type: "design", label: "Design" },
];

export interface LibraryItem {
	id: string;
	type: ArtifactType;
	title: string;
	note?: string;
	/** Appears under "Shared with you" (and not under "Yours"). */
	shared?: boolean;
	viewed: string;
}

export const groups: { label: string; items: LibraryItem[] }[] = [
	{
		label: "Today",
		items: [
			{
				id: "a1",
				type: "design",
				title: "MAG4 — Editorial minimal",
				viewed: "Viewed 20m ago",
			},
			{
				id: "a2",
				type: "slides",
				title: "8 index ideas",
				viewed: "Viewed 1h ago",
			},
		],
	},
	{
		label: "September",
		items: [
			{ id: "a3", type: "docs", title: "Keeper spec", viewed: "Viewed Sep 24" },
			{
				id: "a4",
				type: "design",
				title: "Stockbreak",
				note: "Shared with you",
				shared: true,
				viewed: "Viewed Sep 26",
			},
		],
	},
];

export const menu = ["Open", "Rename", "Share", "Delete"];
