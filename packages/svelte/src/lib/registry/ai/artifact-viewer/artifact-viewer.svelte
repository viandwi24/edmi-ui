<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof Card> = $props();
</script>

<Card data-slot="ai-artifact-viewer" class={cn("gap-0 py-0 text-card-foreground", className)} {...restProps}>
	{@render children?.()}
</Card>
