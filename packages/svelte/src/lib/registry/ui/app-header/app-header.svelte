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
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import AppHeaderNavItem from "./app-header-nav-item.svelte";

	let {
		ref = $bindable(null),
		class: className,
		logo,
		name = "Stockbreak",
		href = "/",
		items = [],
		active,
		search = true,
		searchPlaceholder = "Search",
		shortcut = "⌘K",
		network = "Devnet",
		connectLabel = "Connect",
		onConnect,
		onNetworkClick,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLElement>, "children">> & {
		logo?: Snippet;
		name?: string;
		href?: string;
		items?: AppHeaderItem[];
		/** `href` of the active item. */
		active?: string;
		/** `false` hides the search field. */
		search?: boolean;
		searchPlaceholder?: string;
		shortcut?: string;
		/** Network label; empty string hides the button. */
		network?: string;
		connectLabel?: string;
		onConnect?: () => void;
		onNetworkClick?: () => void;
		/** ✦ opt-in one-step 3D look (bar, mark, active pill, Connect button). */
		raised?: boolean;
	} = $props();
</script>

<!-- App top bar (navbar layout): brand + nav pills, then search, network and wallet. -->
<header
	bind:this={ref}
	data-slot="app-header"
	class={cn(
		"@container/app-header flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground",
		raised && "border-b-lip shadow-card",
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
						"inline-flex size-7 items-center justify-center rounded-lg border border-primary bg-primary text-primary-foreground",
						raised &&
							"border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-[0_2px_0_var(--primary-lip)] [background-origin:border-box]"
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
			<span class="font-brand text-xl font-semibold tracking-[-0.4px]">{name}</span>
		</a>
		<nav class="flex items-center gap-0.5 max-lg:hidden" aria-label="App">
			{#each items as item (item.href)}
				<AppHeaderNavItem href={item.href} active={item.href === active} {raised}>
					{item.label}
				</AppHeaderNavItem>
			{/each}
		</nav>
	</div>
	<div class="flex items-center gap-2">
		{#if search}
			<InputGroup class="h-9 w-[180px] @max-[960px]/app-header:hidden">
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
					<Kbd>{shortcut}</Kbd>
				</InputGroupAddon>
			</InputGroup>
		{/if}
		{#if network}
			<Button variant="secondary" {raised} onclick={onNetworkClick}>{network}</Button>
		{/if}
		<Button {raised} onclick={onConnect}>
			<IconPlaceholder
				lucide="WalletIcon"
				tabler="IconWallet"
				hugeicons="WalletIcon"
				phosphor="WalletIcon"
				remixicon="RiWalletLine"
			/>
			{connectLabel}
		</Button>
	</div>
</header>
