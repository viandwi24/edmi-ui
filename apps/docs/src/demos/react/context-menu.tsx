import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@edmi-react/ui/context-menu";

export default function Demo() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-40 w-72 select-none items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
				Right-click an index row
			</ContextMenuTrigger>
			<ContextMenuContent className="w-52">
				<ContextMenuGroup>
					<ContextMenuItem>Open</ContextMenuItem>
					<ContextMenuItem>
						Copy address <ContextMenuShortcut>⌘C</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<ContextMenuItem>Copy link</ContextMenuItem>
						<ContextMenuItem>Share card</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">Hide index</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
