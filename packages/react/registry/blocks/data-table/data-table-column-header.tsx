import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";
import type { DataTableFeatures } from "./data-table-features";

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<DataTableFeatures, TData, TValue>;
	title: string;
	/** ✦ Right-align the title (numeric columns, DESIGN §4 rule 10). */
	numeric?: boolean;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
	column,
	title,
	numeric,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return (
			<div className={cn(numeric && "text-right", className)}>{title}</div>
		);
	}

	const sorted = column.getIsSorted();

	return (
		<div
			className={cn(
				"flex items-center gap-2",
				numeric && "justify-end",
				className,
			)}
		>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant="ghost"
							size="xs"
							className={cn(
								"-ml-2 text-[12.5px] font-medium text-muted-foreground data-[popup-open]:bg-accent",
								numeric && "-mr-2 ml-0",
								sorted && "text-foreground",
							)}
						/>
					}
				>
					<span>{title}</span>
					{sorted === "desc" ? (
						<IconPlaceholder
							lucide="ArrowDownIcon"
							tabler="IconArrowDown"
							hugeicons="ArrowDownIcon"
							phosphor="ArrowDownIcon"
							remixicon="RiArrowDownLine"
						/>
					) : sorted === "asc" ? (
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
					) : (
						<IconPlaceholder
							lucide="ChevronsUpDownIcon"
							tabler="IconSelector"
							hugeicons="UnfoldMoreIcon"
							phosphor="CaretUpDownIcon"
							remixicon="RiArrowUpDownLine"
						/>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent align={numeric ? "end" : "start"}>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<IconPlaceholder
							lucide="ArrowDownIcon"
							tabler="IconArrowDown"
							hugeicons="ArrowDownIcon"
							phosphor="ArrowDownIcon"
							remixicon="RiArrowDownLine"
						/>
						Desc
					</DropdownMenuItem>
					{column.getCanHide() && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
								<IconPlaceholder
									lucide="EyeOffIcon"
									tabler="IconEyeClosed"
									hugeicons="ViewOffIcon"
									phosphor="EyeSlashIcon"
									remixicon="RiEyeOffLine"
								/>
								Hide
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
