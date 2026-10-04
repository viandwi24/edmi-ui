<script lang="ts" generics="TData extends RowData, TValue">
	import type { Column, RowData } from "@tanstack/svelte-table";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import type { DataTableFeatures } from "./data-table-features.js";

	/**
	 * ✦ Dashed "+ Status" filter button with a checkbox menu. The column must set
	 * `filterFn: "arrHas"`.
	 */
	let {
		column,
		title,
		options,
		elevation = "auto",
	}: {
		column?: Column<DataTableFeatures, TData, TValue>;
		title: string;
		/** Defaults to the unique values found in the column. */
		options?: { label: string; value: string }[];
		/** ✦ depth of the toolbar and pagination controls (the table container stays flat). */
		elevation?: Elevation;
	} = $props();

	const facets = $derived(column?.getFacetedUniqueValues());
	const items = $derived(
		options ??
			Array.from(facets?.keys() ?? []).map((value) => ({
				label: String(value),
				value: String(value),
			}))
	);
	const selected = $derived(new Set((column?.getFilterValue() as string[] | undefined) ?? []));

	function toggle(value: string, checked: boolean) {
		const next = new Set(selected);
		if (checked) next.add(value);
		else next.delete(value);
		column?.setFilterValue(next.size ? Array.from(next) : undefined);
	}
</script>

{#if column}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="sm" {elevation} class="border-dashed">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
					/>
					{title}
					{#if selected.size > 0}
						<Badge variant="brand" shape="number">{selected.size}</Badge>
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start" class="w-48">
			<DropdownMenu.Group>
				<DropdownMenu.Label>{title}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				{#each items as option (option.value)}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						checked={selected.has(option.value)}
						onCheckedChange={(checked) => toggle(option.value, !!checked)}
					>
						{option.label}
						<span class="ml-auto font-mono text-xs text-muted-foreground">
							{facets?.get(option.value) ?? 0}
						</span>
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
