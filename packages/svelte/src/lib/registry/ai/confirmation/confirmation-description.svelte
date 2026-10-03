<!-- ✦ Edmi addition: muted second line under the request title (only while the request is open). -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useConfirmation } from "./use-confirmation.svelte.js";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const confirmation = useConfirmation();
</script>

{#if confirmation.state === "approval-requested"}
	<div
		data-slot="ai-confirmation-description"
		class={cn("col-start-2 text-[13px] text-foreground-2", className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
