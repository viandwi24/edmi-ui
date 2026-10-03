<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge, type BadgeVariant } from "$lib/registry/ui/badge/index.js";
	import type { ToolUIPart } from "ai";

	type SandboxState = ToolUIPart["state"];

	let { state: status }: { state: SandboxState } = $props();

	const labels: Record<SandboxState, string> = {
		"approval-requested": "Awaiting Approval",
		"approval-responded": "Responded",
		"input-available": "Running",
		"input-streaming": "Pending",
		"output-available": "Completed",
		"output-denied": "Denied",
		"output-error": "Error",
	};

	const variants: Record<SandboxState, BadgeVariant> = {
		"approval-requested": "warning",
		"approval-responded": "info",
		"input-available": "info",
		"input-streaming": "secondary",
		"output-available": "success",
		"output-denied": "warning",
		"output-error": "destructive",
	};
</script>

<Badge shape="pill" variant={variants[status]}>
	{#if status === "input-streaming"}
		<svg
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.7"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="9" />
		</svg>
	{:else if status === "output-denied" || status === "output-error"}
		<svg
			aria-hidden="true"
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
	{:else if status === "input-available" || status === "approval-requested"}
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
		/>
	{/if}
	{labels[status]}
</Badge>
