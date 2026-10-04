<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";
	import { type Elevation } from "#lib/components/ui/elevation/index.js";
	import { setContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		elevation = "auto",
		...restProps
	}: InputOTPPrimitive.RootProps & {
		/** ✦ depth for every slot: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	setContext("inputOTPElevation", () => elevation);
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	data-slot="input-otp"
	spellcheck={false}
	class={cn(
		"flex items-center gap-2 has-disabled:opacity-50",
		"disabled:cursor-not-allowed",
		className
	)}
	{...restProps}
/>
