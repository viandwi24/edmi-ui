<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Separator } from "@edmi-svelte/ui/separator";
	import * as Sidebar from "@edmi-svelte/ui/sidebar";

	const platform = [
		{ title: "Dashboard", icon: "dashboard", active: true },
		{ title: "Explore", icon: "search" },
		{ title: "Feed", icon: "feed", badge: "3" },
		{ title: "Leaderboard", icon: "trophy" },
	];
</script>

{#snippet icon(name: string)}
	{#if name === "dashboard"}
		<IconPlaceholder
			lucide="LayoutDashboardIcon"
			tabler="IconDashboard"
			hugeicons="DashboardSquare01Icon"
			phosphor="SquaresFourIcon"
			remixicon="RiDashboardLine"
		/>
	{:else if name === "search"}
		<IconPlaceholder
			lucide="SearchIcon"
			tabler="IconSearch"
			hugeicons="SearchIcon"
			phosphor="MagnifyingGlassIcon"
			remixicon="RiSearchLine"
		/>
	{:else if name === "feed"}
		<IconPlaceholder
			lucide="NewspaperIcon"
			tabler="IconNews"
			hugeicons="News01Icon"
			phosphor="NewspaperIcon"
			remixicon="RiNewspaperLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="TrophyIcon"
			tabler="IconTrophy"
			hugeicons="Award01Icon"
			phosphor="TrophyIcon"
			remixicon="RiTrophyLine"
		/>
	{/if}
{/snippet}

<!-- translateZ makes the sidebar's fixed positioning relative to this frame. -->
<div
	class="relative h-[460px] w-full overflow-hidden rounded-xl border border-border [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full"
>
	<Sidebar.Provider class="h-full min-h-0">
		<Sidebar.Root collapsible="icon">
			<Sidebar.Header>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton size="lg" tooltipContent="stockbreak">
							<IconPlaceholder
								lucide="HomeIcon"
								tabler="IconHome"
								hugeicons="HomeIcon"
								phosphor="HouseIcon"
								remixicon="RiHomeLine"
							/>
							<span class="font-semibold">stockbreak</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each platform as item (item.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={item.active} tooltipContent={item.title}>
										{@render icon(item.icon)}
										<span>{item.title}</span>
									</Sidebar.MenuButton>
									{#if item.badge}
										<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
									{/if}
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
				<Sidebar.Group>
					<Sidebar.GroupLabel>You</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton tooltipContent="Create index">
									<IconPlaceholder
										lucide="PlusIcon"
										tabler="IconPlus"
										hugeicons="PlusSignIcon"
										phosphor="PlusIcon"
										remixicon="RiAddLine"
									/>
									<span>Create index</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton tooltipContent="Portfolio">
									<IconPlaceholder
										lucide="BriefcaseIcon"
										tabler="IconBriefcase"
										hugeicons="Briefcase01Icon"
										phosphor="BriefcaseIcon"
										remixicon="RiBriefcaseLine"
									/>
									<span>Portfolio</span>
								</Sidebar.MenuButton>
								<Sidebar.MenuSub>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href="#positions">Positions</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href="#created">Created</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								</Sidebar.MenuSub>
							</Sidebar.MenuItem>
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>
				<span class="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
					Dewi Lestari
				</span>
			</Sidebar.Footer>
			<Sidebar.Rail />
		</Sidebar.Root>
		<Sidebar.Inset>
			<header class="flex h-12 items-center gap-2 border-b border-border px-3">
				<Sidebar.Trigger />
				<Separator orientation="vertical" class="h-4" />
				<span class="text-sm text-muted-foreground">Dashboard</span>
			</header>
			<div class="flex-1 p-4 text-sm text-muted-foreground">
				Toggle with the button or Cmd/Ctrl+B.
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
