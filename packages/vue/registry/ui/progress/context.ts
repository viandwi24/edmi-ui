import type { ComputedRef, InjectionKey } from "vue";

export const progressPercentKey: InjectionKey<ComputedRef<number | null>> =
	Symbol("edmi-progress-percent");
