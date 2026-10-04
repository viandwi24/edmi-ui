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
import type { Elevation } from "@/registry/edmi/ui/elevation";
import type { DataTableFeatures } from "./data-table-features";

function columnLabel(column: {
	id: string;
	columnDef: { header?: unknown; meta?: unknown };
}) {
	const label = (column.columnDef.meta as { label?: string } | undefined)
		?.label;
	if (label) return label;
	const header = column.columnDef.header;
	return typeof header === "string" ? header : column.id;
}

export function DataTableViewOptions<TData extends RowData>({
	table,
	elevation,
}: {
	table: ReactTable<DataTableFeatures, TData>;
	/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
	elevation?: Elevation;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="outline"
						size="sm"
						elevation={elevation}
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
								key={columnLabel(column)}
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
