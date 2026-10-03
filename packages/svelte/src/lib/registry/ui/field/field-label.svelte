<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		raised = false,
		...restProps
	}: ComponentProps<typeof Label> & {
		/** ✦ opt-in one-step 3D look for choice cards (a FieldLabel wrapping a Field). */
		raised?: boolean;
	} = $props();
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={cn(
		"group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:shadow-ring has-[>[data-slot=field]]:has-data-[state=checked]:border-ring has-[>[data-slot=field]]:has-data-[state=checked]:shadow-[0_0_0_1px_var(--ring)] *:data-[slot=field]:p-3.5",
		"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
		raised &&
			"has-[>[data-slot=field]]:border-b-lip has-[>[data-slot=field]]:shadow-card has-[>[data-slot=field]]:has-data-[state=checked]:border-b-ring",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Label>
