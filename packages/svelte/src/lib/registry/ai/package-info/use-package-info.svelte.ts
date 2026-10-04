import { getContext, setContext } from "svelte";

export type PackageChangeType =
	| "major"
	| "minor"
	| "patch"
	| "added"
	| "removed";

/** Getter object keeps the context reactive. */
export interface PackageInfoContextValue {
	readonly name: string;
	readonly currentVersion: string | undefined;
	readonly newVersion: string | undefined;
	readonly changeType: PackageChangeType | undefined;
}

const KEY = Symbol("ai-package-info");

export function setPackageInfoContext(value: PackageInfoContextValue) {
	return setContext(KEY, value);
}

export function usePackageInfoContext(): PackageInfoContextValue {
	const ctx = getContext<PackageInfoContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error("PackageInfo parts must be used within <PackageInfo>");
	}
	return ctx;
}
