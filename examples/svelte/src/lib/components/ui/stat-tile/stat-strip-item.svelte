<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children">> & {
		value: string | number;
		label: string;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="stat-strip-item"
	class={cn("min-w-[140px] flex-1 border-border px-[22px] py-4 not-first:border-l", className)}
	{...restProps}
>
	<div class="font-mono text-2xl">{value}</div>
	<div class="mt-1 text-xs text-muted-foreground">{label}</div>
</div>
