import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@edmi-react/ui/navigation-menu";

export default function Demo() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Product</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[320px] gap-1">
							<li>
								<NavigationMenuLink
									href="#explore"
									className="flex-col items-start gap-0"
								>
									<span className="font-medium">Explore</span>
									<span className="text-xs text-muted-foreground">
										Browse every live index.
									</span>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink
									href="#create"
									className="flex-col items-start gap-0"
								>
									<span className="font-medium">Create index</span>
									<span className="text-xs text-muted-foreground">
										Pick tokens, set weights.
									</span>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="#docs" className="h-9 px-3 font-medium">
						Docs
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
