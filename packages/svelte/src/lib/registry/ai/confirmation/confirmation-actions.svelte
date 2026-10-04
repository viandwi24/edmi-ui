<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useConfirmation } from "./use-confirmation.svelte.js";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const confirmation = useConfirmation();
</script>

{#if confirmation.state === "approval-requested"}
	<div
		data-slot="ai-confirmation-actions"
		class={cn("col-start-2 mt-2.5 flex items-center gap-2", className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
