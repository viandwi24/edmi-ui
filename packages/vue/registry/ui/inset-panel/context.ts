import type { InjectionKey } from "vue";
import type { ElevationLevel } from "@/registry/edmi/ui/elevation";

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

// The panel hands its resolved level to the body (getter object so it stays reactive).
export const INSET_PANEL_KEY: InjectionKey<{ readonly value: ElevationLevel }> =
	Symbol("EDMI_INSET_PANEL");
