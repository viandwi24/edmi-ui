<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandInput } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof CommandInput> = $props();
</script>

<CommandInput bind:ref {...restProps}>
	{@render children?.()}
</CommandInput>
