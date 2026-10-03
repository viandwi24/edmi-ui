<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		name,
		handle,
		time,
		avatarSrc,
		initials,
		actions,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		name: string;
		handle?: string;
		time?: string;
		/** Image URL; falls back to `initials`. */
		avatarSrc?: string;
		initials?: string;
		/** Right slot. Defaults to a ghost "more" icon button. */
		actions?: Snippet;
	} = $props();

	const meta = $derived([handle, time].filter(Boolean).join(" · "));
</script>

<div data-slot="feed-post-header" class={cn("flex items-center gap-2.5", className)} {...restProps}>
	<Avatar class="size-9">
		{#if avatarSrc}<AvatarImage src={avatarSrc} alt={name} />{/if}
		<AvatarFallback class="bg-linear-to-br from-info to-brand text-xs text-white">
			{initials ?? name.slice(0, 2).toUpperCase()}
		</AvatarFallback>
	</Avatar>
	<div class="min-w-0 flex-1 truncate text-sm font-semibold">
		{name}
		{#if meta}<span class="font-normal text-muted-foreground">{meta}</span>{/if}
	</div>
	{#if actions}
		{@render actions()}
	{:else}
		<Button variant="ghost" size="icon-sm" aria-label="More">
			<IconPlaceholder
				lucide="MoreHorizontalIcon"
				tabler="IconDots"
				hugeicons="MoreHorizontalCircle01Icon"
				phosphor="DotsThreeOutlineIcon"
				remixicon="RiMoreLine"
			/>
		</Button>
	{/if}
</div>
