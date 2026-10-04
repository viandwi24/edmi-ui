import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/edmi/ui/breadcrumb";
import { Button } from "@/registry/edmi/ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/registry/edmi/ui/command";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/registry/edmi/ui/menubar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/registry/edmi/ui/navigation-menu";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/registry/edmi/ui/pagination";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/registry/edmi/ui/tabs";
import CommandDemo from "../../../../apps/docs/src/demos/react/command";
import SidebarDemo from "../../../../apps/docs/src/demos/react/sidebar";
import { RaisedSection } from "./_raised";

export default function NavigationPreview() {
	return (
		<div className="flex flex-col gap-8">
			{/* The docs demo's own frame classes live outside this app's Tailwind sources. */}
			<div className="[&>div]:relative [&>div]:h-[460px] [&>div]:w-full [&>div]:overflow-hidden [&>div]:rounded-xl [&>div]:border [&>div]:border-border [&>div]:[transform:translateZ(0)] [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:h-full">
				<SidebarDemo />
			</div>
			<div>
				<CommandDemo />
			</div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#a">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbEllipsis />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>MAG4</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#p" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#1">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#2" isActive>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#n" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<Command className="h-auto w-[380px] rounded-xl border border-border">
				<CommandInput placeholder="Search…" />
				<CommandList>
					<CommandGroup heading="Actions">
						<CommandItem>
							Create index <CommandShortcut>⌘N</CommandShortcut>
						</CommandItem>
						<CommandItem>Toggle theme</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
			<div className="flex h-56 items-start gap-6">
				<DropdownMenu defaultOpen modal={false}>
					<DropdownMenuTrigger render={<Button variant="outline" />}>
						Account
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-52">
						<DropdownMenuGroup>
							<DropdownMenuLabel>My account</DropdownMenuLabel>
							<DropdownMenuItem>
								Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuCheckboxItem checked>
								Top AUM
							</DropdownMenuCheckboxItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value="newest">
							<DropdownMenuRadioItem value="newest">
								Newest
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="aum">Top AUM</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>New</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Zoom in</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Product</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink href="#e">Explore</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="#d">Docs</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			{(["default", "line", "pills"] as const).map((variant) => (
				<Tabs key={variant} defaultValue="overview" className="w-[420px]">
					<TabsList variant={variant}>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
						<TabsTrigger value="holders">Holders</TabsTrigger>
						<TabsTrigger value="off" disabled>
							Disabled
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">Overview panel ({variant})</TabsContent>
					<TabsContent value="activity">Activity panel</TabsContent>
					<TabsContent value="holders">Holders panel</TabsContent>
				</Tabs>
			))}
			<Tabs defaultValue="a" orientation="vertical">
				<TabsList>
					<TabsTrigger value="a">Vertical A</TabsTrigger>
					<TabsTrigger value="b">Vertical B</TabsTrigger>
				</TabsList>
				<TabsContent value="a">Panel A</TabsContent>
				<TabsContent value="b">Panel B</TabsContent>
			</Tabs>
			<RaisedSection>
				<Pagination elevation="raised">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#p" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#2" isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#n" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
				<Menubar elevation="raised" className="w-fit">
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>New</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Zoom in</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				{(["default", "pills"] as const).map((variant) => (
					<Tabs key={variant} defaultValue="overview" className="w-[420px]">
						<TabsList variant={variant} elevation="raised">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
							<TabsTrigger value="holders">Holders</TabsTrigger>
						</TabsList>
						<TabsContent value="overview">Raised {variant}</TabsContent>
						<TabsContent value="activity">Activity panel</TabsContent>
						<TabsContent value="holders">Holders panel</TabsContent>
					</Tabs>
				))}
			</RaisedSection>
		</div>
	);
}
