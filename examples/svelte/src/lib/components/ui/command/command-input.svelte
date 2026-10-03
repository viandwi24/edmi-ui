<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import MagnifyingGlassIcon from 'phosphor-svelte/lib/MagnifyingGlass';
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div
	data-slot="command-input-wrapper"
	class="flex h-12 items-center gap-2.5 border-b border-border px-3.5"
>
	<MagnifyingGlassIcon class="size-4 shrink-0 text-muted-foreground" />
	<CommandPrimitive.Input
		bind:ref
		bind:value
		data-slot="command-input"
		class={cn(
			"h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...restProps}
	/>
</div>
