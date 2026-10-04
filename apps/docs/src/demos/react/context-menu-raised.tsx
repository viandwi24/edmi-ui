import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@edmi-react/ui/context-menu";

const levels = [
	{ value: "flat", label: "Flat" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-wrap gap-3">
			{levels.map(({ value, label }) => (
				<ContextMenu key={value}>
					<ContextMenuTrigger className="flex h-28 w-48 select-none items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
						Right-click: {label}
					</ContextMenuTrigger>
					<ContextMenuContent elevation={value} className="w-52">
						<ContextMenuGroup>
							<ContextMenuItem>Open</ContextMenuItem>
							<ContextMenuItem>
								Copy address <ContextMenuShortcut>⌘C</ContextMenuShortcut>
							</ContextMenuItem>
						</ContextMenuGroup>
						<ContextMenuSeparator />
						<ContextMenuItem variant="destructive">Hide index</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			))}
		</div>
	);
}
