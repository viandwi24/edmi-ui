<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { buttonVariants, type ButtonSize, type ButtonVariant } from "$lib/registry/ui/button/index.js";
	import { getQuestionnaireRootContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		size = "default",
		variant = "ghost",
		disabled = false,
		onclick,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes, HTMLButtonElement> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	} = $props();

	const root = getQuestionnaireRootContext();
	const visible = $derived(root.total > 1 && !root.first);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		onclick?.(event);
		if (disabled) {
			event.preventDefault();
			return;
		}
		if (!event.defaultPrevented) root.goPrevious();
	}
</script>

<button
	bind:this={ref}
	data-slot="questionnaire-previous"
	type="button"
	aria-hidden={!visible || undefined}
	aria-disabled={disabled || undefined}
	data-disabled={disabled ? "" : undefined}
	data-hidden={visible ? undefined : ""}
	data-size={size}
	data-status={root.activeItemStatus ?? undefined}
	data-variant={variant}
	data-visible={visible ? "" : undefined}
	{disabled}
	hidden={!visible}
	inert={!visible}
	tabindex={visible ? undefined : -1}
	class={cn(buttonVariants({ size, variant }), "col-start-1 row-start-1 justify-self-start [&[hidden]]:hidden", className)}
	onclick={handleClick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Previous
	{/if}
</button>
