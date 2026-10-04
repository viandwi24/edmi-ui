<script lang="ts">
	import { CommandItem } from "$lib/registry/ui/command/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { useVoiceSelector } from "./use-voice-selector.svelte.js";

	// A two-line row: lay out `VoiceSelectorPreview`, then a `VoiceSelectorDetails` block. The item whose `value`
	// equals the selector value shows the check; selecting sets the value and closes unless `onSelect` is used.
	let {
		value,
		onSelect,
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CommandItem> = $props();

	const ctx = useVoiceSelector();
</script>

<CommandItem
	{value}
	data-checked={value !== undefined && value === ctx.value}
	class={cn("h-auto items-start p-2 whitespace-normal", className)}
	onSelect={() => {
		if (onSelect) {
			onSelect();
			return;
		}
		ctx.setValue(value);
		ctx.setOpen(false);
	}}
	{...restProps}
>
	{@render children?.()}
</CommandItem>
