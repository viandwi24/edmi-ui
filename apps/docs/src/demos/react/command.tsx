import { Button } from "@edmi-react/ui/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@edmi-react/ui/command";
import { Kbd } from "@edmi-react/ui/kbd";
import { useEffect, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	return (
		<div className="flex flex-col items-start gap-4">
			<Command className="w-[420px] rounded-xl border border-border">
				<CommandInput placeholder="Search indexes and actions…" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Indexes">
						<CommandItem>MAG4 · Magnificent Four</CommandItem>
						<CommandItem>MAG7 · equal weight</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Actions">
						<CommandItem>
							<IconPlaceholder
								lucide="PlusIcon"
								tabler="IconPlus"
								hugeicons="PlusSignIcon"
								phosphor="PlusIcon"
								remixicon="RiAddLine"
							/>{" "}
							Create index <CommandShortcut>⌘N</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<IconPlaceholder
								lucide="SparklesIcon"
								tabler="IconSparkles"
								hugeicons="SparklesIcon"
								phosphor="SparkleIcon"
								remixicon="RiSparklingLine"
							/>{" "}
							Ask agent <CommandShortcut>⌘J</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open palette <Kbd>⌘K</Kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command…" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Actions">
						<CommandItem onSelect={() => setOpen(false)}>
							Create index
						</CommandItem>
						<CommandItem onSelect={() => setOpen(false)}>
							Toggle theme
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
