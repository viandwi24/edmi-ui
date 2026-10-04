<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Tabs.Trigger> = $props();
</script>

<Tabs.Trigger bind:ref class={cn("h-[26px] px-3.5 text-[12.5px]", className)} {...restProps} />
