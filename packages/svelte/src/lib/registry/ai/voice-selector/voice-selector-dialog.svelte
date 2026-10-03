<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandDialog } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { open = $bindable(false), ...restProps }: ComponentProps<typeof CommandDialog> = $props();
</script>

<CommandDialog bind:open {...restProps} />
