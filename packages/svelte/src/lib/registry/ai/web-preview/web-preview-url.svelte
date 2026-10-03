<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { useWebPreviewContext } from "./use-web-preview.svelte.js";

	let {
		class: className,
		placeholder = "Enter URL...",
		...restProps
	}: Omit<HTMLInputAttributes, "value" | "type"> = $props();

	const preview = useWebPreviewContext();
	let inputValue = $state(preview.url);

	$effect(() => {
		inputValue = preview.url;
	});

	function onkeydown(event: KeyboardEvent) {
		if (event.key === "Enter") preview.url = inputValue;
	}
</script>

<div class="relative mx-1.5 flex-1">
	<IconPlaceholder
		lucide="LockIcon"
		tabler="IconLock"
		hugeicons="SquareLock02Icon"
		phosphor="LockKeyIcon"
		remixicon="RiLockLine"
		class="pointer-events-none absolute top-1/2 left-2.5 size-3 -translate-y-1/2 text-muted-foreground"
	/>
	<Input
		data-slot="ai-web-preview-url"
		class={cn("h-[30px] pl-7 font-mono text-xs", className)}
		{placeholder}
		bind:value={inputValue}
		{onkeydown}
		{...(restProps as Record<string, unknown>)}
	/>
</div>
