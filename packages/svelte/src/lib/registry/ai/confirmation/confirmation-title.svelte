<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useConfirmation } from "./use-confirmation.svelte.js";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const confirmation = useConfirmation();
</script>

<div
	data-slot="ai-confirmation-title"
	class={cn(
		confirmation.state === "approval-requested"
			? "col-start-2 font-medium text-foreground"
			: "flex items-center gap-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
