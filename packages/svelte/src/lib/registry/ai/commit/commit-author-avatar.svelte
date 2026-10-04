<script lang="ts">
	import { Avatar, AvatarFallback } from "$lib/registry/ui/avatar/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		initials,
		class: className,
		...restProps
	}: ComponentProps<typeof Avatar> & { initials: string } = $props();
</script>

<Avatar class={cn("size-[30px]", className)} {...restProps}>
	<AvatarFallback class="text-[11px]">{initials}</AvatarFallback>
</Avatar>
