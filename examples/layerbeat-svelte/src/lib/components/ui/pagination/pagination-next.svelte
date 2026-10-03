<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRight';
	import { buttonVariants } from "#lib/components/ui/button/index.js";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: PaginationPrimitive.NextButtonProps = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(buttonVariants({ variant: "ghost", size: "default" }), "pr-1.5!", className)}
	{...restProps}
>
	<span class="hidden sm:block">Next</span>
	<CaretRightIcon data-icon="inline-end" class="rtl:rotate-180" />
</PaginationPrimitive.NextButton>
