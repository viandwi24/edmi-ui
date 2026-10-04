<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Tabs.List> = $props();
</script>

<Tabs.List bind:ref {...restProps} />
