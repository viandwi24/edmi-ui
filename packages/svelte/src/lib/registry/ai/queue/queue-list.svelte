<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof ScrollArea> = $props();
</script>

<ScrollArea data-slot="ai-queue-list" class={cn("mt-0.5", className)} {...restProps}>
	<div class="max-h-48">
		<ul>
			{@render children?.()}
		</ul>
	</div>
</ScrollArea>
