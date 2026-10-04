<script lang="ts">
	import { InputGroupAddon } from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof InputGroupAddon>, "align"> = $props();
</script>

<InputGroupAddon
	align="block-end"
	class={cn("justify-between gap-1 px-2 pt-1.5 pb-2", className)}
	{...restProps}
>
	{@render children?.()}
</InputGroupAddon>
