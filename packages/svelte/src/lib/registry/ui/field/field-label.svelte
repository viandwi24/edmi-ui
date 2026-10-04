<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		elevation = "auto",
		...restProps
	}: ComponentProps<typeof Label> & {
		/** ✦ choice-card depth (a FieldLabel wrapping a Field): sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");

	// ✦ choice-card depth (v4); a checked card keeps its ring
	const ck =
		"has-[>[data-slot=field]]:has-data-[state=checked]:border-ring has-[>[data-slot=field]]:has-data-[state=checked]:shadow-[0_0_0_1px_var(--ring)]";
	const choiceCardElevation = {
		sunken: `has-[>[data-slot=field]]:border-sk-bd has-[>[data-slot=field]]:bg-sk-bg has-[>[data-slot=field]]:shadow-sunken ${ck}`,
		flat: "",
		raised: `has-[>[data-slot=field]]:border-transparent has-[>[data-slot=field]]:shadow-raised ${ck}`,
		floating: `has-[>[data-slot=field]]:border-transparent has-[>[data-slot=field]]:shadow-floating ${ck}`,
	};
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={cn(
		"group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:shadow-ring has-[>[data-slot=field]]:has-data-[state=checked]:border-ring has-[>[data-slot=field]]:has-data-[state=checked]:shadow-[0_0_0_1px_var(--ring)] *:data-[slot=field]:p-3.5",
		"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
		choiceCardElevation[level.current],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Label>
