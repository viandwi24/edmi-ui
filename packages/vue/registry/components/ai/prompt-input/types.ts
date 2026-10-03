// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { FileUIPart, SourceDocumentUIPart } from "ai";
import type { InjectionKey, Ref } from "vue";

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

export interface PromptInputContext {
	textInput: Ref<string>;
	files: Ref<AttachmentFile[]>;
	referencedSources: Ref<ReferencedSource[]>;
	isLoading: Ref<boolean>;
	/** ✦ the composer's `raised` flows to the submit button. */
	raised: Ref<boolean>;
	fileInputRef: Ref<HTMLInputElement | null>;
	options: PromptInputOptions;
	setTextInput: (val: string) => void;
	addFiles: (files: File[] | FileList) => void;
	removeFile: (id: string) => void;
	clearFiles: () => void;
	clearInput: () => void;
	addSource: (sources: SourceDocumentUIPart | SourceDocumentUIPart[]) => void;
	removeSource: (id: string) => void;
	clearSources: () => void;
	openFileDialog: () => void;
	submitForm: () => Promise<void>;
}

export const PROMPT_INPUT_KEY: InjectionKey<PromptInputContext> =
	Symbol("PromptInputContext");
