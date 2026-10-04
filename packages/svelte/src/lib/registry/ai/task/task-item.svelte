<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		status,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** ✦ Leading status icon: pending, in-progress (spinner), completed (struck through), error. */
		status?: "pending" | "in-progress" | "completed" | "error";
	} = $props();
</script>

{#if status}
	<div
		data-slot="ai-task-item"
		data-status={status}
		class={cn(
			"flex items-start gap-2 text-[13.5px] [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
			(status === "completed" || status === "pending") && "text-muted-foreground",
			status === "error" && "text-destructive-text",
			className
		)}
		{...restProps}
	>
		{#if status === "pending"}
			<IconPlaceholder
				lucide="CircleIcon"
				tabler="IconCircle"
				hugeicons="CircleIcon"
				phosphor="CircleIcon"
				remixicon="RiCircleLine"
				class="text-muted-foreground-2"
			/>
		{:else if status === "in-progress"}
			<IconPlaceholder
				lucide="Loader2Icon"
				tabler="IconLoader"
				hugeicons="Loading03Icon"
				phosphor="SpinnerIcon"
				remixicon="RiLoaderLine"
				class="animate-spin text-info-text"
			/>
		{:else if status === "completed"}
			<IconPlaceholder
				lucide="CircleCheckIcon"
				tabler="IconCircleCheck"
				hugeicons="CheckmarkCircle02Icon"
				phosphor="CheckCircleIcon"
				remixicon="RiCheckboxCircleLine"
				class="text-success-text"
			/>
		{:else}
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconAlertCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
				class="text-destructive-text"
			/>
		{/if}
		<!-- Inline flow: the line-through reaches the text but not the inline-flex file chips. -->
		<span class={cn("min-w-0", status === "completed" && "line-through")}>
			{@render children?.()}
		</span>
	</div>
{:else}
	<div data-slot="ai-task-item" class={cn("text-[13.5px] text-muted-foreground", className)} {...restProps}>
		{@render children?.()}
	</div>
{/if}
