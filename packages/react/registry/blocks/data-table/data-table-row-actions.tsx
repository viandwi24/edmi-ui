import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

/**
 * ✦ Row actions trigger: ghost icon button + DropdownMenu. Pass
 * `DropdownMenuItem`s (or groups) as children.
 */
export function DataTableRowActions({
	children,
	label = "Open menu",
}: {
	children: React.ReactNode;
	label?: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
				<span className="sr-only">{label}</span>
				<IconPlaceholder
					lucide="MoreHorizontalIcon"
					tabler="IconDots"
					hugeicons="MoreHorizontalCircle01Icon"
					phosphor="DotsThreeOutlineIcon"
					remixicon="RiMoreLine"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
