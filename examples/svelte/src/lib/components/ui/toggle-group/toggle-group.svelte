<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import { toggleVariants } from "#lib/components/ui/toggle/index.js";
	import type { VariantProps } from "tailwind-variants";

	type ToggleVariants = VariantProps<typeof toggleVariants>;

	interface ToggleGroupContext extends ToggleVariants {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
		raised?: boolean;
	}

	export function setToggleGroupCtx(props: ToggleGroupContext) {
		setContext("toggleGroup", props);
	}

	export function getToggleGroupCtx() {
		return getContext<Required<ToggleGroupContext>>("toggleGroup");
	}
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size = "default",
		spacing = 2,
		orientation = "horizontal",
		variant = "default",
		raised = false,
		...restProps
	}: ToggleGroupPrimitive.RootProps &
		Omit<ToggleVariants, "raised"> & {
			spacing?: number;
			orientation?: "horizontal" | "vertical";
			/** ✦ opt-in one-step 3D look, passed down to every item. */
			raised?: boolean;
		} = $props();

	setToggleGroupCtx({
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get spacing() {
			return spacing;
		},
		get orientation() {
			return orientation;
		},
		get raised() {
			return raised;
		},
	});

	// ✦ `variant="segmented"` renders a flat track (DESIGN §4.5); gap is fixed at 2px.
	const segmented = $derived(variant === "segmented");
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<ToggleGroupPrimitive.Root
	bind:value={value as never}
	bind:ref
	{orientation}
	data-slot="toggle-group"
	data-variant={variant}
	data-size={size}
	data-raised={raised ? "" : undefined}
	data-spacing={segmented ? 0.5 : spacing}
	style={`--gap: ${segmented ? 0.5 : spacing}`}
	class={cn(
		"group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
		segmented && "rounded-[10px] border border-border bg-muted p-[3px] shadow-sunk",
		className
	)}
	{...restProps}
/>
