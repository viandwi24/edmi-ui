<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";

	let { children, ...restProps }: Omit<ButtonProps, "href"> = $props();
</script>

<Button size="sm" type="button" variant="secondary" {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		Share
	{/if}
</Button>
