<script lang="ts">
	import { cn } from "#lib/utils.js";
	import ArrowUpIcon from 'phosphor-svelte/lib/ArrowUp';
	import ArrowDownIcon from 'phosphor-svelte/lib/ArrowDown';
	import CaretUpDownIcon from 'phosphor-svelte/lib/CaretUpDown';
	import EyeSlashIcon from 'phosphor-svelte/lib/EyeSlash';
	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";

	let {
		column,
		title,
		numeric = false,
		class: className,
	}: {
		/** Any TanStack `Column`; typed structurally so `renderComponent(DataTableColumnHeader, { column })` needs no generics. */
		column: {
			getCanSort: () => boolean;
			getCanHide: () => boolean;
			getIsSorted: () => false | "asc" | "desc";
			toggleSorting: (desc?: boolean) => void;
			toggleVisibility: (value?: boolean) => void;
		};
		title: string;
		/** ✦ Right-align the title (numeric columns, DESIGN §4 rule 10). */
		numeric?: boolean;
		class?: string;
	} = $props();

	const sorted = $derived(column.getIsSorted());
</script>

{#snippet ArrowUp()}
	<ArrowUpIcon  />
{/snippet}

{#snippet ArrowDown()}
	<ArrowDownIcon  />
{/snippet}

{#if !column.getCanSort()}
	<div class={cn(numeric && "text-right", className)}>{title}</div>
{:else}
	<div class={cn("flex items-center gap-2", numeric && "justify-end", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="ghost"
						size="xs"
						class={cn(
							"-ml-2 text-[12.5px] font-medium text-muted-foreground data-[state=open]:bg-accent",
							numeric && "-mr-2 ml-0",
							sorted && "text-foreground"
						)}
					>
						<span>{title}</span>
						{#if sorted === "desc"}
							{@render ArrowDown()}
						{:else if sorted === "asc"}
							{@render ArrowUp()}
						{:else}
							<CaretUpDownIcon  />
						{/if}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align={numeric ? "end" : "start"}>
				<DropdownMenu.Item onclick={() => column.toggleSorting(false)}>
					{@render ArrowUp()}
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => column.toggleSorting(true)}>
					{@render ArrowDown()}
					Desc
				</DropdownMenu.Item>
				{#if column.getCanHide()}
					<DropdownMenu.Separator />
					<DropdownMenu.Item onclick={() => column.toggleVisibility(false)}>
						<EyeSlashIcon  />
						Hide
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/if}
