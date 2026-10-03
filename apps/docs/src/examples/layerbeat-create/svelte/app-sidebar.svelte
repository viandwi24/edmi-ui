<script lang="ts">
	import * as Sidebar from "@edmi-svelte/ui/sidebar";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import LogoMark from "./logo-mark.svelte";

	type NavItem = { label: string; icon: string; active?: boolean; badge?: string };
	let { platform, workspace }: { platform: readonly NavItem[]; workspace: readonly NavItem[] } = $props();

	const icons: Record<string, Record<string, string>> = {
		home: { lucide: "HouseIcon", tabler: "IconHome", hugeicons: "Home01Icon", phosphor: "HouseIcon", remixicon: "RiHomeLine" },
		server: { lucide: "ServerIcon", tabler: "IconServer", hugeicons: "ServerStackIcon", phosphor: "HardDrivesIcon", remixicon: "RiHardDriveLine" },
		billing: { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine" },
		key: { lucide: "KeyIcon", tabler: "IconKey", hugeicons: "Key01Icon", phosphor: "KeyIcon", remixicon: "RiKeyLine" },
		team: { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersThreeIcon", remixicon: "RiGroupLine" },
	};
	const groups = $derived([
		{ label: "Platform", items: platform },
		{ label: "Workspace", items: workspace },
	]);
</script>

<Sidebar.Root collapsible="offcanvas">
	<!-- The sidebar subtree carries its own `dark` class: it stays navy in light mode (scoped theming). -->
	<div class="dark flex h-full w-full flex-col bg-[#0b2a6f] text-sidebar-foreground">
		<Sidebar.Header class="flex-row items-center justify-between px-4 pt-5 pb-3">
			<a href="#/" class="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px] text-white">
				<LogoMark class="size-6" />
				Layerbeat
			</a>
			<Sidebar.Trigger class="text-muted-foreground hover:bg-[color-mix(in_srgb,white_10%,#0b2a6f)] hover:text-foreground" />
		</Sidebar.Header>
		<Sidebar.Content class="px-2">
			{#each groups as group (group.label)}
				<Sidebar.Group>
					<Sidebar.GroupLabel class="text-[11.5px] tracking-[0.6px] uppercase">{group.label}</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each group.items as item (item.label)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton
										isActive={item.active}
										class="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)] data-[active=true]:bg-[color-mix(in_srgb,white_9%,#0b2a6f)] data-[active=true]:text-foreground data-[active=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,#0b2a6f)]"
									>
										{#snippet child({ props })}
											<a href="#/" {...props}>
												<IconPlaceholder {...icons[item.icon]} />
												<span>{item.label}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
									{#if item.badge}
										<Sidebar.MenuBadge class="rounded-md border border-border bg-secondary text-secondary-foreground">{item.badge}</Sidebar.MenuBadge>
									{/if}
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/each}
		</Sidebar.Content>
		<Sidebar.Footer class="px-2 pb-4">
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton class="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)]">
						{#snippet child({ props })}
							<a href="#/api" {...props}>
								<IconPlaceholder
									lucide="FileTextIcon"
									tabler="IconFileDescription"
									hugeicons="File01Icon"
									phosphor="FileTextIcon"
									remixicon="RiFileTextLine"
								/>
								<span class="flex-1">API documentation</span>
								<IconPlaceholder
									lucide="ArrowUpRightIcon"
									tabler="IconArrowUpRight"
									hugeicons="ArrowUpRightIcon"
									phosphor="ArrowUpRightIcon"
									remixicon="RiArrowRightUpLine"
									class="size-3.5!"
								/>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Footer>
	</div>
</Sidebar.Root>
