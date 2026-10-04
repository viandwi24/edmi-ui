<script lang="ts">
	import { CommandSeparator } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ...restProps }: ComponentProps<typeof CommandSeparator> = $props();
</script>

<CommandSeparator {...restProps} />
