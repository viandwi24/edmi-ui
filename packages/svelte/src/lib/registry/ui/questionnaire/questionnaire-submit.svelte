<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { buttonVariants, type ButtonSize, type ButtonVariant } from "$lib/registry/ui/button/index.js";
	import { getQuestionnaireRootContext } from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		size = "default",
		variant = "default",
		disabled = false,
		onclick,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes, HTMLButtonElement> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	} = $props();

	const root = getQuestionnaireRootContext();
	const visible = $derived(root.total > 0 && root.last);
	const shortcut = $derived(visible && !disabled ? "Enter" : null);
</script>

<button
	bind:this={ref}
	data-slot="questionnaire-submit"
	type="submit"
	aria-hidden={!visible || undefined}
	aria-disabled={disabled || undefined}
	aria-keyshortcuts={shortcut ?? undefined}
	data-shortcut={shortcut ?? undefined}
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
	class={cn(buttonVariants({ size, variant }), "col-start-3 row-start-1 justify-self-end", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Submit
	{/if}
</button>
