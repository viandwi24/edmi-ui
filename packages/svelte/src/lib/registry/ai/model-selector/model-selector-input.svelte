<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CommandInput } from "$lib/registry/ui/command/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...restProps
	}: ComponentProps<typeof CommandInput> = $props();
</script>

<CommandInput bind:ref bind:value class={cn("py-3.5", className)} {...restProps} />
