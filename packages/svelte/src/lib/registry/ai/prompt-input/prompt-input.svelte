<script lang="ts">
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import { InputGroup } from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";
	import type { PromptInputError, PromptInputMessage } from "./types.js";
	import {
		getPromptInput,
		PromptInputController,
		setPromptInput,
	} from "./use-prompt-input.svelte.js";

	let {
		class: className,
		accept,
		multiple,
		globalDrop = false,
		maxFiles,
		maxFileSize,
		initialInput = "",
		elevation = "auto",
		onSubmit,
		onError,
		children,
		...restProps
	}: Omit<HTMLFormAttributes, "onsubmit" | "onerror" | "children"> & {
		/** e.g. `image/*`, `.csv`; leave undefined for any. */
		accept?: string;
		multiple?: boolean;
		/** When true, accepts drops anywhere on the document. Default false (opt-in). */
		globalDrop?: boolean;
		maxFiles?: number;
		/** Bytes. */
		maxFileSize?: number;
		initialInput?: string;
		/** ✦ depth of the composer plate (overlay role: floating in layered mode). The submit button follows the Button rules. */
		elevation?: Elevation;
		/** May be async: the composer clears on success and keeps the text if it throws. */
		onSubmit: (message: PromptInputMessage) => void | Promise<void>;
		onError?: (err: PromptInputError) => void;
		/** Receives the composer state (files, remove, ...) so children can render attachments. */
		children?: Snippet<
			[
				{
					files: PromptInputController["files"];
					remove: PromptInputController["removeFile"];
					add: PromptInputController["addFiles"];
					clear: PromptInputController["clearFiles"];
					openFileDialog: PromptInputController["openFileDialog"];
					textInput: string;
				},
			]
		>;
	} = $props();

	const level = useElevation(() => elevation, "overlay");

	// Inside a PromptInputProvider the state is lifted; otherwise it is local to this composer.
	// svelte-ignore state_referenced_locally
	const controller = getPromptInput() ?? setPromptInput(new PromptInputController(initialInput));

	$effect(() => {
		controller.options.accept = accept;
		controller.options.maxFiles = maxFiles;
		controller.options.maxFileSize = maxFileSize;
		controller.options.onSubmit = onSubmit;
		controller.options.onError = onError;
	});

	$effect(() => () => controller.destroy());

	let fileInput = $state<HTMLInputElement | null>(null);
	$effect(() => {
		controller.fileInput = fileInput;
	});

	function handleDragOver(e: DragEvent) {
		if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
	}

	function handleDrop(e: DragEvent) {
		if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			controller.addFiles(e.dataTransfer.files);
		}
	}

	$effect(() => {
		if (!globalDrop) return;
		document.addEventListener("dragover", handleDragOver);
		document.addEventListener("drop", handleDrop);
		return () => {
			document.removeEventListener("dragover", handleDragOver);
			document.removeEventListener("drop", handleDrop);
		};
	});

	function onFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		if (input.files) controller.addFiles(input.files);
		// Reset so a previously removed file can be picked again.
		input.value = "";
	}
</script>

<input
	bind:this={fileInput}
	type="file"
	class="hidden"
	aria-label="Upload files"
	title="Upload files"
	{accept}
	{multiple}
	onchange={onFileChange}
/>
<form
	data-slot="ai-prompt-input"
	class={cn("w-full", className)}
	onsubmit={(event) => {
		event.preventDefault();
		controller.submit();
	}}
	ondragover={globalDrop ? undefined : handleDragOver}
	ondrop={globalDrop ? undefined : handleDrop}
	{...restProps}
>
	<InputGroup
		elevation={level.current}
		class="h-auto flex-col overflow-hidden rounded-[calc(var(--radius)*1.6)]"
	>
		{@render children?.({
			files: controller.files,
			remove: controller.removeFile,
			add: controller.addFiles,
			clear: controller.clearFiles,
			openFileDialog: controller.openFileDialog,
			textInput: controller.textInput,
		})}
	</InputGroup>
</form>
