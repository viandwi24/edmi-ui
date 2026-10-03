<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { InputGroupButton } from "$lib/registry/ui/input-group/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	type ButtonSize = ComponentProps<typeof InputGroupButton>["size"];

	let {
		ref = $bindable(null),
		variant = "ghost",
		size,
		class: className,
		tooltip,
		shortcut,
		side = "top",
		children,
		...restProps
	}: Omit<ComponentProps<typeof InputGroupButton>, "size" | "href"> & {
		size?: ButtonSize;
		/** Tooltip text; `shortcut` and `side` refine it. */
		tooltip?: string;
		shortcut?: string;
		side?: "top" | "right" | "bottom" | "left";
	} = $props();

	// An icon alone is a square button; an icon plus a label is a small text button.
	let childCount = $state(1);
	$effect(() => {
		const el = ref;
		if (!el) return;
		const sync = () => {
			childCount = Array.from(el.childNodes).filter(
				(node) =>
					node.nodeType === Node.ELEMENT_NODE ||
					(node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
			).length;
		};
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(el, { childList: true, characterData: true, subtree: false });
		return () => observer.disconnect();
	});
	const resolvedSize = $derived<ButtonSize>(size ?? (childCount > 1 ? "sm" : "icon-sm"));
</script>

{#snippet button(props: Record<string, unknown>)}
	<InputGroupButton
		bind:ref
		type="button"
		{variant}
		size={resolvedSize}
		class={cn("text-[13px] text-foreground", resolvedSize === "sm" && "h-8 gap-1.5 px-2.5", className)}
		{...props}
		{...restProps}
	>
		{@render children?.()}
	</InputGroupButton>
{/snippet}

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					{@render button(props)}
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content {side}>
				{tooltip}
				{#if shortcut}
					<span class="ml-2 text-muted-foreground">{shortcut}</span>
				{/if}
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	{@render button({})}
{/if}
