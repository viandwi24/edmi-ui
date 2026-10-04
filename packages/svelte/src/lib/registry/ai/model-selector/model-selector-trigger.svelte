<script lang="ts">
	import { DialogTrigger } from "$lib/registry/ui/dialog/index.js";
	import type { ComponentProps } from "svelte";

	// Pass the visible trigger with the `child` snippet, e.g. `{#snippet child({ props })}<Button {...props} />{/snippet}`.
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof DialogTrigger> = $props();
</script>

<DialogTrigger bind:ref data-slot="ai-model-selector-trigger" {...restProps} />
