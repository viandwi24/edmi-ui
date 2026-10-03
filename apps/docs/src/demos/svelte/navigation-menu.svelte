<script lang="ts">
	import * as NavigationMenu from "@edmi-svelte/ui/navigation-menu";
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[320px] gap-1">
					<li>
						<NavigationMenu.Link href="#explore" class="flex-col items-start gap-0">
							<span class="font-medium">Explore</span>
							<span class="text-xs text-muted-foreground">Browse every live index.</span>
						</NavigationMenu.Link>
					</li>
					<li>
						<NavigationMenu.Link href="#create" class="flex-col items-start gap-0">
							<span class="font-medium">Create index</span>
							<span class="text-xs text-muted-foreground">Pick tokens, set weights.</span>
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Link href="#docs" class="h-9 px-3 font-medium">Docs</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
