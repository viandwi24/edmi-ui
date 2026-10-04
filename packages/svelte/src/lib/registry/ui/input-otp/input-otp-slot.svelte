<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		cell,
		class: className,
		elevation,
		...restProps
	}: InputOTPPrimitive.CellProps & {
		/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	const group = getContext<(() => Elevation) | undefined>("inputOTPElevation");
	const level = useElevation(() => elevation ?? group?.(), "field");

	// ✦ depth (v4): slots sink (-1) in layered mode; the active slot swaps the edge for the ring
	const fieldElevation = {
		sunken: "border-sk-bd bg-sk-bg shadow-sunken data-[active=true]:bg-card",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};
</script>

<InputOTPPrimitive.Cell
	{cell}
	bind:ref
	data-slot="input-otp-slot"
	class={cn(
		"relative flex size-10 items-center justify-center rounded-md border border-input bg-card font-mono text-sm text-foreground outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:shadow-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:shadow-ring-error",
		fieldElevation[level.current],
		className
	)}
	{...restProps}
>
	{cell.char}
	{#if cell.hasFakeCaret}
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center"
		>
			<div class="h-4 w-px animate-pulse bg-foreground duration-1000"></div>
		</div>
	{/if}
</InputOTPPrimitive.Cell>
