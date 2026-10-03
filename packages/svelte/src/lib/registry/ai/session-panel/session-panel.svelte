<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof Card> = $props();
</script>

<Card
	data-slot="ai-session-panel"
	class={cn("w-full max-w-[380px] gap-0 px-4 py-3.5", className)}
	{...restProps}
>
	{@render children?.()}
</Card>
