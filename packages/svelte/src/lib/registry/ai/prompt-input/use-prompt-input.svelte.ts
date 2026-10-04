import type { SourceDocumentUIPart } from "ai";
import { nanoid } from "nanoid";
import { getContext, setContext } from "svelte";
import type {
	AttachmentFile,
	PromptInputOptions,
	ReferencedSource,
} from "./types.js";

const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};

const matchesAccept = (file: File, accept?: string) => {
	if (!accept || accept.trim() === "") return true;
	const patterns = accept
		.split(",")
		.map((s) => s.trim().toLowerCase())
		.filter(Boolean);
	const fileName = file.name.toLowerCase();
	const fileType = file.type.toLowerCase();
	return patterns.some((pattern) => {
		if (pattern.startsWith(".")) return fileName.endsWith(pattern);
		if (pattern.endsWith("/*"))
			return fileType.startsWith(pattern.slice(0, -1));
		return fileType === pattern;
	});
};

const revoke = (file: AttachmentFile) => {
	if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
};

/** Composer state. Created by `PromptInput` (local) or `PromptInputProvider` (lifted). */
export class PromptInputController {
	textInput = $state("");
	files = $state<AttachmentFile[]>([]);
	referencedSources = $state<ReferencedSource[]>([]);
	isLoading = $state(false);
	fileInput: HTMLInputElement | null = null;
	options: PromptInputOptions = {};

	constructor(initialInput = "") {
		this.textInput = initialInput;
	}

	setTextInput = (value: string) => {
		this.textInput = value;
	};

	clearInput = () => {
		this.textInput = "";
	};

	addFiles = (incoming: File[] | FileList) => {
		const list = Array.from(incoming);
		const { accept, maxFileSize, maxFiles, onError } = this.options;
		const accepted = list.filter((f) => matchesAccept(f, accept));
		if (list.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types.",
			});
			return;
		}
		const sized = accepted.filter((f) =>
			maxFileSize ? f.size <= maxFileSize : true,
		);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size.",
			});
			return;
		}
		const capacity =
			typeof maxFiles === "number"
				? Math.max(0, maxFiles - this.files.length)
				: undefined;
		const capped =
			typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) {
			onError?.({
				code: "max_files",
				message: "Too many files. Some were not added.",
			});
		}
		this.files = [
			...this.files,
			...capped.map(
				(file): AttachmentFile => ({
					filename: file.name,
					id: nanoid(),
					mediaType: file.type,
					size: file.size,
					type: "file",
					url: URL.createObjectURL(file),
				}),
			),
		];
	};

	removeFile = (id: string) => {
		const found = this.files.find((f) => f.id === id);
		if (found) revoke(found);
		this.files = this.files.filter((f) => f.id !== id);
	};

	clearFiles = () => {
		for (const f of this.files) revoke(f);
		this.files = [];
	};

	addSource = (incoming: SourceDocumentUIPart | SourceDocumentUIPart[]) => {
		const array = Array.isArray(incoming) ? incoming : [incoming];
		this.referencedSources = [
			...this.referencedSources,
			...array.map((s) => ({ ...s, id: nanoid() })),
		];
	};

	removeSource = (id: string) => {
		this.referencedSources = this.referencedSources.filter((s) => s.id !== id);
	};

	clearSources = () => {
		this.referencedSources = [];
	};

	openFileDialog = () => {
		this.fileInput?.click();
	};

	/** Release blob URLs (called when the owning component is destroyed). */
	destroy = () => {
		for (const f of this.files) revoke(f);
	};

	submit = async () => {
		const { onSubmit, onError } = this.options;
		if (!onSubmit) return;

		const submittedText = this.textInput;
		const submitted = [...this.files];
		const submittedIds = new Set(submitted.map((f) => f.id));
		this.clearInput();

		try {
			this.isLoading = true;
			// Blob URLs do not survive the request: convert to data URLs.
			const converted = await Promise.all(
				submitted.map(async ({ id: _id, size: _size, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return { ...item, url: dataUrl ?? item.url };
					}
					return item;
				}),
			);
			await onSubmit({ files: converted, text: submittedText });
			// Clear only what was submitted (the user may have added more meanwhile).
			for (const f of this.files) if (submittedIds.has(f.id)) revoke(f);
			this.files = this.files.filter((f) => !submittedIds.has(f.id));
			this.clearSources();
		} catch (e) {
			// Keep everything so the user can retry.
			if (this.textInput === "") this.setTextInput(submittedText);
			onError?.({
				code: "submit_error",
				message: e instanceof Error ? e.message : String(e),
			});
		} finally {
			this.isLoading = false;
		}
	};
}

const KEY = Symbol("ai-prompt-input");

export function setPromptInput(controller: PromptInputController) {
	return setContext(KEY, controller);
}

/** The lifted or local controller, or undefined outside a composer. */
export function getPromptInput(): PromptInputController | undefined {
	return getContext<PromptInputController | undefined>(KEY);
}

/** Full composer state (text, files, sources, submit). Must be inside `PromptInput` or `PromptInputProvider`. */
export function usePromptInput(): PromptInputController {
	const controller = getPromptInput();
	if (!controller) {
		throw new Error(
			"usePromptInput must be used within a PromptInput or PromptInputProvider",
		);
	}
	return controller;
}

/** Attachments slice of the composer state (same shape as the React hook, live getters). */
export function usePromptInputAttachments() {
	const c = usePromptInput();
	return {
		add: c.addFiles,
		clear: c.clearFiles,
		get files() {
			return c.files;
		},
		openFileDialog: c.openFileDialog,
		remove: c.removeFile,
	};
}

/** Referenced sources slice of the composer state. */
export function usePromptInputReferencedSources() {
	const c = usePromptInput();
	return {
		add: c.addSource,
		clear: c.clearSources,
		remove: c.removeSource,
		get sources() {
			return c.referencedSources;
		},
	};
}
