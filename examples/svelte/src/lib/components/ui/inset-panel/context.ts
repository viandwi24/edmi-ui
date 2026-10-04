import { getContext, setContext } from "svelte";
import type { ElevationLevel } from "#lib/components/ui/elevation/index.js";

// ✦ depth (v4): raised = the body plate bevels; floating = the shell also gets the soft drop; sunken = the shell is a well.
export const insetPanelElevation = {
	sunken: { root: "border-sk-bd bg-sk-bg shadow-sunken", body: "" },
	flat: { root: "", body: "" },
	raised: { root: "", body: "border-transparent shadow-raised" },
	floating: {
		root: "border-transparent shadow-[0_0_1.5px_var(--bv-out),var(--bv-float)]",
		body: "border-transparent shadow-raised",
	},
};

const INSET_PANEL_CONTEXT = Symbol("EDMI_INSET_PANEL");

// The panel hands its resolved level to the body (getter, reactive).
export function setInsetPanelLevel(getLevel: () => ElevationLevel) {
	setContext(INSET_PANEL_CONTEXT, getLevel);
}

export function getInsetPanelLevel(): { readonly current: ElevationLevel } {
	const get = getContext<(() => ElevationLevel) | undefined>(
		INSET_PANEL_CONTEXT,
	);
	return {
		get current() {
			return get?.() ?? "flat";
		},
	};
}
