<script lang="ts">
	import { CommandInput } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { value = $bindable(""), ...restProps }: ComponentProps<typeof CommandInput> = $props();
</script>

<CommandInput bind:value placeholder="Search voices..." {...restProps} />
