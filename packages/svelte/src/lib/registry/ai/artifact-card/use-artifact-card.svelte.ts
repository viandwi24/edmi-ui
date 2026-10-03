import { getContext, setContext } from "svelte";

export type ArtifactKind =
	| "archive"
	| "document"
	| "code"
	| "image"
	| "slides"
	| "file";

export type ArtifactCardState = "ready" | "generating";

const KEY = Symbol("ArtifactCardState");

/** `state` is passed as a getter so the context stays reactive. */
export function setArtifactCardState(state: () => ArtifactCardState) {
	setContext(KEY, {
		get state() {
			return state();
		},
	});
}

export function getArtifactCardState(): { readonly state: ArtifactCardState } {
	return (
		getContext<{ readonly state: ArtifactCardState } | undefined>(KEY) ?? {
			state: "ready",
		}
	);
}
