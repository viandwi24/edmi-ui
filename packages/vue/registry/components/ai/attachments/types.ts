import type { FileUIPart, SourceDocumentUIPart } from "ai";

export type AttachmentData =
	| (FileUIPart & {
			id: string;
			/** Bytes, shown in the list meta line. */
			size?: number;
	  })
	| (SourceDocumentUIPart & { id: string; size?: number });

export type AttachmentMediaCategory =
	| "image"
	| "video"
	| "audio"
	| "document"
	| "source"
	| "unknown";

export type AttachmentVariant = "grid" | "inline" | "list";
