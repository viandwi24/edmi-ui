<script lang="ts">
	import type { Snippet } from "svelte";
	import Briefcase from "phosphor-svelte/lib/Briefcase";
	import Compass from "phosphor-svelte/lib/Compass";
	import Gauge from "phosphor-svelte/lib/Gauge";
	import Gear from "phosphor-svelte/lib/Gear";
	import List from "phosphor-svelte/lib/List";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import Plus from "phosphor-svelte/lib/Plus";
	import Robot from "phosphor-svelte/lib/Robot";
	import Trophy from "phosphor-svelte/lib/Trophy";
	import * as Breadcrumb from "#lib/components/ui/breadcrumb/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import { WatchlistItem } from "#lib/components/ui/watchlist-item/index.js";
	import { watchlist } from "#lib/data/markets.js";
	import ThemeToggle from "../theme-toggle.svelte";

	let { children }: { children: Snippet } = $props();

	const items = [
		{ label: "Dashboard", icon: Gauge, active: true },
		{ label: "Explore", icon: Compass },
		{ label: "Feed", icon: List },
		{ label: "Leaderboard", icon: Trophy },
		{ label: "AI agents", icon: Robot },
		{ label: "Create index", icon: Plus },
		{ label: "Portfolio", icon: Briefcase },
		{ label: "Settings", icon: Gear },
	];
</script>

<Sidebar.Provider>
	<Sidebar.Root variant="inset" collapsible="icon">
		<Sidebar.Header>
			<a href="/" class="flex items-center gap-2.5 px-1 py-1">
				<span
					class="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] border border-input bg-linear-to-b from-secondary-hi to-secondary shadow-btn-secondary [background-origin:border-box]"
				>
					<Gauge class="size-3.5" />
				</span>
				<span class="font-brand text-xl font-semibold tracking-[-0.4px] group-data-[collapsible=icon]:hidden">
					Stockbreak
				</span>
			</a>
			<div class="relative group-data-[collapsible=icon]:hidden">
				<MagnifyingGlass class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search" aria-label="Search" class="h-10 pl-9" />
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.label)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={item.active} tooltipContent={item.label}>
									{#snippet child({ props })}
										<a href="#{item.label}" {...props}>
											<item.icon />
											<span>{item.label}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
				<Sidebar.GroupLabel class="tracking-[1px] uppercase">My watchlist</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					{#each watchlist as w (w.symbol)}
						<WatchlistItem  href="#watch" {...w} />
					{/each}
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer class="group-data-[collapsible=icon]:hidden">
			<a
				href="#faucet"
				class="rounded-xl border border-input bg-linear-to-b from-secondary-hi to-secondary p-4 shadow-btn-secondary [background-origin:border-box]"
			>
				<div class="text-sm font-medium">Get devnet USDC ↗</div>
				<div class="mt-0.5 text-[11.5px] text-muted-foreground">Fund your wallet at /faucet</div>
			</a>
		</Sidebar.Footer>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header
			class="flex h-[62px] shrink-0 items-center justify-between gap-2 border-b border-border-2 px-4 md:px-6"
		>
			<div class="flex items-center gap-2">
				<Sidebar.Trigger />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Markets</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="flex items-center gap-2">
				<Button variant="outline">Devnet</Button>
				<ThemeToggle />
			</div>
		</header>
		<div class="flex-1 overflow-auto">{@render children()}</div>
	</Sidebar.Inset>
</Sidebar.Provider>
