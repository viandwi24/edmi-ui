<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<pre class={cn("mt-2 overflow-auto font-mono text-xs", className)}>{@render children?.()}</pre>
