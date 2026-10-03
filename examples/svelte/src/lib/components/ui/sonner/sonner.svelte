<script lang="ts">
	import { mode } from "mode-watcher";
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { cn } from "#lib/utils.js";
	import SpinnerIcon from 'phosphor-svelte/lib/Spinner';
	import CheckCircleIcon from 'phosphor-svelte/lib/CheckCircle';
	import XCircleIcon from 'phosphor-svelte/lib/XCircle';
	import InfoIcon from 'phosphor-svelte/lib/Info';
	import WarningIcon from 'phosphor-svelte/lib/Warning';

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
			success: "bg-brand-soft! border-brand/40!",
			info: "bg-info-soft! border-info/40!",
			warning: "bg-warning-soft! border-warning/40!",
			error: "bg-destructive-soft! border-destructive/40!",
		},
	}}
	{...restProps}
>
	{#snippet loadingIcon()}
		<SpinnerIcon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CheckCircleIcon class="size-4 text-brand-text" />
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
