// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { InjectionKey, Ref } from "vue";
import { computed, inject } from "vue";
import type {
	AttachmentData,
	AttachmentMediaCategory,
	AttachmentVariant,
} from "./types";

export interface AttachmentsContextValue {
	variant: Ref<AttachmentVariant>;
}

export const AttachmentsKey: InjectionKey<AttachmentsContextValue> =
	Symbol("Attachments");

export function useAttachmentsContext(): AttachmentsContextValue {
	const ctx = inject(AttachmentsKey, null);
	if (!ctx) {
		return { variant: computed(() => "grid" as const) };
	}
	return ctx;
}

export interface AttachmentContextValue {
	data: Ref<AttachmentData>;
	mediaCategory: Ref<AttachmentMediaCategory>;
	/** Undefined when the parent has no `@remove` listener (the remove button then hides). */
	remove?: () => void;
	variant: Ref<AttachmentVariant>;
}

export const AttachmentKey: InjectionKey<AttachmentContextValue> =
	Symbol("Attachment");

export function useAttachmentContext(): AttachmentContextValue {
	const ctx = inject(AttachmentKey);
	if (!ctx) {
		throw new Error("Attachment components must be used within <Attachment>");
	}
	return ctx;
}
