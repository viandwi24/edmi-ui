<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof InputGroup.Text> = $props();
</script>

<InputGroup.Text bind:ref class={cn("pl-2 font-mono text-xs font-normal", className)} {...restProps}>
	{@render children?.()}
</InputGroup.Text>
