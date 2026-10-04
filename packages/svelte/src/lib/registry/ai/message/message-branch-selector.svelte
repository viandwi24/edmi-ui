<script lang="ts">
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { useMessageBranch } from "./use-message.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof ButtonGroup>, "orientation"> = $props();

	const branches = useMessageBranch();
</script>

<!-- Nothing to switch between with a single branch. -->
{#if branches.totalBranches > 1}
	<ButtonGroup
		data-slot="ai-message-branch-selector"
		orientation="horizontal"
		class={cn("items-center gap-0.5 [&>*]:rounded-md", className)}
		{...restProps}
	>
		{@render children?.()}
	</ButtonGroup>
{/if}
