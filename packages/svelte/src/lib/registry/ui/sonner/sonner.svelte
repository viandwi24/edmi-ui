<script lang="ts">
	import { mode } from "mode-watcher";
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		raised = false,
		...restProps
	}: SonnerProps & {
		/** ✦ opt-in one-step 3D look for every toast (hard lip). */
		raised?: boolean;
	} = $props();

	// Soft fill + tinted 40% border per type (DESIGN 4.12); default stays a solid popover chip.
	// svelte-sonner's own selectors are more specific than utilities, hence the important modifier.
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border); --border-radius: var(--radius-xl); --width: 360px;"
	toastOptions={{
		classes: {
			toast: cn("cn-toast text-[13.5px] font-sans", raised && "border-b-lip! shadow-[0_3px_0_var(--lip)]!"),
			title: "font-medium",
			description: "text-muted-foreground!",
			success: "bg-success-soft! border-success/40!",
			info: "bg-info-soft! border-info/40!",
			warning: "bg-warning-soft! border-warning/40!",
			error: "bg-destructive-soft! border-destructive/40!",
		},
	}}
	{...restProps}
>
	{#snippet loadingIcon()}
		<IconPlaceholder
			lucide="Loader2Icon"
			tabler="IconLoader"
			hugeicons="Loading03Icon"
			phosphor="SpinnerIcon"
			remixicon="RiLoaderLine"
			class="size-4 animate-spin"
		/>
	{/snippet}
	{#snippet successIcon()}
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
			class="size-4 text-success-text"
		/>
	{/snippet}
	{#snippet errorIcon()}
		<IconPlaceholder
			lucide="OctagonXIcon"
			tabler="IconAlertOctagon"
			hugeicons="MultiplicationSignCircleIcon"
			phosphor="XCircleIcon"
			remixicon="RiCloseCircleLine"
			class="size-4 text-destructive-text"
		/>
	{/snippet}
	{#snippet infoIcon()}
		<IconPlaceholder
			lucide="InfoIcon"
			tabler="IconInfoCircle"
			hugeicons="AlertCircleIcon"
			phosphor="InfoIcon"
			remixicon="RiInformationLine"
			class="size-4 text-info-text"
		/>
	{/snippet}
	{#snippet warningIcon()}
		<IconPlaceholder
			lucide="TriangleAlertIcon"
			tabler="IconAlertTriangle"
			hugeicons="Alert02Icon"
			phosphor="WarningIcon"
			remixicon="RiErrorWarningLine"
			class="size-4 text-warning-text"
		/>
	{/snippet}
</Sonner>
