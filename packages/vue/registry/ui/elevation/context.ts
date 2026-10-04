import { type ComputedRef, computed, inject, provide } from "vue";

// Elevation plumbing (v4). Components take `elevation?: Elevation` (default "auto" = undefined) and resolve it
// with `useElevation(() => props.elevation, role)`; an <ElevationProvider> scope switches a subtree to layered.

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

const SCOPE_KEY = Symbol("EDMI_ELEVATION_SCOPE");
const SURFACE_KEY = Symbol("EDMI_ELEVATION_SURFACE");

type Getter<T> = { readonly value: T };

export function provideElevationScope(
	getScope: () => ElevationLevel | ElevationMode,
) {
	provide<Getter<ElevationLevel | ElevationMode>>(SCOPE_KEY, {
		get value() {
			return getScope();
		},
	});
}

export function injectElevationScope(): ElevationLevel | ElevationMode {
	return (
		inject<Getter<ElevationLevel | ElevationMode> | undefined>(
			SCOPE_KEY,
			undefined,
		)?.value ?? "flat"
	);
}

// Surfaces (card, panel body, popover, dialog) call this with their resolved level so nested surfaces drop to flat.
export function provideSurface(getLevel: () => ElevationLevel) {
	provide<Getter<ElevationLevel>>(SURFACE_KEY, {
		get value() {
			return getLevel();
		},
	});
}

// Resolved level for a component of the given role: prop -> nearest provider -> flat.
// A `surface` with `auto` inside a raised/floating surface drops to flat (no bevel on bevel);
// an explicit prop still wins, controls and fields ignore nesting.
export function useElevation(
	getProp: () => Elevation | undefined,
	role: ElevationRole,
): ComputedRef<ElevationLevel> {
	const scope = inject<Getter<ElevationLevel | ElevationMode> | undefined>(
		SCOPE_KEY,
		undefined,
	);
	const parent = inject<Getter<ElevationLevel> | undefined>(
		SURFACE_KEY,
		undefined,
	);
	return computed(() => {
		const prop = getProp();
		const level = resolveElevation(prop, scope?.value, role);
		if (
			role === "surface" &&
			(!prop || prop === "auto") &&
			(parent?.value === "raised" || parent?.value === "floating")
		)
			return "flat";
		return level;
	});
}
