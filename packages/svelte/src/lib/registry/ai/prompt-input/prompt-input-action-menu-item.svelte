<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { DropdownMenuItem } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof DropdownMenuItem> = $props();
</script>

<DropdownMenuItem bind:ref {...restProps} />
