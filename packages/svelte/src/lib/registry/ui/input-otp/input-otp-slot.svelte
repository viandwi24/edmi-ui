<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		cell,
		class: className,
		...restProps
	}: InputOTPPrimitive.CellProps = $props();
</script>

<InputOTPPrimitive.Cell
	{cell}
	bind:ref
	data-slot="input-otp-slot"
	class={cn(
		"relative flex size-10 items-center justify-center rounded-md border border-input bg-card font-mono text-sm text-foreground shadow-sunk outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:shadow-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:shadow-ring-error",
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
