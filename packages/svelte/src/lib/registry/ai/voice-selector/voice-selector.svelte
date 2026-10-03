<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Dialog } from "$lib/registry/ui/dialog/index.js";
	import type { ComponentProps } from "svelte";
	import { setVoiceSelectorContext } from "./use-voice-selector.svelte.js";

	// Built on ui/command + ui/dialog (DESIGN §5b). `bind:value` is the selected voice id.
	let {
		value = $bindable(),
		open = $bindable(false),
		children,
		...restProps
	}: ComponentProps<typeof Dialog> & { value?: string } = $props();

	setVoiceSelectorContext({
		get value() {
			return value;
		},
		setValue: (next) => {
			value = next;
		},
		setOpen: (next) => {
			open = next;
		},
	});
</script>

<Dialog bind:open {...restProps}>
	{@render children?.()}
</Dialog>
