// Sample data for the Chat + artifact viewer example. Shared by react.tsx, vue.vue and svelte.svelte.

export type Segment = { t: string; b?: boolean; link?: boolean };

export interface PaperDoc {
	kicker: string;
	headline: string;
	lead: Segment[];
	heading: string;
	body: Segment[];
}

export interface ArtifactDoc {
	id: string;
	title: string;
	/** Card meta line, e.g. "Document · PDF". */
	meta: string;
	/** Shown after the viewer title, in mono. */
	format: string;
	kind: "document";
	/** First card shows the cropped page thumbnail, the second the icon tile. */
	thumbnail: boolean;
	paper: PaperDoc;
}

export const notes = `**Before you use this document:**

- **The ranking is a judgment, not a score.** Data backs each idea but not the order.
- **Research is partial.** Some competitors were not checked; all are flagged.

Sources I re-checked:

- [RevenueCat subscription report](https://example.com/revenuecat)
- [Stripe founder data](https://example.com/stripe)
- [Jupiter API terms](https://example.com/jupiter)`;

export const question = "Add a slide version, point by point?";
export const processNote =
	"Updating the task list and marking finished items complete.";

export const docs: ArtifactDoc[] = [
	{
		id: "pdf",
		title: "Eight index ideas",
		meta: "Document · PDF",
		format: "PDF",
		kind: "document",
		thumbnail: true,
		paper: {
			kicker: "RESEARCH · 8 INDEX IDEAS · OCT 2026",
			headline: "Distribution, not AI, picks the winner",
			lead: [
				{
					t: "Some indexes can win now, but the product shape and channel decide it. Three shapes work for teams of 1–3 (",
				},
				{ t: "Stripe", link: true },
				{ t: "; " },
				{ t: "RevenueCat", link: true },
				{ t: "). " },
				{ t: "None of the eight ideas passes without conditions.", b: true },
				{
					t: " The three best supported: idea 8 as a B2B ops layer, idea 3 as a local terminal for developers, idea 4 as a learning path.",
				},
			],
			heading: "What wins now: narrow vertical, recurring billing, own channel",
			body: [
				{
					t: "The first winning shape is vertical B2B. Solo founders in the top decile are about ",
				},
				{ t: "twice as likely to build AI-native products", b: true },
				{ t: " and sell to 10 countries in month one." },
			],
		},
	},
	{
		id: "md",
		title: "Eight index ideas",
		meta: "Document · MD",
		format: "MD",
		kind: "document",
		thumbnail: false,
		paper: {
			kicker: "NOTES · 8 INDEX IDEAS · OCT 2026",
			headline: "Eight index ideas, point by point",
			lead: [
				{
					t: "Each idea is scored on channel, margin and time to first holder. ",
				},
				{ t: "Ideas 3, 4 and 8 clear the bar", b: true },
				{ t: "; the other five need a channel first." },
			],
			heading: "Open conditions per idea",
			body: [
				{ t: "Idea 8 needs one design partner. Idea 3 needs a " },
				{ t: "signed terminal build", b: true },
				{ t: ". Idea 4 needs a curriculum owner." },
			],
		},
	},
];

export const composer = {
	disclaimer: "Edmi is AI and can make mistakes.",
	models: [
		{ id: "opus", label: "Opus" },
		{ id: "sonnet", label: "Sonnet" },
	],
	efforts: [
		{ id: "low", label: "Low" },
		{ id: "medium", label: "Medium" },
		{ id: "high", label: "High" },
	],
	modes: [
		{ id: "auto", label: "Auto" },
		{ id: "ask", label: "Ask first" },
	],
};
