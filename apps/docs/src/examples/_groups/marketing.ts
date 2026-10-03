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
	{
		slug: "editorial-light",
		title: "Editorial (light)",
		tag: "Marketing",
		description:
			"Cofounder-style editorial marketing page: two-tone hero, agent workspace card, feature rows with a staged board, metric tiles with live joiners, guide chapter cards and footer.",
		board: "Cofounder Clone",
		thumb: "editorial-light",
		frameworks: ALL,
		height: 900,
		uses: [
			"SiteHeader",
			"FeatureRow",
			"Card",
			"Tabs",
			"StatTile",
			"Avatar",
			"Badge",
			"Button",
			"SiteFooter",
		],
	},
	{
		slug: "editorial-dark",
		title: "Editorial (dark)",
		tag: "Marketing",
		description:
			"Claude-style dark editorial page: navigation menu with a product mega menu, centered hero with sign-in card and a live index card, plan comparison with a segmented switch, FAQ accordion and footer.",
		board: "Claude Clone",
		thumb: "editorial-dark",
		frameworks: ALL,
		height: 900,
		uses: [
			"NavigationMenu",
			"Card",
			"Button",
			"ToggleGroup",
			"PricingPlan",
			"Accordion",
			"SiteHeader",
			"SiteFooter",
		],
	},
	{
		slug: "themes",
		title: "Theme playground",
		tag: "Theme",
		description:
			"Customizer for base color, theme, mode, radius and depth with a live preview: change a knob and a small composite of Edmi components re-themes in place, plus the attributes it sets.",
		board: "Edmi UI 02 · Themes",
		thumb: "themes",
		frameworks: ALL,
		height: 900,
		uses: [
			"ToggleGroup",
			"Card",
			"Tabs",
			"Button",
			"Badge",
			"Switch",
			"Checkbox",
			"Input",
			"Label",
		],
	},
];
