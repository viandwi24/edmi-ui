import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import { Avatar, AvatarFallback } from "@edmi-react/ui/avatar";
import { Button } from "@edmi-react/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@edmi-react/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@edmi-react/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import { Input } from "@edmi-react/ui/input";
import { Kbd, KbdGroup } from "@edmi-react/ui/kbd";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@edmi-react/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@edmi-react/ui/tooltip";
import { useState } from "react";
import {
	depts,
	org,
	orgMenu,
	paletteCommands,
	paletteDepartments,
	palettePlaceholder,
	paletteWorkspaces,
	roadmapStages,
	shortcutList,
} from "../data";
import { Icon } from "./icons";

const keys = (list: string[]) => (
	<KbdGroup>
		{list.map((k) => (
			<Kbd key={k}>{k}</Kbd>
		))}
	</KbdGroup>
);

export function OrgMenu({ onShortcuts }: { onShortcuts: () => void }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
				<Avatar size="sm">
					<AvatarFallback>{org.initials}</AvatarFallback>
				</Avatar>
				{org.name}
				<Icon name="chevronDown" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" elevation="floating">
				{orgMenu.map((group, i) => (
					<div key={group[0].id}>
						{i > 0 && <DropdownMenuSeparator />}
						<DropdownMenuGroup>
							{group.map((item) => (
								<DropdownMenuItem
									key={item.id}
									onClick={item.id === "shortcuts" ? onShortcuts : undefined}
								>
									<Icon name={item.icon} />
									{item.label}
									{item.keys && (
										<DropdownMenuShortcut>
											{keys(item.keys)}
										</DropdownMenuShortcut>
									)}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function SearchPalette({
	open,
	onOpenChange,
	onNewTask,
	onRoadmap,
	onDepartment,
}: {
	open: boolean;
	onOpenChange: (o: boolean) => void;
	onNewTask: () => void;
	onRoadmap: () => void;
	onDepartment: (id: string) => void;
}) {
	const run = (fn?: () => void) => {
		onOpenChange(false);
		fn?.();
	};
	return (
		<CommandDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Search"
			description="Search the workspace"
		>
			<CommandInput placeholder={palettePlaceholder} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Commands">
					{paletteCommands.map((c) => (
						<CommandItem
							key={c.id}
							value={c.label}
							onSelect={() =>
								run(
									c.id === "create-task"
										? onNewTask
										: c.id === "roadmap"
											? onRoadmap
											: undefined,
								)
							}
						>
							<Icon name={c.icon} />
							{c.label}
							<CommandShortcut>{keys(c.keys)}</CommandShortcut>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading="Departments">
					{paletteDepartments.map((id) => {
						const d = depts.find((x) => x.id === id);
						if (!d) return null;
						return (
							<CommandItem
								key={id}
								value={d.label}
								onSelect={() => run(() => onDepartment(id))}
							>
								<AgentAvatar seed={id} color={d.color} size={16} tile={false} />
								{d.label}
							</CommandItem>
						);
					})}
				</CommandGroup>
				<CommandGroup heading="Workspaces">
					{paletteWorkspaces.map((w) => (
						<CommandItem key={w} value={w} onSelect={() => run()}>
							<Icon name="globe" />
							{w}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
			<div className="flex items-center justify-end gap-4 border-t border-border px-3 py-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<Kbd>↵</Kbd> Select
				</span>
				<span className="flex items-center gap-1.5">
					<Kbd>↑↓</Kbd> Navigate
				</span>
				<span className="flex items-center gap-1.5">
					<Kbd>Esc</Kbd> Close
				</span>
			</div>
		</CommandDialog>
	);
}

export function NotificationsPopover() {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						size="icon-lg"
						elevation="raised"
						aria-label="Notifications"
						className="absolute bottom-4 left-4"
					/>
				}
			>
				<Icon name="bell" />
			</PopoverTrigger>
			<PopoverContent side="top" align="start" className="w-80">
				<PopoverHeader className="flex-row items-center justify-between">
					<PopoverTitle>Notifications</PopoverTitle>
					<Button variant="outline" size="xs">
						Desktop alerts
					</Button>
				</PopoverHeader>
				<div className="py-6 text-center text-sm text-muted-foreground">
					All caught up!
				</div>
			</PopoverContent>
		</Popover>
	);
}

export function RoadmapPopover() {
	return (
		<Popover>
			<PopoverTrigger
				render={<Button variant="ghost" size="icon-xs" aria-label="Map" />}
			>
				<Icon name="map" />
			</PopoverTrigger>
			<PopoverContent align="end" className="w-72">
				<PopoverHeader>
					<PopoverTitle>Roadmap</PopoverTitle>
				</PopoverHeader>
				<ol className="flex flex-col gap-3">
					{roadmapStages.map((s, i) => (
						<li key={s.title} className="flex gap-3">
							<span className="font-mono text-xs text-muted-foreground">
								{i + 1}
							</span>
							<div>
								<div className="text-sm font-medium">{s.title}</div>
								<div className="text-xs text-muted-foreground">{s.note}</div>
							</div>
						</li>
					))}
				</ol>
			</PopoverContent>
		</Popover>
	);
}

export function ThemeTip() {
	return (
		<Tooltip>
			<TooltipTrigger
				render={<Button variant="ghost" size="icon-xs" aria-label="Theme" />}
			>
				<Icon name="sun" />
			</TooltipTrigger>
			<TooltipContent>Theme follows the viewer</TooltipContent>
		</Tooltip>
	);
}

export function ShortcutsDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (o: boolean) => void;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Keyboard shortcuts</DialogTitle>
					<DialogDescription>Move around without the mouse.</DialogDescription>
				</DialogHeader>
				<ul className="flex flex-col gap-2">
					{shortcutList.map((s) => (
						<li
							key={s.label}
							className="flex items-center justify-between text-sm"
						>
							{s.label}
							{keys(s.keys)}
						</li>
					))}
				</ul>
			</DialogContent>
		</Dialog>
	);
}

export function NewTaskDialog({
	open,
	onOpenChange,
	onCreate,
}: {
	open: boolean;
	onOpenChange: (o: boolean) => void;
	onCreate: (name: string) => void;
}) {
	const [name, setName] = useState("");
	const submit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const v = name.trim();
		if (!v) return;
		onCreate(v);
		setName("");
		onOpenChange(false);
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form onSubmit={submit} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>New task</DialogTitle>
						<DialogDescription>
							Describe the work and the right agent picks it up.
						</DialogDescription>
					</DialogHeader>
					<Input
						autoFocus
						placeholder="Task title"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!name.trim()}>
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
