<script lang="ts">
	import { SelectContent } from "$lib/registry/ui/select/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: ComponentProps<typeof SelectContent> = $props();
</script>

<SelectContent bind:ref {...restProps}>
	{@render children?.()}
</SelectContent>
