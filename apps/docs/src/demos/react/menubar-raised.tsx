import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@edmi-react/ui/menubar";

export default function Demo() {
	return (
		<Menubar raised>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							New index <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>Open…</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarItem variant="destructive">Discard draft</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarCheckboxItem defaultChecked>
							Show sidebar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem>Show grid</MenubarCheckboxItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarItem>
						Zoom in <MenubarShortcut>⌘+</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Zoom out <MenubarShortcut>⌘-</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Help</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Docs</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
