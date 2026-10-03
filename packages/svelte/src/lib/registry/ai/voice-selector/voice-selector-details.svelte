<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// ✦ Column that grows between the preview button and the check.
	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-voice-selector-details" class={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...restProps}>
	{@render children?.()}
</div>
