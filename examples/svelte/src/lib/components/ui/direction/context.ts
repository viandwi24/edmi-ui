import { getContext, setContext } from "svelte";

export type Direction = "ltr" | "rtl";

const DIRECTION_CONTEXT = Symbol("EDMI_DIRECTION_CONTEXT");

export function setDirectionContext(getDirection: () => Direction) {
	setContext(DIRECTION_CONTEXT, getDirection);
}

// `useDirection()` -> `{ current }`: the direction of the nearest <DirectionProvider>, "ltr" without one.
// `current` is a getter, so reading it inside `$derived` / the template stays reactive.
// Pass a local override to mirror Base UI's `useDirection(localDir)`.
export function useDirection(localDirection?: Direction): {
	readonly current: Direction;
} {
	const getDirection = getContext<(() => Direction) | undefined>(
		DIRECTION_CONTEXT,
	);
	return {
		get current() {
			return localDirection ?? getDirection?.() ?? "ltr";
		},
	};
}
