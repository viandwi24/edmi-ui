<script lang="ts">
	import type { ComponentProps } from "svelte";
	import OpenInItemLink from "./open-in-item-link.svelte";

	let { ...restProps }: Omit<ComponentProps<typeof OpenInItemLink>, "provider"> = $props();
</script>

<OpenInItemLink provider="claude" {...restProps} />
