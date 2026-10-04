import type { SourceDocumentUIPart } from "ai";
import { nanoid } from "nanoid";
import { inject, onBeforeUnmount, provide, reactive, ref } from "vue";
import type {
	AttachmentFile,
	PromptInputContext,
	PromptInputOptions,
	ReferencedSource,
} from "./types";
import { PROMPT_INPUT_KEY } from "./types";

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

/** Creates the composer state. Used by `PromptInput` (local) and `PromptInputProvider` (lifted). */
export function createPromptInputState(
	initialInput = "",
	initialOptions: PromptInputOptions = {},
): PromptInputContext {
	const textInput = ref(initialInput);
	const files = ref<AttachmentFile[]>([]);
	const referencedSources = ref<ReferencedSource[]>([]);
	const fileInputRef = ref<HTMLInputElement | null>(null);
	const isLoading = ref(false);
	const raised = ref(false);
	const options = reactive<PromptInputOptions>({ ...initialOptions });

	const revoke = (file: AttachmentFile) => {
		if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
	};

	onBeforeUnmount(() => {
		for (const f of files.value) revoke(f);
	});

	const addFiles = (incoming: File[] | FileList) => {
		const list = Array.from(incoming);
		const accepted = list.filter((f) => matchesAccept(f, options.accept));
		if (list.length && accepted.length === 0) {
			options.onError?.({
				code: "accept",
				message: "No files match the accepted types.",
			});
			return;
		}
		const { maxFileSize, maxFiles } = options;
		const sized = accepted.filter((f) =>
			maxFileSize ? f.size <= maxFileSize : true,
		);
		if (accepted.length > 0 && sized.length === 0) {
			options.onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size.",
			});
			return;
		}
		const capacity =
			typeof maxFiles === "number"
				? Math.max(0, maxFiles - files.value.length)
				: undefined;
		const capped =
			typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) {
			options.onError?.({
				code: "max_files",
				message: "Too many files. Some were not added.",
			});
		}
		files.value = [
			...files.value,
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

	const removeFile = (id: string) => {
		const found = files.value.find((f) => f.id === id);
		if (found) revoke(found);
		files.value = files.value.filter((f) => f.id !== id);
	};

	const clearFiles = () => {
		for (const f of files.value) revoke(f);
		files.value = [];
	};

	const addSource = (
		incoming: SourceDocumentUIPart | SourceDocumentUIPart[],
	) => {
		const array = Array.isArray(incoming) ? incoming : [incoming];
		referencedSources.value = [
			...referencedSources.value,
			...array.map((s) => ({ ...s, id: nanoid() })),
		];
	};

	const removeSource = (id: string) => {
		referencedSources.value = referencedSources.value.filter(
			(s) => s.id !== id,
		);
	};

	const clearSources = () => {
		referencedSources.value = [];
	};

	const setTextInput = (val: string) => {
		textInput.value = val;
	};
	const clearInput = () => {
		textInput.value = "";
	};
	const openFileDialog = () => {
		fileInputRef.value?.click();
	};

	const submitForm = async () => {
		if (!options.onSubmit) return;

		const submittedText = textInput.value;
		const submittedFiles = [...files.value];
		const submittedIds = new Set(submittedFiles.map((f) => f.id));
		clearInput();

		try {
			isLoading.value = true;
			// Blob URLs do not survive the request: convert to data URLs.
			const converted = await Promise.all(
				submittedFiles.map(async ({ id: _id, size: _size, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return { ...item, url: dataUrl ?? item.url };
					}
					return item;
				}),
			);
			await options.onSubmit({ files: converted, text: submittedText });
			// Clear only what was submitted (the user may have added more meanwhile).
			for (const f of files.value) if (submittedIds.has(f.id)) revoke(f);
			files.value = files.value.filter((f) => !submittedIds.has(f.id));
			clearSources();
		} catch (e) {
			// Keep everything so the user can retry.
			if (textInput.value === "") setTextInput(submittedText);
			options.onError?.({
				code: "submit_error",
				message: e instanceof Error ? e.message : String(e),
			});
		} finally {
			isLoading.value = false;
		}
	};

	return {
		addFiles,
		addSource,
		clearFiles,
		clearInput,
		clearSources,
		fileInputRef,
		files,
		isLoading,
		openFileDialog,
		options,
		raised,
		referencedSources,
		removeFile,
		removeSource,
		setTextInput,
		submitForm,
		textInput,
	};
}

/** Provides the state to descendants (called by `PromptInput` / `PromptInputProvider`). */
export function providePromptInput(state: PromptInputContext) {
	provide(PROMPT_INPUT_KEY, state);
	return state;
}

/** Full composer state (text, files, sources, submit). Must be inside `PromptInput` or `PromptInputProvider`. */
export function usePromptInput(): PromptInputContext {
	const context = inject(PROMPT_INPUT_KEY, null);
	if (!context) {
		throw new Error(
			"usePromptInput must be used within a PromptInput or PromptInputProvider",
		);
	}
	return context;
}

/** Attachments slice of the composer state (same shape as the React hook). */
export function usePromptInputAttachments() {
	const {
		files,
		addFiles,
		removeFile,
		clearFiles,
		openFileDialog,
		fileInputRef,
	} = usePromptInput();
	return {
		add: addFiles,
		clear: clearFiles,
		fileInputRef,
		files,
		openFileDialog,
		remove: removeFile,
	};
}

/** Referenced sources slice of the composer state. */
export function usePromptInputReferencedSources() {
	const { referencedSources, addSource, removeSource, clearSources } =
		usePromptInput();
	return {
		add: addSource,
		clear: clearSources,
		remove: removeSource,
		sources: referencedSources,
	};
}

/** Whether the surrounding composer is `raised` (read by the submit button). */
export function usePromptInputRaised() {
	const context = inject(PROMPT_INPUT_KEY, null);
	return context ? context.raised : ref(false);
}
