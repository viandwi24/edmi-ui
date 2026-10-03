<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { SVGAttributes } from "svelte/elements";

	let { ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<IconPlaceholder
	lucide="MessageCircleIcon"
	tabler="IconMessageCircle"
	hugeicons="Message01Icon"
	phosphor="ChatCircleIcon"
	remixicon="RiChatSmile3Line"
	{...(restProps as object)}
/>
