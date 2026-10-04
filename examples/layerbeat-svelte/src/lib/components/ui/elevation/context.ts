import { getContext, setContext } from "svelte";

// Elevation plumbing (v4). Components take `elevation = "auto"` and resolve it with
// `useElevation(() => elevation, role)`; an <ElevationProvider> scope switches a subtree to layered.

export type Elevation = "auto" | "sunken" | "flat" | "raised" | "floating";
export type ElevationLevel = Exclude<Elevation, "auto">;
export type ElevationMode = "flat" | "layered";

// Role defaults in layered mode (copied from the v4 recipes). In flat mode everything is "flat".
export const ROLE_LEVEL = {
	"button-filled": "raised",
	"button-quiet": "flat",
	field: "sunken",
	control: "flat",
	handle: "raised",
	surface: "raised",
	container: "flat",
	overlay: "floating",
} as const;
export type ElevationRole = keyof typeof ROLE_LEVEL;

// prop -> scope (forced level, or mode) -> flat. An explicit prop always wins.
export function resolveElevation(
	prop: Elevation | undefined,
	scope: Elevation | ElevationMode | undefined,
	role: ElevationRole,
): ElevationLevel {
	if (prop && prop !== "auto") return prop;
	if (scope && scope !== "auto" && scope !== "flat" && scope !== "layered")
		return scope;
	return scope === "layered" ? ROLE_LEVEL[role] : "flat";
}

const SCOPE_CONTEXT = Symbol("EDMI_ELEVATION_SCOPE");
const SURFACE_CONTEXT = Symbol("EDMI_ELEVATION_SURFACE");

type Scope = ElevationLevel | ElevationMode;

export function setElevationScope(getScope: () => Scope) {
	setContext(SCOPE_CONTEXT, getScope);
}

// Current scope of the nearest <ElevationProvider> ("flat" without one). `current` is a getter: reactive.
export function getElevationScope(): { readonly current: Scope } {
	const get = getContext<(() => Scope) | undefined>(SCOPE_CONTEXT);
	return {
		get current() {
			return get?.() ?? "flat";
		},
	};
}

// Surfaces (card, panel body, popover, dialog) call this with their resolved level so nested surfaces drop to flat.
export function setSurface(getLevel: () => ElevationLevel) {
	setContext(SURFACE_CONTEXT, getLevel);
}

// Resolved level for a component of the given role: prop -> nearest provider -> flat.
// A `surface` with `auto` inside a raised/floating surface drops to flat (no bevel on bevel);
// an explicit prop still wins, controls and fields ignore nesting.
// Call during component init; read `.current` inside `$derived` / the template to stay reactive.
export function useElevation(
	getProp: () => Elevation | undefined,
	role: ElevationRole,
): { readonly current: ElevationLevel } {
	const scope = getContext<(() => Scope) | undefined>(SCOPE_CONTEXT);
	const parent = getContext<(() => ElevationLevel) | undefined>(
		SURFACE_CONTEXT,
	);
	return {
		get current() {
			const prop = getProp();
			const level = resolveElevation(prop, scope?.(), role);
			const p = parent?.();
			if (
				role === "surface" &&
				(!prop || prop === "auto") &&
				(p === "raised" || p === "floating")
			)
				return "flat";
			return level;
		},
	};
}
