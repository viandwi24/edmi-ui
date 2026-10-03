<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { InputGroupTextarea } from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { usePromptInput } from "./use-prompt-input.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		placeholder = "What would you like to know?",
		onkeydown,
		onpaste,
		...restProps
	}: Omit<ComponentProps<typeof InputGroupTextarea>, "value"> = $props();

	const controller = usePromptInput();
	let isComposing = $state(false);

	function handleKeyDown(event: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) {
		(onkeydown as ((e: KeyboardEvent) => void) | undefined)?.(event);
		if (event.defaultPrevented) return;

		if (event.key === "Enter") {
			if (isComposing || event.isComposing || event.shiftKey) return;
			event.preventDefault();

			const form = event.currentTarget.form;
			const submitButton = form?.querySelector(
				'button[type="submit"]'
			) as HTMLButtonElement | null;
			if (submitButton?.disabled) return;
			form?.requestSubmit();
		}

		// Remove the last attachment on Backspace when the textarea is empty.
		if (event.key === "Backspace" && controller.textInput === "" && controller.files.length > 0) {
			event.preventDefault();
			const last = controller.files.at(-1);
			if (last) controller.removeFile(last.id);
		}
	}

	function handlePaste(event: ClipboardEvent & { currentTarget: HTMLTextAreaElement }) {
		(onpaste as ((e: ClipboardEvent) => void) | undefined)?.(event);
		const items = event.clipboardData?.items;
		if (!items) return;

		const pasted: File[] = [];
		for (const item of Array.from(items)) {
			if (item.kind === "file") {
				const file = item.getAsFile();
				if (file) pasted.push(file);
			}
		}
		if (pasted.length > 0) {
			event.preventDefault();
			controller.addFiles(pasted);
		}
	}
</script>

<InputGroupTextarea
	bind:ref
	bind:value={controller.textInput}
	name="message"
	{placeholder}
	class={cn("field-sizing-content max-h-48 min-h-14 px-3.5 pt-3 pb-1.5 text-sm leading-normal", className)}
	oncompositionstart={() => (isComposing = true)}
	oncompositionend={() => (isComposing = false)}
	onkeydown={handleKeyDown}
	onpaste={handlePaste}
	{...restProps}
/>
