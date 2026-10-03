// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { FileUIPart, SourceDocumentUIPart } from "ai";

export interface PromptInputMessage {
	text: string;
	files: FileUIPart[];
}

export interface AttachmentFile extends FileUIPart {
	id: string;
	/** Bytes (only known for files added through the composer). */
	size?: number;
}

export interface ReferencedSource extends SourceDocumentUIPart {
	id: string;
}

export interface PromptInputError {
	code: "max_files" | "max_file_size" | "accept" | "submit_error";
	message: string;
}

/** Validation options; `PromptInput` writes its props here so a lifted provider validates too. */
export interface PromptInputOptions {
	accept?: string;
	maxFiles?: number;
	maxFileSize?: number;
	onError?: (err: PromptInputError) => void;
	onSubmit?: (message: PromptInputMessage) => void | Promise<void>;
}
