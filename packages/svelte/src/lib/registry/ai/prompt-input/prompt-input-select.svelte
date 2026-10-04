<script lang="ts">
	import { Select } from "$lib/registry/ui/select/index.js";
	import type { ComponentProps } from "svelte";

	// Pass `type="single"` (or `"multiple"`) like the underlying Bits UI Select.
	let {
		open = $bindable(false),
		value = $bindable(),
		...restProps
	}: ComponentProps<typeof Select> = $props();
</script>

<Select bind:open bind:value={value as never} {...restProps} />
