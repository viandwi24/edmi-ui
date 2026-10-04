<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, ...restProps }: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } =
		$props();
</script>

<span {...restProps}>
	{#if children}{@render children()}{:else}·{/if}
</span>
