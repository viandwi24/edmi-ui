import { getContext, setContext } from "svelte";
import type {
	AttachmentData,
	AttachmentMediaCategory,
	AttachmentVariant,
} from "./types.js";

/** Getter objects keep the contexts reactive. */
export interface AttachmentsContextValue {
	readonly variant: AttachmentVariant;
}

export interface AttachmentContextValue {
	readonly data: AttachmentData;
	readonly mediaCategory: AttachmentMediaCategory;
	/** Undefined when the parent passes no `onRemove` (the remove button then hides). */
	readonly onRemove: (() => void) | undefined;
	readonly variant: AttachmentVariant;
}

const ATTACHMENTS_KEY = Symbol("ai-attachments");
const ATTACHMENT_KEY = Symbol("ai-attachment");

export function setAttachmentsContext(value: AttachmentsContextValue) {
	return setContext(ATTACHMENTS_KEY, value);
}

export function useAttachmentsContext(): AttachmentsContextValue {
	return (
		getContext<AttachmentsContextValue | undefined>(ATTACHMENTS_KEY) ?? {
			variant: "grid",
		}
	);
}

export function setAttachmentContext(value: AttachmentContextValue) {
	return setContext(ATTACHMENT_KEY, value);
}

export function useAttachmentContext(): AttachmentContextValue {
	const ctx = getContext<AttachmentContextValue | undefined>(ATTACHMENT_KEY);
	if (!ctx) {
		throw new Error("Attachment components must be used within <Attachment>");
	}
	return ctx;
}
