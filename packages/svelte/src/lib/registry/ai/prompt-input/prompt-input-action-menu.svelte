<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { DropdownMenu } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";

	let { open = $bindable(false), ...restProps }: ComponentProps<typeof DropdownMenu> = $props();
</script>

<DropdownMenu bind:open {...restProps} />
