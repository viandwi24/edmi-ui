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

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
] as const;

function Bar({ elevation }: { elevation: "flat" | "raised" }) {
	return (
		<Menubar elevation={elevation}>
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

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Bar elevation={value} />
				</div>
			))}
		</div>
	);
}
