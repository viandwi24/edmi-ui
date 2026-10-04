<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { MessageBranchController, setMessageBranchContext } from "./use-message.svelte.js";

	let {
		defaultBranch = 0,
		onBranchChange,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		defaultBranch?: number;
		onBranchChange?: (branchIndex: number) => void;
		children?: Snippet;
	} = $props();

	// svelte-ignore state_referenced_locally
	const branches = new MessageBranchController(defaultBranch);
	$effect(() => branches.setOnChange(onBranchChange));
	setMessageBranchContext(branches);
</script>

<div
	data-slot="ai-message-branch"
	class={cn("grid w-full gap-1.5 [&>div]:pb-0", className)}
	{...restProps}
>
	{@render children?.()}
</div>
