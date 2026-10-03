<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandItem } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";
	import { useMicSelector } from "./use-mic-selector.svelte.js";

	// `value` is the device id; the selected item shows the check.
	let {
		value,
		onSelect,
		children,
		...restProps
	}: ComponentProps<typeof CommandItem> = $props();

	const ctx = useMicSelector("MicSelectorItem");
</script>

<CommandItem
	{value}
	data-checked={value !== undefined && value === ctx.value}
	onSelect={() => {
		ctx.setValue(value);
		ctx.setOpen(false);
		onSelect?.();
	}}
	{...restProps}
>
	{@render children?.()}
</CommandItem>
