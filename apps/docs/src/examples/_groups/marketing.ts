import type { ExampleMeta } from "../index";

const ALL = ["react", "vue", "svelte"] as const;

/** Examples owned by the `marketing` worker group. Append entries; keep the order of EXAMPLES.md. */
export const examples: ExampleMeta[] = [
	{
		slug: "landing",
		title: "Landing",
		tag: "Marketing",
		description:
			"Stockbreak landing page: site header, hero with a live index card and join panel, stat strip, problem columns, four step cards, pricing plans, closing call to action and footer, all raised.",
		board: "Stockbreak · Landing",
		thumb: "landing",
		frameworks: ALL,
		height: 900,
		uses: [
			"SiteHeader",
			"Card",
			"AllocationBar",
			"JoinPanel",
			"StatStrip",
			"StepCard",
			"PricingPlan",
			"SiteFooter",
			"Badge",
			"Button",
		],
	},
];
