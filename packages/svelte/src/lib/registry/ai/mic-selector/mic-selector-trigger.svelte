<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { PopoverTrigger } from "$lib/registry/ui/popover/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps, Snippet } from "svelte";
	import { useMicSelector } from "./use-mic-selector.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof Button>, "children"> & { children?: Snippet } = $props();

	const ctx = useMicSelector("MicSelectorTrigger");
	let el = $state<HTMLElement | null>(null);

	// Track the trigger width so the list below matches it.
	$effect(() => {
		if (!el) return;
		const target = el;
		const observer = new ResizeObserver(() => {
			if (target.offsetWidth) ctx.setWidth(target.offsetWidth);
		});
		observer.observe(target);
		return () => observer.disconnect();
	});
</script>

<PopoverTrigger data-slot="ai-mic-selector-trigger">
	{#snippet child({ props })}
		<Button
			bind:ref={el}
			variant="outline"
			class={cn("justify-start font-normal", className)}
			{...props}
			{...restProps}
		>
			{@render children?.()}
			<IconPlaceholder
				lucide="ChevronsUpDownIcon"
				tabler="IconSelector"
				hugeicons="UnfoldMoreIcon"
				phosphor="CaretUpDownIcon"
				remixicon="RiArrowUpDownLine"
				class="ml-auto size-3.5 shrink-0 text-muted-foreground"
			/>
		</Button>
	{/snippet}
</PopoverTrigger>
