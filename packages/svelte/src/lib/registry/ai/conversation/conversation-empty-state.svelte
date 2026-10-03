<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		title = "No messages yet",
		description = "Start a conversation to see messages here",
		icon,
		variant = "default",
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
		title?: string;
		description?: string;
		icon?: Snippet;
		/**
		 * `default`: icon tile, title and description centered.
		 * `home` ✦: greeting heading and subtitle on the empty chat; put the composer and suggestions in `children`.
		 */
		variant?: "default" | "home";
		children?: Snippet;
	} = $props();
</script>

<div
	data-slot="ai-conversation-empty"
	data-variant={variant}
	class={cn(
		"flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
		variant === "home" && "gap-6",
		className
	)}
	{...restProps}
>
	{#if variant === "home"}
		<div class="flex flex-col items-center gap-2">
			{#if icon}
				<div class="text-muted-foreground">{@render icon()}</div>
			{/if}
			<h2 class="text-[28px] leading-tight font-normal tracking-[-0.6px] text-foreground-2">
				{title}
			</h2>
			{#if description}
				<p class="text-[15px] text-muted-foreground">{description}</p>
			{/if}
		</div>
		{@render children?.()}
	{:else if children}
		{@render children()}
	{:else}
		{#if icon}
			<div
				data-slot="ai-conversation-empty-icon"
				class="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5"
			>
				{@render icon()}
			</div>
		{/if}
		<div class="space-y-1">
			<h3 class="text-sm font-semibold">{title}</h3>
			{#if description}
				<p class="text-[13px] text-muted-foreground">{description}</p>
			{/if}
		</div>
	{/if}
</div>
