<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { statusStyles, useTestContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const test = useTestContext();
</script>

<span class={cn("inline-flex shrink-0", statusStyles[test.status], className)}>
	{#if children}
		{@render children()}
	{:else if test.status === "passed"}
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
			class="size-3.5"
		/>
	{:else if test.status === "failed"}
		<svg
			aria-hidden="true"
			class="size-3.5"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.7"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="9" />
			<path d="m9 9 6 6M15 9l-6 6" />
		</svg>
	{:else if test.status === "running"}
		<svg aria-hidden="true" class="size-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".22" stroke-width="2" />
			<path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
		</svg>
	{:else}
		<svg
			aria-hidden="true"
			class="size-3.5"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.7"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="8" />
		</svg>
	{/if}
</span>
