<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<p class={cn("m-0", className)}>{@render children?.()}</p>
