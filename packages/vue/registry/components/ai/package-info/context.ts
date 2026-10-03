// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ComputedRef, InjectionKey } from "vue";
import { inject } from "vue";

export type PackageChangeType =
	| "major"
	| "minor"
	| "patch"
	| "added"
	| "removed";

export interface PackageInfoContext {
	name: ComputedRef<string>;
	currentVersion: ComputedRef<string | undefined>;
	newVersion: ComputedRef<string | undefined>;
	changeType: ComputedRef<PackageChangeType | undefined>;
}

export const PackageInfoKey: InjectionKey<PackageInfoContext> =
	Symbol("PackageInfo");

export function usePackageInfoContext() {
	const ctx = inject(PackageInfoKey);
	if (!ctx)
		throw new Error("PackageInfo parts must be used within <PackageInfo />");
	return ctx;
}
