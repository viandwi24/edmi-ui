<script lang="ts">
	import { SelectValue } from "$lib/registry/ui/select/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof SelectValue> = $props();
</script>

<SelectValue bind:ref {...restProps} />
