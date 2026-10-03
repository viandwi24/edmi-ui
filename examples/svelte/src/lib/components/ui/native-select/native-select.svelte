<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDown';
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLSelectAttributes } from "svelte/elements";

	type NativeSelectProps = Omit<WithElementRef<HTMLSelectAttributes>, "size"> & {
		size?: "sm" | "default";
		/** ✦ opt-in one-step 3D look. */
		raised?: boolean;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size = "default",
		raised = false,
		children,
		...restProps
	}: NativeSelectProps = $props();
</script>

<div
	class={cn(
		"group/native-select relative w-fit has-[select:disabled]:opacity-50",
		className
	)}
	data-slot="native-select-wrapper"
	data-size={size}
>
	<select
		bind:value
		bind:this={ref}
		data-slot="native-select"
		data-size={size}
		class={cn(
			"h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-card pr-8 pl-3 text-sm text-foreground outline-none select-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[size=sm]:h-8 data-[size=sm]:rounded-[7px]",
			raised && "border-b-lip shadow-btn-outline"
		)}
		{...restProps}
	>
		{@render children?.()}
	</select>
	<CaretDownIcon class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none" aria-hidden data-slot="native-select-icon" />
</div>
