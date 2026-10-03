<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from 'phosphor-svelte/lib/Check';
	import MinusIcon from 'phosphor-svelte/lib/Minus';
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";

	// Flat by default: checked = solid primary. raised ✦ adds the gradient + top highlight.
	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		raised = false,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		/** ✦ opt-in one-step 3D look for the checked state. */
		raised?: boolean;
	} = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		"peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input bg-card text-primary-foreground shadow-sunk transition-[box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error group-has-disabled/field:opacity-50",
		"data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
		raised &&
			"data-[state=checked]:border-primary-edge data-[state=checked]:bg-linear-to-b data-[state=checked]:from-primary-hi data-[state=checked]:to-primary data-[state=checked]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[state=checked]:[background-origin:border-box] data-[state=checked]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)] data-[state=indeterminate]:border-primary-edge data-[state=indeterminate]:bg-linear-to-b data-[state=indeterminate]:from-primary-hi data-[state=indeterminate]:to-primary data-[state=indeterminate]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[state=indeterminate]:[background-origin:border-box] data-[state=indeterminate]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)]",
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div
			data-slot="checkbox-indicator"
			class="grid place-content-center text-current transition-none [&>svg]:size-3.5"
		>
			{#if checked}
				<CheckIcon stroke-width={3} />
			{:else if indeterminate}
				<MinusIcon stroke-width={3} />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>
