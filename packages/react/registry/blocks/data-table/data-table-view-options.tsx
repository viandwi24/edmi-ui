import type { ReactTable, RowData } from "@tanstack/react-table";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";
import type { DataTableFeatures } from "./data-table-features";

export function DataTableViewOptions<TData extends RowData>({
	table,
	raised = false,
}: {
	table: ReactTable<DataTableFeatures, TData>;
	raised?: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="outline"
						size="sm"
						raised={raised}
						className="ml-auto"
					/>
				}
			>
				<IconPlaceholder
					lucide="Columns3Icon"
					tabler="IconLayoutColumns"
					hugeicons="LeftToRightListBulletIcon"
					phosphor="ColumnsIcon"
					remixicon="RiLayoutColumnLine"
				/>
				Columns
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide(),
						)
						.map((column) => (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
