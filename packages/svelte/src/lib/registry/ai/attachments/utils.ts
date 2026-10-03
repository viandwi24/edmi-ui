// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { AttachmentData, AttachmentMediaCategory } from "./types.js";

export function getMediaCategory(
	data: AttachmentData,
): AttachmentMediaCategory {
	if (data.type === "source-document") {
		return "source";
	}

	const mediaType = data.mediaType ?? "";

	if (mediaType.startsWith("image/")) {
		return "image";
	}
	if (mediaType.startsWith("video/")) {
		return "video";
	}
	if (mediaType.startsWith("audio/")) {
		return "audio";
	}
	if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
		return "document";
	}

	return "unknown";
}

export function getAttachmentLabel(data: AttachmentData): string {
	if (data.type === "source-document") {
		return data.title || data.filename || "Source";
	}

	const category = getMediaCategory(data);
	return data.filename || (category === "image" ? "Image" : "Attachment");
}

export function formatSize(bytes?: number): string | undefined {
	if (bytes === undefined) return undefined;
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
