<script lang="ts">
	import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";
	import CreditCard from "phosphor-svelte/lib/CreditCard";
	import FileText from "phosphor-svelte/lib/FileText";
	import HardDrives from "phosphor-svelte/lib/HardDrives";
	import House from "phosphor-svelte/lib/House";
	import Key from "phosphor-svelte/lib/Key";
	import UsersThree from "phosphor-svelte/lib/UsersThree";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import LayerbeatMark from "../layerbeat-mark.svelte";

	const platform = [
		{ label: "Overview", icon: House },
		{ label: "BeatVPS", icon: HardDrives, active: true, count: 1 },
		{ label: "Billing", icon: CreditCard },
	];
	const workspace = [
		{ label: "Access & keys", icon: Key },
		{ label: "Team", icon: UsersThree },
	];
</script>

<!-- Always-dark navy sidebar: a scoped `.dark` on the sidebar subtree re-themes it inside a light app (DESIGN §3).
     `className` lands on the desktop container and on the mobile sheet content. -->
<Sidebar.Root
	class="dark border-0 bg-[#0b2a6f] text-sidebar-foreground *:data-[slot=sidebar-inner]:bg-transparent"
>
	<Sidebar.Header class="flex-row items-center justify-between px-3 pt-[18px] pb-3">
		<a href="/" class="flex items-center gap-2 pl-1.5 font-brand text-xl font-semibold tracking-[-0.4px] text-white">
			<LayerbeatMark size={24} />
			Layerbeat
		</a>
		<Sidebar.Trigger class="text-muted-foreground" aria-label="Toggle sidebar" />
	</Sidebar.Header>
	<Sidebar.Content class="px-1.5">
		<Sidebar.Group>
			<Sidebar.GroupLabel class="tracking-[0.6px] uppercase">Platform</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each platform as item (item.label)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={item.active}
								class="h-9 data-[active=true]:bg-white/9 data-[active=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,transparent)]"
							>
								{#snippet child({ props })}
									<a href="#{item.label}" {...props}>
										<item.icon class="text-muted-foreground group-data-[active=true]/menu-button:text-foreground" />
										<span class="flex-1">{item.label}</span>
										{#if item.count}<Badge variant="secondary" shape="number" class="h-5">{item.count}</Badge>{/if}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="tracking-[0.6px] uppercase">Workspace</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each workspace as item (item.label)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="h-9">
								{#snippet child({ props })}
									<a href="#{item.label}" {...props}>
										<item.icon class="text-muted-foreground" />
										<span>{item.label}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="px-3 pb-[18px]">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="h-9">
					{#snippet child({ props })}
						<a href="#docs" {...props}>
							<FileText class="text-muted-foreground" />
							<span class="flex-1">API documentation</span>
							<ArrowUpRight class="size-3.5! text-muted-foreground" />
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
