<script lang="ts">
	import { CommandGroup } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ...restProps }: ComponentProps<typeof CommandGroup> = $props();
</script>

<CommandGroup {...restProps} />
