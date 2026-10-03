<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { setWebPreviewContext } from "./use-web-preview.svelte.js";

	let {
		ref = $bindable(null),
		url = $bindable(""),
		consoleOpen = $bindable(false),
		onUrlChange,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** Current URL (`bind:url`); the initial value is the default URL. */
		url?: string;
		/** ✦ Console state (`bind:consoleOpen`); start `true` to open it. */
		consoleOpen?: boolean;
		onUrlChange?: (url: string) => void;
	} = $props();

	setWebPreviewContext({
		get url() {
			return url;
		},
		set url(value: string) {
			url = value;
			onUrlChange?.(value);
		},
		get consoleOpen() {
			return consoleOpen;
		},
		set consoleOpen(value: boolean) {
			consoleOpen = value;
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="ai-web-preview"
	class={cn("flex size-full flex-col overflow-hidden rounded-xl border border-border bg-card", className)}
	{...restProps}
>
	{@render children?.()}
</div>
