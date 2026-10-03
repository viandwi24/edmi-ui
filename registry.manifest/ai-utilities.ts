import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/**
 * AI · Utilities: shared helpers of the AI pack. React only: Radix' `useControllableState` is replaced
 * by a local hook (Base UI has no public equivalent); Vue uses `useVModel`, Svelte uses `$bindable`.
 */
export const items: Item[] = [
	{
		...aiItem({
			name: "use-controllable-state",
			title: "useControllableState",
			description:
				"Controlled/uncontrolled state hook used by the AI components (replaces @radix-ui/react-use-controllable-state).",
			category: C.utilities,
			type: "registry:hook",
			react: {
				files: [{ path: "registry/hooks/ai/use-controllable-state.ts" }],
				dependencies: [],
			},
		}),
		docs: "Shared hook of the Edmi AI pack, installed automatically with the components that need it.",
	},
];
