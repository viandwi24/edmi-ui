<script lang="ts">
	import { ButtonGroupText } from "$lib/registry/ui/button-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { useMessageBranch } from "./use-message.svelte.js";

	let { class: className, ...restProps }: ComponentProps<typeof ButtonGroupText> = $props();

	const branches = useMessageBranch();
</script>

<ButtonGroupText
	class={cn(
		"border-none bg-transparent px-1 font-mono text-xs text-muted-foreground tabular-nums shadow-none",
		className
	)}
	{...restProps}
>
	{branches.currentBranch + 1} / {branches.totalBranches}
</ButtonGroupText>
