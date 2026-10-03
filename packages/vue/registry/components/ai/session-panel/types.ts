import type { ArtifactKind } from "@/registry/edmi/components/ai/artifact-card";

export type SessionSourceFavicon = {
	label: string;
	/** Favicon image; initials on `color` when omitted. */
	src?: string;
	/** Brand color of the initials tile (data, not themed). */
	color?: string;
};

export type { ArtifactKind };
