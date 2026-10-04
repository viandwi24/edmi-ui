<script lang="ts">
	import { mode } from "mode-watcher";
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { cn } from "#lib/utils.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";
	import SpinnerIcon from 'phosphor-svelte/lib/Spinner';
	import CheckCircleIcon from 'phosphor-svelte/lib/CheckCircle';
	import XCircleIcon from 'phosphor-svelte/lib/XCircle';
	import InfoIcon from 'phosphor-svelte/lib/Info';
	import WarningIcon from 'phosphor-svelte/lib/Warning';

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
		<SpinnerIcon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CheckCircleIcon class="size-4 text-success-text" />
	{/snippet}
	{#snippet errorIcon()}
		<XCircleIcon class="size-4 text-destructive-text" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4 text-info-text" />
	{/snippet}
	{#snippet warningIcon()}
		<WarningIcon class="size-4 text-warning-text" />
	{/snippet}
</Sonner>
