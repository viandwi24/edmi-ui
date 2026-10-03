<script lang="ts">
	import { cn } from "$lib/utils.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		title,
		description,
		icon,
		action,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
		title: string;
		description?: string;
		/** Leading icon (an `IconPlaceholder`). */
		icon?: Snippet;
		/** Trailing slot, e.g. a "Join" button. */
		action?: Snippet;
	} = $props();
</script>

<!-- Attached index: an outline Item (media icon, title, mono description, action). -->
<Item.Root data-slot="feed-post-index" variant="outline" size="sm" class={cn("mt-3", className)} {...restProps}>
	{#if icon}
		<Item.Media variant="icon">{@render icon()}</Item.Media>
	{/if}
	<Item.Content>
		<Item.Title>{title}</Item.Title>
		{#if description}
			<Item.Description class="font-mono text-[11.5px]">{description}</Item.Description>
		{/if}
	</Item.Content>
	{#if action}
		<Item.Actions>{@render action()}</Item.Actions>
	{/if}
</Item.Root>
