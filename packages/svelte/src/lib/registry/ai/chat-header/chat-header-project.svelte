<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		status = "connected",
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
		/** `connected` shows the green dot. */
		status?: "connected" | "idle";
		/** Replaces the default project icon. */
		children?: Snippet;
	} = $props();
</script>

<!-- Project icon with a status dot (dot = connected). -->
<span
	data-slot="ai-chat-header-project"
	data-status={status}
	class={cn("relative inline-flex text-muted-foreground", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="ServerIcon"
			tabler="IconServer"
			hugeicons="ServerStackIcon"
			phosphor="HardDrivesIcon"
			remixicon="RiHardDriveLine"
			class="size-4"
		/>
	{/if}
	{#if status === "connected"}
		<span class="absolute -top-px -right-0.5 size-1.5 rounded-full bg-success"></span>
	{/if}
</span>
