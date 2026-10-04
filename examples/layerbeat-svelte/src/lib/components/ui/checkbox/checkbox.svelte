<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from 'phosphor-svelte/lib/Check';
	import MinusIcon from 'phosphor-svelte/lib/Minus';
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";

	// Flat by default: checked = solid primary. elevation ✦ raised/floating: only the checked box rises (bevel).
	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		elevation = "auto",
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		/** ✦ depth: raised +1 / floating +2 make the checked box rise. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	const raised = $derived(level.current === "raised" || level.current === "floating");
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		"peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input bg-card text-primary-foreground transition-[box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error group-has-disabled/field:opacity-50",
		"data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
		raised &&
			"data-[state=checked]:border-transparent data-[state=checked]:[background-image:var(--r1-p-face)] data-[state=checked]:shadow-btn-raised-primary data-[state=indeterminate]:border-transparent data-[state=indeterminate]:[background-image:var(--r1-p-face)] data-[state=indeterminate]:shadow-btn-raised-primary",
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
