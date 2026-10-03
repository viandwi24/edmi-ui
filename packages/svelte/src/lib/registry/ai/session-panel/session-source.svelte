<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { SessionSourceFavicon } from "./types.js";

	let {
		icon,
		label,
		favicons,
		more,
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		icon: Snippet;
		label: string;
		favicons?: SessionSourceFavicon[];
		/** Count after the favicons (`+4`). */
		more?: number;
		/** Detail line after the label (memory: `Read · Career, Tech`). */
		children?: Snippet;
	} = $props();
</script>

<!-- One row of "Used in this session": web search, memory, tools. -->
<div
	data-slot="ai-session-source"
	class={cn("flex items-center gap-2.5 py-[7px] text-sm", className)}
	{...restProps}
>
	<span class="text-muted-foreground [&_svg]:size-4">{@render icon()}</span>
	<span class={cn(!children && "flex-1")}>{label}</span>
	{#if children}
		<span class="min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground">
			{@render children()}
		</span>
	{/if}
	{#if favicons && favicons.length > 0}
		<span class="flex items-center">
			{#each favicons as f (f.label)}
				{#if f.src}
					<img
						alt={f.label}
						src={f.src}
						class="-ml-[3px] size-4 rounded-[4px] border border-card object-cover"
					/>
				{:else}
					<span
						class="-ml-[3px] inline-flex size-4 items-center justify-center rounded-[4px] border border-card bg-muted-foreground text-[8px] font-bold text-white"
						style={f.color ? `background: ${f.color}` : undefined}
					>
						{f.label.slice(0, 2).toUpperCase()}
					</span>
				{/if}
			{/each}
		</span>
	{/if}
	{#if more}
		<span class="text-[12.5px] text-muted-foreground">+{more}</span>
	{/if}
</div>
