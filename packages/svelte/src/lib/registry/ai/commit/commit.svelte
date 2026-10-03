<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// A git commit: author, message, time, short hash and the changed files.
	let {
		open = $bindable(false),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> = $props();
</script>

<Collapsible
	bind:open
	data-slot="ai-commit"
	class={cn("overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</Collapsible>
