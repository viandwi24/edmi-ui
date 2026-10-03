<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn(
		"flex h-[30px] items-center rounded-[7px] px-3 text-[13.5px] font-medium outline-none select-none hover:bg-accent data-[state=open]:bg-accent", className)}
	{...restProps}
/>
