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
	align="block-start"
	class={cn("flex-wrap gap-1.5 px-3 pt-2.5 pb-0 has-[>:empty]:hidden", className)}
	{...restProps}
>
	{@render children?.()}
</InputGroupAddon>
