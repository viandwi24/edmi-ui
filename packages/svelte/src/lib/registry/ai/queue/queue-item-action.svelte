<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "variant" | "size"> = $props();
</script>

<Button
	data-slot="ai-queue-item-action"
	type="button"
	variant="ghost"
	size="icon-xs"
	class={cn(
		"text-muted-foreground opacity-0 transition-opacity group-focus-within/queue-item:opacity-100 group-hover/queue-item:opacity-100 hover:text-foreground focus-visible:opacity-100",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Button>
