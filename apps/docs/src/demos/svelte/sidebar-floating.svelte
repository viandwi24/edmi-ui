<script lang="ts">
	import * as Sidebar from "@edmi-svelte/ui/sidebar";
</script>

<div
	class="relative h-[320px] w-full overflow-hidden rounded-xl border border-border bg-muted [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full"
>
	<Sidebar.Provider class="h-full min-h-0">
		<Sidebar.Root variant="floating" collapsible="none">
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive>Profile</Sidebar.MenuButton>
						</Sidebar.MenuItem>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>Wallets</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar.Root>
		<Sidebar.Inset class="p-4 text-sm text-muted-foreground">
			Floating variant, not collapsible.
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
