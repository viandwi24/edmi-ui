<script lang="ts">
	import { mode } from "mode-watcher";
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { cn } from "$lib/utils.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		elevation = "auto",
		...restProps
	}: SonnerProps & {
		/** ✦ depth for every toast: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
		elevation?: Elevation;
	} = $props();

	// ✦ depth (v4): floating is the natural level of a toast (overlay role in layered mode).
	const toastElevation = {
		sunken: "shadow-none!",
		flat: "shadow-none!",
		raised: "border-transparent! shadow-raised!",
		floating: "border-transparent! shadow-floating!",
	};
	const level = useElevation(() => elevation, "overlay");

	// Soft fill + tinted 40% border per type (DESIGN 4.12); default stays a solid popover chip.
	// svelte-sonner's own selectors are more specific than utilities, hence the important modifier.
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border); --border-radius: var(--radius-xl); --width: 360px;"
	toastOptions={{
		classes: {
			toast: cn("cn-toast text-[13.5px] font-sans", toastElevation[level.current]),
			title: "font-medium",
			description: "text-muted-foreground!",
			success: "bg-success-soft! border-[color-mix(in_srgb,var(--success)_40%,var(--popover))]!",
			info: "bg-info-soft! border-[color-mix(in_srgb,var(--info)_40%,var(--popover))]!",
			warning: "bg-warning-soft! border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))]!",
			error: "bg-destructive-soft! border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))]!",
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
