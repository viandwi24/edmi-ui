<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof InputGroup.Addon> = $props();
</script>

<InputGroup.Addon bind:ref {...restProps}>
	{@render children?.()}
</InputGroup.Addon>
