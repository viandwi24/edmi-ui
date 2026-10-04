<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	// Raised ✦ (opt-in): gradient fill + top highlight + ONE hard lip. Flat by default.
	// `background-origin: border-box` keeps the gradient from repeating under the border.
	const raised = "border bg-linear-to-b [background-origin:border-box]";

	export const buttonVariants = tv({
		base: "group/button relative inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-[filter,transform,box-shadow] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: "border border-transparent bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))] active:brightness-95",
				secondary: "border border-transparent bg-secondary text-secondary-foreground hover:bg-accent data-[state=open]:bg-accent",
				outline: "border border-input bg-background text-foreground hover:bg-accent data-[state=open]:bg-accent",
				ghost: "text-foreground hover:bg-accent data-[state=open]:bg-accent",
				destructive: "border border-transparent bg-destructive text-white hover:bg-[color-mix(in_srgb,var(--destructive)_90%,var(--background))]",
				link: "px-1 text-foreground underline underline-offset-4",
				// ✦ Edmi addition
				brand: "border border-transparent bg-brand text-brand-foreground hover:bg-[color-mix(in_srgb,var(--brand)_90%,var(--background))]",
			},
			// ✦ opt-in one-step 3D look
			raised: { false: "", true: "active:translate-y-[2px]" },
			size: {
				default: "h-9 rounded-md px-3.5 text-[13.5px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "h-6 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				sm: "h-8 gap-1.5 rounded-[7px] px-3 text-[13px] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-[42px] rounded-lg px-5 text-[15px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
				icon: "size-9 rounded-md",
				"icon-xs": "size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
				"icon-sm": "size-8 rounded-[7px] in-data-[slot=button-group]:rounded-lg",
				"icon-lg": "size-[42px] rounded-lg",
			},
		},
		compoundVariants: [
			{ raised: true, variant: "default", class: `${raised} from-primary-hi to-primary border-primary-edge border-b-primary-lip shadow-btn-primary hover:brightness-105 active:shadow-pressed active:border-b-primary-edge` },
			{ raised: true, variant: "secondary", class: `${raised} from-secondary-hi to-secondary border-input border-b-secondary-lip shadow-btn-secondary hover:from-accent hover:to-accent data-[state=open]:from-accent data-[state=open]:to-accent active:shadow-pressed` },
			{ raised: true, variant: "outline", class: "bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline hover:from-accent hover:to-accent data-[state=open]:from-accent data-[state=open]:to-accent active:shadow-none active:bg-none active:bg-outline-face" },
			{ raised: true, variant: "destructive", class: `${raised} from-destructive-hi to-destructive border-destructive-edge border-b-destructive-lip shadow-btn-destructive hover:brightness-105 active:shadow-pressed` },
			{ raised: true, variant: "brand", class: `${raised} from-brand-hi to-brand border-brand-edge border-b-brand-lip shadow-btn-brand hover:brightness-105 active:shadow-pressed` },
			// ghost & link are never raised
			{ raised: true, variant: ["ghost", "link"], class: "active:translate-y-0" },
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			raised: false,
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
	export type ButtonRaised = VariantProps<typeof buttonVariants>["raised"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			/** ✦ opt-in one-step 3D look (never applies to ghost/link). */
			raised?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		raised = false,
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		data-variant={variant}
		class={cn(buttonVariants({ variant, size, raised }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		data-variant={variant}
		class={cn(buttonVariants({ variant, size, raised }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
