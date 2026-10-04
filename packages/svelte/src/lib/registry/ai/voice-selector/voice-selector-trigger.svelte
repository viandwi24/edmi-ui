<script lang="ts">
	import { DialogTrigger } from "$lib/registry/ui/dialog/index.js";
	import type { ComponentProps } from "svelte";

	// Pass the visible trigger with the `child` snippet, e.g. `{#snippet child({ props })}<Button variant="outline" {...props}>…`.
	let { ...restProps }: ComponentProps<typeof DialogTrigger> = $props();
</script>

<DialogTrigger data-slot="ai-voice-selector-trigger" {...restProps} />
