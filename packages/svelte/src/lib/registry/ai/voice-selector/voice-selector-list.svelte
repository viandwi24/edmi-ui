<script lang="ts">
	import { CommandList } from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let { ...restProps }: ComponentProps<typeof CommandList> = $props();
</script>

<CommandList {...restProps} />
