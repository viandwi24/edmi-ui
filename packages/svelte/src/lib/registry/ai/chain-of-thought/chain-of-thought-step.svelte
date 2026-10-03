<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		icon,
		label,
		description,
		status = "complete",
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		/** Snippet that renders the icon (an `IconPlaceholder`, an svg). Defaults to a small dot. */
		icon?: Snippet;
		label?: string | Snippet;
		description?: string | Snippet;
		status?: "complete" | "active" | "pending";
		children?: Snippet;
	} = $props();

	// Icon colour and label colour per status (board AI 02): complete = muted icon, soft label; active = brand icon,
	// foreground label; pending = faint.
	const iconStyles = {
		active: "text-brand",
		complete: "text-muted-foreground",
		pending: "text-muted-foreground-2",
	};
	const labelStyles = {
		active: "text-foreground",
		complete: "text-foreground-2",
		pending: "text-muted-foreground-2",
	};
</script>

<div
	data-slot="ai-chain-of-thought-step"
	data-status={status}
	class={cn(
		"group/step relative grid grid-cols-[22px_1fr] gap-2.5 pb-3.5 text-[13.5px] last:pb-0",
		className
	)}
	{...restProps}
>
	<span
		class={cn(
			"relative z-10 inline-flex size-[22px] items-center justify-center rounded-full bg-card [&_svg]:size-3.5",
			iconStyles[status]
		)}
	>
		{#if icon}
			{@render icon()}
		{:else}
			<span class="size-1.5 rounded-full bg-current"></span>
		{/if}
	</span>
	<span class="absolute top-6 -bottom-2 left-[10.5px] w-px bg-border group-last/step:hidden"></span>
	<div class="min-w-0 space-y-2">
		<div class={labelStyles[status]}>
			{#if typeof label === "string"}{label}{:else if label}{@render label()}{/if}
		</div>
		{#if description}
			<div class="-mt-1.5 text-xs text-muted-foreground">
				{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
			</div>
		{/if}
		{@render children?.()}
	</div>
</div>
