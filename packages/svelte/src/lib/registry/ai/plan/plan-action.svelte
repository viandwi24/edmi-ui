<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { CardAction } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof CardAction> = $props();
</script>

<CardAction data-slot="ai-plan-action" {...restProps}>
	{@render children?.()}
</CardAction>
