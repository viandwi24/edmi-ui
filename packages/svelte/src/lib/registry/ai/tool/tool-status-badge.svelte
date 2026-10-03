<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge, type BadgeVariant } from "$lib/registry/ui/badge/index.js";
	import type { ToolState } from "./types.js";

	let { state }: { state: ToolState } = $props();

	const labels: Record<ToolState, string> = {
		"approval-requested": "Awaiting approval",
		"approval-responded": "Responded",
		"input-available": "Running",
		"input-streaming": "Pending",
		"output-available": "Completed",
		"output-denied": "Denied",
		"output-error": "Error",
	};

	const variants: Record<ToolState, BadgeVariant> = {
		"approval-requested": "warning",
		"approval-responded": "secondary",
		"input-available": "info",
		"input-streaming": "secondary",
		"output-available": "success",
		"output-denied": "outline",
		"output-error": "destructive",
	};
</script>

<Badge data-slot="ai-tool-status" shape="pill" class="gap-1" variant={variants[state]}>
	{#if state === "approval-requested"}
		<IconPlaceholder
			lucide="ShieldIcon"
			tabler="IconShield"
			hugeicons="ShieldIcon"
			phosphor="ShieldIcon"
			remixicon="RiShieldLine"
		/>
	{:else if state === "approval-responded"}
		<IconPlaceholder
			lucide="CheckIcon"
			tabler="IconCheck"
			hugeicons="Tick02Icon"
			phosphor="CheckIcon"
			remixicon="RiCheckLine"
		/>
	{:else if state === "input-available"}
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
			class="animate-pulse"
		/>
	{:else if state === "input-streaming"}
		<IconPlaceholder
			lucide="CircleIcon"
			tabler="IconCircle"
			hugeicons="CircleIcon"
			phosphor="CircleIcon"
			remixicon="RiCircleLine"
		/>
	{:else if state === "output-available"}
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
		/>
	{:else if state === "output-denied"}
		<IconPlaceholder
			lucide="XIcon"
			tabler="IconX"
			hugeicons="Cancel01Icon"
			phosphor="XIcon"
			remixicon="RiCloseLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="CircleXIcon"
			tabler="IconCircleX"
			hugeicons="CancelCircleIcon"
			phosphor="XCircleIcon"
			remixicon="RiCloseCircleLine"
		/>
	{/if}
	{labels[state]}
</Badge>
