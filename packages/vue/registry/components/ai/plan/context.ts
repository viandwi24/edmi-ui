// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export interface PlanContextValue {
	isStreaming: Ref<boolean>;
}

export const PlanKey: InjectionKey<PlanContextValue> = Symbol("PlanContext");

export function usePlanContext() {
	const ctx = inject(PlanKey);
	if (!ctx) throw new Error("Plan components must be used within <Plan>");
	return ctx;
}

/** Plain text of a slot (string children only); the shimmer needs it to size its highlight. */
export function slotText(nodes: unknown): string {
	if (!Array.isArray(nodes)) return "";
	let text = "";
	for (const node of nodes as Array<{ children?: unknown }>) {
		if (typeof node.children === "string") text += node.children;
	}
	return text;
}
