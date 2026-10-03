<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	// segmented.itemRaised (recipes.ts): tabs `raisedActive` with state=on.
	export const segmentedRaised =
		"data-[state=on]:bg-linear-to-b data-[state=on]:[background-origin:border-box] data-[state=on]:from-secondary-hi data-[state=on]:to-secondary data-[state=on]:border-input data-[state=on]:border-b-secondary-lip data-[state=on]:shadow-btn-secondary";

	export const toggleVariants = tv({
		base: "group/toggle inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-[background-color,box-shadow,transform] outline-none hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-input bg-transparent text-foreground hover:bg-accent",
				// ✦ Edmi addition: flat item for a ToggleGroup track (DESIGN §4.5)
				segmented: "bg-transparent",
			},
			size: {
				sm: "h-8 min-w-8 px-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				default: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				lg: "h-[42px] min-w-[42px] px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
			},
			// ✦ opt-in one-step 3D look
			raised: {
				false: "",
				true: "data-[state=on]:translate-y-px data-[state=on]:shadow-sunk",
			},
		},
		compoundVariants: [
			{ variant: "outline", raised: true, class: "bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-sunk" },
			{
				variant: "segmented",
				class: "h-[30px] min-w-[30px] rounded-[7px] px-3 hover:bg-transparent data-[state=on]:border-border data-[state=on]:bg-tab-active data-[state=on]:text-foreground",
			},
			// segmented.itemRaised: active item becomes a 3D secondary button
			{ variant: "segmented", raised: true, class: `${segmentedRaised} data-[state=on]:translate-y-0` },
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			raised: false,
		},
	});

	export type ToggleVariant = VariantProps<typeof toggleVariants>["variant"];
	export type ToggleSize = VariantProps<typeof toggleVariants>["size"];
	export type ToggleVariants = VariantProps<typeof toggleVariants>;
</script>

<script lang="ts">
	import { Toggle as TogglePrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		pressed = $bindable(false),
		class: className,
		size = "default",
		variant = "default",
		raised = false,
		...restProps
	}: TogglePrimitive.RootProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
		/** ✦ opt-in one-step 3D look. */
		raised?: boolean;
	} = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	data-slot="toggle"
	class={cn(toggleVariants({ variant, size, raised }), className)}
	{...restProps}
/>
