// Phone/tablet main navigation: the five section links collapse into an Edmi dropdown menu.
import { Button } from "@edmi-react/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import { CaretDownIcon } from "@phosphor-icons/react";

export type NavItem = { label: string; href: string; active: boolean };

export default function MobileNav({ items }: { items: NavItem[] }) {
	const current = items.find((i) => i.active);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="sm" aria-label="Main menu">
						{current?.label ?? "Menu"}
						<CaretDownIcon className="size-3.5" />
					</Button>
				}
			/>
			<DropdownMenuContent align="start" className="min-w-48">
				{items.map((i) => (
					<DropdownMenuItem
						key={i.href}
						render={
							<a href={i.href} aria-current={i.active ? "page" : undefined} />
						}
						className={i.active ? "bg-accent text-foreground" : undefined}
					>
						{i.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
