<script lang="ts">
	import XIcon from 'phosphor-svelte/lib/X';
	import { Button } from "#lib/components/ui/button/index.js";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getLayoutCookie, setLayoutCookie, type Layout } from "./layout.js";
	import LayoutPicker from "./layout-picker.svelte";
	import { controlLevel, type Elevation, surfaceElevation, useElevation } from "#lib/components/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		title = "Choose your layout",
		description = "You can switch any time.",
		defaultOpen,
		value = $bindable(),
		defaultValue = "dashboard",
		onValueChange,
		onClose,
		elevation = "auto",
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "title" | "children">> & {
		title?: string;
		description?: string;
		/** Skip the cookie check and show immediately (docs/previews). */
		defaultOpen?: boolean;
		/** Two-way bindable selected layout (`bind:value`). */
		value?: Layout;
		/** Initially selected layout. */
		defaultValue?: Layout;
		onValueChange?: (value: Layout) => void;
		onClose?: () => void;
		/** ✦ depth of the toast (floating is its natural level); raised +1 / floating +2 also raise the option cards. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "overlay");
	const pickerElevation = $derived<Elevation>(controlLevel(elevation) ?? "auto");

	// First-visit corner toast. Renders nothing once a layout cookie exists. Choosing saves the cookie;
	// closing without choosing saves the default (`dashboard`) so it does not return.
	let open = $state(false);
	// svelte-ignore state_referenced_locally
	let inner = $state<Layout>(defaultValue);
	const current = $derived(value ?? inner);

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
			surfaceElevation[level.current],
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
					if (getLayoutCookie() === undefined) setLayoutCookie(current);
					open = false;
					onClose?.();
				}}
			>
				<XIcon  />
			</Button>
		</div>
		<LayoutPicker
			class="mt-3 flex-nowrap"
			elevation={pickerElevation}
			value={current}
			onValueChange={(v) => {
				inner = v;
				value = v;
				setLayoutCookie(v);
				onValueChange?.(v);
			}}
		/>
	</div>
{/if}
