<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Layout } from "./layout.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import LayoutPickerWireframe from "./layout-picker-wireframe.svelte";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable("dashboard"),
		onValueChange,
		name,
		elevation = "auto",
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children" | "onchange">> & {
		/** Two-way bindable (`bind:value`); initial value doubles as the default. */
		value?: Layout;
		onValueChange?: (value: Layout) => void;
		name?: string;
		/** ✦ depth of the option cards: sunken -1, flat 0, raised +1, floating +2 (the checked card keeps its ring). */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	// ✦ choice-card depth (v4); the checked card keeps its ring.
	const choiceElevation = {
		sunken: "border-sk-bd bg-sk-bg shadow-sunken",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};

	const options: { value: Layout; label: string }[] = [
		{ value: "dashboard", label: "Dashboard" },
		{ value: "navbar", label: "Navbar" },
	];

	const groupName = $props.id();
</script>

<!-- Two choice cards (native radios, so arrows/Space work). -->
<div
	bind:this={ref}
	data-slot="layout-picker"
	role="radiogroup"
	class={cn("flex flex-wrap gap-3", className)}
	{...restProps}
>
	{#each options as o (o.value)}
		<label
			class={cn(
				"group/lp flex w-[220px] cursor-pointer flex-col gap-2.5 rounded-xl border border-border bg-card p-3.5 has-[:checked]:border-ring has-[:checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] has-[:checked]:shadow-[0_0_0_1px_var(--ring)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
				choiceElevation[level.current]
			)}
		>
			<input
				type="radio"
				class="sr-only"
				name={name ?? groupName}
				value={o.value}
				checked={value === o.value}
				onchange={() => {
					value = o.value;
					onValueChange?.(o.value);
				}}
			/>
			<LayoutPickerWireframe layout={o.value} />
			<span class="flex w-full items-center justify-between">
				<span class="text-sm font-medium">{o.label}</span>
				<span
					class="flex size-[18px] items-center justify-center rounded-full border border-input bg-card group-has-[:checked]/lp:border-primary group-has-[:checked]/lp:after:size-[9px] group-has-[:checked]/lp:after:rounded-full group-has-[:checked]/lp:after:bg-primary group-has-[:checked]/lp:after:content-['']"
				></span>
			</span>
		</label>
	{/each}
</div>
