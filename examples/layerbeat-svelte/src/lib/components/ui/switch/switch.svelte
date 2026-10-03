<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";

	// On uses --brand so live settings read as active at a glance. Sizes: default 40x24, sm 32x18.
	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		size = "default",
		raised = false,
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
		size?: "sm" | "default";
		/** ✦ opt-in one-step 3D look for the thumb. */
		raised?: boolean;
	} = $props();
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	data-slot="switch"
	data-size={size}
	class={cn(
		"peer group/switch relative inline-flex shrink-0 items-center rounded-full bg-input shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12),0_0_0_3px_var(--ring-soft)] aria-invalid:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12),0_0_0_3px_var(--destructive-soft)] aria-invalid:outline aria-invalid:outline-1 aria-invalid:-outline-offset-1 aria-invalid:outline-destructive data-[state=checked]:bg-brand data-[size=default]:h-6 data-[size=default]:w-10 data-[size=sm]:h-[18px] data-[size=sm]:w-8 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		data-slot="switch-thumb"
		class={cn(
			"pointer-events-none ml-[3px] block rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.1)] transition-transform group-data-[size=default]/switch:size-[18px] group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-[state=checked]:translate-x-4 group-data-[size=sm]/switch:data-[state=checked]:translate-x-3.5",
			raised && "bg-linear-to-b from-white to-[#f1f0ec] shadow-[0_1px_0_rgb(0_0_0/0.25)]"
		)}
	/>
</SwitchPrimitive.Root>
