<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DropdownMenuItem } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";
	import { captureScreenshot } from "./screenshot.js";
	import { usePromptInputAttachments } from "./use-prompt-input.svelte.js";

	let {
		label = "Take screenshot",
		...restProps
	}: Omit<ComponentProps<typeof DropdownMenuItem>, "children"> & { label?: string } = $props();

	const attachments = usePromptInputAttachments();

	async function handleSelect() {
		try {
			const screenshot = await captureScreenshot();
			if (screenshot) attachments.add([screenshot]);
		} catch (error) {
			// The user dismissed the capture picker: not an error.
			if (
				error instanceof DOMException &&
				(error.name === "NotAllowedError" || error.name === "AbortError")
			) {
				return;
			}
			throw error;
		}
	}
</script>

<DropdownMenuItem {...restProps} onSelect={handleSelect}>
	<IconPlaceholder
		lucide="MonitorIcon"
		tabler="IconDeviceDesktop"
		hugeicons="ComputerIcon"
		phosphor="MonitorIcon"
		remixicon="RiComputerLine"
		class="size-4"
	/>
	{label}
</DropdownMenuItem>
