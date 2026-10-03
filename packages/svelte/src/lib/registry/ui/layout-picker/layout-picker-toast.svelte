<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getLayoutCookie, setLayoutCookie, type Layout } from "./layout.js";
	import LayoutPicker from "./layout-picker.svelte";

	let {
		ref = $bindable(null),
		class: className,
		title = "Choose your layout",
		description = "You can switch any time.",
		defaultOpen,
		onValueChange,
		onClose,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "title" | "children">> & {
		title?: string;
		description?: string;
		/** Skip the cookie check and show immediately (docs/previews). */
		defaultOpen?: boolean;
		onValueChange?: (value: Layout) => void;
		onClose?: () => void;
		/** ✦ opt-in one-step 3D look (toast + option cards). */
		raised?: boolean;
	} = $props();

	// First-visit corner toast. Renders nothing once a layout cookie exists. Choosing saves the cookie;
	// closing without choosing saves the default (`dashboard`) so it does not return.
	let open = $state(false);
	let value = $state<Layout>("dashboard");

	$effect(() => {
		open = defaultOpen ?? getLayoutCookie() === undefined;
	});
</script>

{#if open}
	<div
		bind:this={ref}
		data-slot="layout-picker-toast"
		role="dialog"
		aria-label="Choose layout"
		class={cn(
			"fixed right-4 bottom-4 z-50 w-[min(92vw,500px)] rounded-xl border border-border bg-popover p-4 text-popover-foreground",
			raised && "border-b-lip shadow-[0_3px_0_var(--lip)]",
			className
		)}
		{...restProps}
	>
		<div class="flex items-start justify-between gap-3">
			<div>
				<div class="text-sm font-semibold">{title}</div>
				<div class="text-[13px] text-muted-foreground">{description}</div>
			</div>
			<Button
				variant="ghost"
				size="icon-xs"
				aria-label="Close"
				onclick={() => {
					if (getLayoutCookie() === undefined) setLayoutCookie(value);
					open = false;
					onClose?.();
				}}
			>
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			</Button>
		</div>
		<LayoutPicker
			class="mt-3 flex-nowrap"
			{raised}
			bind:value
			onValueChange={(v) => {
				setLayoutCookie(v);
				onValueChange?.(v);
			}}
		/>
	</div>
{/if}
