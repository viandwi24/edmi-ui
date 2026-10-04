<script lang="ts">
	import type { Snippet } from "svelte";
	import { PromptInputController, setPromptInput } from "./use-prompt-input.svelte.js";

	// Optional global provider that lifts PromptInput state outside of PromptInput.
	// If you don't use it, PromptInput stays fully self-managed.
	let { initialInput = "", children }: { initialInput?: string; children?: Snippet } = $props();

	// svelte-ignore state_referenced_locally
	setPromptInput(new PromptInputController(initialInput));
</script>

{@render children?.()}
