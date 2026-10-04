import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

/* Elevation plumbing (v4). Components take `elevation?: Elevation` (default "auto") and resolve it with
   `useElevation(prop, role)`; an <ElevationProvider> scope switches a whole subtree to the layered mode. */

export type Elevation = "auto" | "sunken" | "flat" | "raised" | "floating";
export type ElevationLevel = Exclude<Elevation, "auto">;
export type ElevationMode = "flat" | "layered";

/* Role defaults in layered mode (copied from the v4 recipes). In flat mode everything is "flat". */
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

/** prop -> scope (forced level, or mode) -> flat. An explicit prop always wins. */
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

const ScopeContext = React.createContext<ElevationLevel | ElevationMode>(
	"flat",
);
const SurfaceContext = React.createContext<ElevationLevel | undefined>(
	undefined,
);

/** Resolved level for a component of the given role: prop -> nearest provider -> flat.
 *  A `surface` with `auto` inside a raised/floating surface drops to flat (no bevel on bevel);
 *  an explicit prop still wins, controls and fields ignore nesting. */
function useElevation(
	prop: Elevation | undefined,
	role: ElevationRole,
): ElevationLevel {
	const scope = React.useContext(ScopeContext);
	const parent = React.useContext(SurfaceContext);
	const level = resolveElevation(prop, scope, role);
	if (
		role === "surface" &&
		(!prop || prop === "auto") &&
		(parent === "raised" || parent === "floating")
	)
		return "flat";
	return level;
}

/** Surfaces (card, panel body, popover, dialog) wrap their children so nested surfaces can drop to flat. */
function SurfaceProvider({
	level,
	children,
}: {
	level: ElevationLevel;
	children?: React.ReactNode;
}) {
	return (
		<SurfaceContext.Provider value={level}>{children}</SurfaceContext.Provider>
	);
}

type ElevationProviderProps = useRender.ComponentProps<"div"> & {
	/** "layered": every role takes its default level; "flat" (default). Inherits the parent scope when omitted. */
	mode?: ElevationMode;
	/** Force one level for the whole subtree (wins over `mode`). */
	level?: ElevationLevel;
};

/** Sets the elevation scope for a subtree and renders `data-elevation`. Layout-neutral (`display: contents`)
 *  unless you pass a `className`. */
function ElevationProvider({
	mode,
	level,
	className,
	style,
	render,
	...props
}: ElevationProviderProps) {
	const parent = React.useContext(ScopeContext);
	const scope = level ?? mode ?? parent;
	const element = useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className,
				style: className ? style : { display: "contents", ...style },
			},
			props,
		),
		render,
		state: { slot: "elevation-provider", elevation: scope },
	});
	return <ScopeContext.Provider value={scope}>{element}</ScopeContext.Provider>;
}

export { ElevationProvider, SurfaceProvider, useElevation };
