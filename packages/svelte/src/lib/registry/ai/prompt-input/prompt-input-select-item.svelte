<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { SelectItem } from "$lib/registry/ui/select/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof SelectItem> = $props();
</script>

<SelectItem bind:ref {...restProps} />
