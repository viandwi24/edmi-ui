import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject } from "vue";

export type ArtifactKind =
	| "archive"
	| "document"
	| "code"
	| "image"
	| "slides"
	| "file";

export type ArtifactCardState = "ready" | "generating";

export const ARTIFACT_CARD_KEY: InjectionKey<ComputedRef<ArtifactCardState>> =
	Symbol("ArtifactCardState");

export function useArtifactCardState() {
	return inject(
		ARTIFACT_CARD_KEY,
		computed<ArtifactCardState>(() => "ready"),
	);
}
