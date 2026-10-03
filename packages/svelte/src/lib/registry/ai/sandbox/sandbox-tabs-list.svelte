<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Tabs.List> = $props();
</script>

<Tabs.List bind:ref {...restProps} />
