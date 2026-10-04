import { Button } from "@edmi-react/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";

const levels = [
	{ value: "flat", label: "Flat" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-wrap gap-3">
			{levels.map(({ value, label }) => (
				<DropdownMenu key={value}>
					<DropdownMenuTrigger render={<Button variant="outline" />}>
						{label}
					</DropdownMenuTrigger>
					<DropdownMenuContent elevation={value} className="w-52">
						<DropdownMenuGroup>
							<DropdownMenuLabel>My account</DropdownMenuLabel>
							<DropdownMenuItem>
								Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>Wallets</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			))}
		</div>
	);
}
