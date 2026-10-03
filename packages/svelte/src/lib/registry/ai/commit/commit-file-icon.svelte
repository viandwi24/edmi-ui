<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { SVGAttributes } from "svelte/elements";

	let { class: className, ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<IconPlaceholder
	lucide="FileIcon"
	tabler="IconFileWord"
	hugeicons="File01Icon"
	phosphor="FileIcon"
	remixicon="RiFileLine"
	class={cn("size-3.5 shrink-0 text-muted-foreground", className)}
	{...(restProps as object)}
/>
