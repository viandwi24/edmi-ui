<script lang="ts" module>
	export type AppHeaderItem = { label: string; href: string };
</script>

<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupInput,
	} from "$lib/registry/ui/input-group/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
	import { controlLevel, type Elevation, surfaceElevation, useElevation } from "$lib/registry/ui/elevation/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import AppHeaderNavItem from "./app-header-nav-item.svelte";

	let {
		ref = $bindable(null),
		class: className,
		logo,
		name,
		href = "/",
		items = [],
		active,
		search = true,
		searchPlaceholder = "Search",
		shortcut = "⌘K",
		network,
		connectLabel = "Connect",
		onConnect,
		onNetworkClick,
		elevation = "auto",
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLElement>, "children">> & {
		logo?: Snippet;
		/** Brand text or a snippet. */
		name?: string | Snippet;
		href?: string;
		items?: AppHeaderItem[];
		/** `href` of the active item. */
		active?: string;
		/** `false` hides the search field. */
		search?: boolean;
		searchPlaceholder?: string;
		shortcut?: string;
		/** Secondary button label (e.g. a network or workspace); omit to hide it. */
		network?: string | Snippet;
		/** Primary button label. */
		connectLabel?: string | Snippet;
		onConnect?: () => void;
		onNetworkClick?: () => void;
		/** ✦ depth of the bar; raised +1 / floating +2 also raise the mark, active pill and buttons. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "surface");
	// Controls follow an explicit bar level (flat/sunken keep them flat); auto leaves them to their own role.
	const control = $derived<Elevation | undefined>(controlLevel(elevation));
	const markLevel = useElevation(() => control ?? "auto", "handle");
	const markRaised = $derived(markLevel.current === "raised" || markLevel.current === "floating");
</script>

<!-- App top bar (navbar layout): brand + nav pills, then search, network and wallet. -->
<header
	bind:this={ref}
	data-slot="app-header"
	class={cn(
		"@container/app-header flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground",
		surfaceElevation[level.current],
		className
	)}
	{...restProps}
>
	<div class="flex items-center gap-[18px]">
		<a {href} class="flex items-center gap-2.5 whitespace-nowrap">
			{#if logo}
				{@render logo()}
			{:else}
				<span
					class={cn(
						"inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground",
						markRaised &&
							"[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]"
					)}
				>
					<IconPlaceholder
						lucide="ChartLineIcon"
						tabler="IconChartLine"
						hugeicons="ChartLineData01Icon"
						phosphor="ChartLineUpIcon"
						remixicon="RiLineChartLine"
						class="size-[15px]"
					/>
				</span>
			{/if}
			{#if name}
				<span class="font-brand text-xl font-semibold tracking-[-0.4px]">
					{#if typeof name === "string"}{name}{:else}{@render name()}{/if}
				</span>
			{/if}
		</a>
		<nav class="flex items-center gap-0.5 max-lg:hidden" aria-label="App">
			{#each items as item (item.href)}
				<AppHeaderNavItem href={item.href} active={item.href === active} elevation={control}>
					{item.label}
				</AppHeaderNavItem>
			{/each}
		</nav>
	</div>
	<div class="flex items-center gap-2">
		{#if search}
			<InputGroup class="w-[180px] @max-[960px]/app-header:hidden">
				<InputGroupAddon>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
					/>
				</InputGroupAddon>
				<InputGroupInput
					placeholder={searchPlaceholder}
					aria-label={searchPlaceholder}
					class="text-[13px]"
				/>
				<InputGroupAddon align="inline-end">
					<Kbd elevation={control}>{shortcut}</Kbd>
				</InputGroupAddon>
			</InputGroup>
		{/if}
		{#if network}
			<Button variant="secondary" elevation={control} onclick={onNetworkClick}>
				{#if typeof network === "string"}{network}{:else}{@render network()}{/if}
			</Button>
		{/if}
		<Button elevation={control} onclick={onConnect}>
			<IconPlaceholder
				lucide="WalletIcon"
				tabler="IconWallet"
				hugeicons="WalletIcon"
				phosphor="WalletIcon"
				remixicon="RiWalletLine"
			/>
			{#if typeof connectLabel === "string"}{connectLabel}{:else}{@render connectLabel()}{/if}
		</Button>
	</div>
</header>
