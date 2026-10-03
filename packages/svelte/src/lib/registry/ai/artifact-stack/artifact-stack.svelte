<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="ai-artifact-stack"
	class={cn("flex w-full flex-col items-start gap-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
