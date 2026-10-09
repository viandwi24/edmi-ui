<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	> & {
		/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	};
	// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
	const fieldElevation = {
		sunken: "border-sk-bd bg-sk-bg shadow-sunken focus-visible:bg-card",
		flat: "",
		raised: "border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised focus-visible:border-ring focus-visible:shadow-ring",
		floating: "border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating focus-visible:border-ring focus-visible:shadow-ring",
	};


	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		elevation = "auto",
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();

	const level = useElevation(() => elevation, "field");
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error",
			fieldElevation[level.current],
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error",
			fieldElevation[level.current],
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
