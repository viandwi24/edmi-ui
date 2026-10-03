<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { Alert } from "$lib/registry/ui/alert/index.js";
	import type { ToolUIPart } from "ai";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setConfirmationContext, type ToolUIPartApproval } from "./use-confirmation.svelte.js";

	let {
		class: className,
		approval,
		state,
		raised = false,
		icon,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		approval?: ToolUIPartApproval;
		state: ToolUIPart["state"];
		/** ✦ raised action buttons (the buttons inherit it, each can override). */
		raised?: boolean;
		/** Leading icon of the request. Defaults to a shield. */
		icon?: Snippet;
		children?: Snippet;
	} = $props();

	setConfirmationContext({
		get approval() {
			return approval;
		},
		get state() {
			return state;
		},
		get raised() {
			return raised;
		},
	});

	const hidden = $derived(!approval || state === "input-streaming" || state === "input-available");
</script>

{#if !hidden}
	<!-- Request = warning alert with Approve / Reject; once answered it collapses to a plain status line. -->
	{#if state === "approval-requested"}
		<Alert data-slot="ai-confirmation" data-state={state} variant="warning" class={className} {...restProps}>
			{#if icon}
				{@render icon()}
			{:else}
				<IconPlaceholder
					lucide="ShieldIcon"
					tabler="IconShield"
					hugeicons="ShieldIcon"
					phosphor="ShieldIcon"
					remixicon="RiShieldLine"
				/>
			{/if}
			{@render children?.()}
		</Alert>
	{:else}
		<div
			data-slot="ai-confirmation"
			data-state={state}
			class={cn("flex items-center gap-2 text-[13.5px]", className)}
			{...restProps}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}
