import type { Column, RowData } from "@tanstack/react-table";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
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

interface DataTableFacetedFilterProps<TData extends RowData, TValue> {
	column?: Column<DataTableFeatures, TData, TValue>;
	title: string;
	/** Defaults to the unique values found in the column. */
	options?: { label: string; value: string }[];
	/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
	elevation?: Elevation;
}

/**
 * ✦ Dashed "+ Status" filter button with a checkbox menu. The column must set
 * `filterFn: "arrHas"`.
 */
export function DataTableFacetedFilter<TData extends RowData, TValue>({
	column,
	title,
	options,
	elevation,
}: DataTableFacetedFilterProps<TData, TValue>) {
	if (!column) return null;

	const facets = column.getFacetedUniqueValues();
	const items =
		options ??
		Array.from(facets.keys()).map((value) => ({
			label: String(value),
			value: String(value),
		}));
	const selected = new Set((column.getFilterValue() as string[]) ?? []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="outline"
						size="sm"
						elevation={elevation}
						className="border-dashed"
					/>
				}
			>
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
				{title}
				{selected.size > 0 && (
					<Badge variant="brand" shape="number">
						{selected.size}
					</Badge>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-48">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{title}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{items.map((option) => (
						<DropdownMenuCheckboxItem
							key={option.value}
							className="capitalize"
							checked={selected.has(option.value)}
							onCheckedChange={(checked) => {
								const next = new Set(selected);
								if (checked) next.add(option.value);
								else next.delete(option.value);
								column.setFilterValue(next.size ? Array.from(next) : undefined);
							}}
						>
							{option.label}
							<span className="ml-auto font-mono text-xs text-muted-foreground">
								{facets.get(option.value) ?? 0}
							</span>
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
