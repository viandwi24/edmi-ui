<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		raised = false,
		...restProps
	}: MenubarPrimitive.RootProps & {
		/** ✦ opt-in one-step 3D look for the bar. */
		raised?: boolean;
	} = $props();
</script>

<MenubarPrimitive.Root
	bind:ref
	data-slot="menubar"
	class={cn(
		"flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-[3px]",
		raised && "border-b-lip shadow-[0_2px_0_var(--lip)]",
		className
	)}
	{...restProps}
/>
