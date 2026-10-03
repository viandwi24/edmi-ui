<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DropdownMenuItem } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";
	import { usePromptInputAttachments } from "./use-prompt-input.svelte.js";

	let {
		label = "Add photos or files",
		...restProps
	}: Omit<ComponentProps<typeof DropdownMenuItem>, "children"> & { label?: string } = $props();

	const attachments = usePromptInputAttachments();
</script>

<DropdownMenuItem {...restProps} onSelect={() => attachments.openFileDialog()}>
	<IconPlaceholder
		lucide="ImageIcon"
		tabler="IconPhoto"
		hugeicons="Image01Icon"
		phosphor="ImageIcon"
		remixicon="RiImageLine"
		class="size-4"
	/>
	{label}
</DropdownMenuItem>
