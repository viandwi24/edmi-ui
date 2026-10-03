<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	class={cn(
		"group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input bg-card shadow-sunk outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[state=checked]:border-primary group-has-disabled/field:opacity-50",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div data-slot="radio-group-indicator" class="flex items-center justify-center">
			{#if checked}
				<span data-indicator class="block size-[9px] rounded-full bg-primary"></span>
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>
