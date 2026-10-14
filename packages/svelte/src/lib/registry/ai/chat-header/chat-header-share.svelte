<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";

	let { ref = $bindable(null), children, ...restProps }: Omit<ButtonProps, "href"> = $props();
</script>

<Button bind:ref size="sm" type="button" variant="secondary" {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		Share
	{/if}
</Button>
