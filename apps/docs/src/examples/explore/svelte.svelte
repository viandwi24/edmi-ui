<script lang="ts">
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Card } from "@edmi-svelte/ui/card";
	import { IndexRow, IndexRowHeader } from "@edmi-svelte/ui/index-row";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupInput,
	} from "@edmi-svelte/ui/input-group";
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "@edmi-svelte/ui/select";
	import { Table, TableBody, TableHeader } from "@edmi-svelte/ui/table";
	import { Toggle } from "@edmi-svelte/ui/toggle";
	import { ToggleGroup, ToggleGroupItem } from "@edmi-svelte/ui/toggle-group";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { indexes, kinds, nav, sorts, strategies } from "./data";

	let query = $state("");
	let kind = $state("all");
	let preIpo = $state(false);
	let strategy = $state("any");
	let sort = $state("aum");

	const rows = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return indexes.filter(
			(i) =>
				(kind === "all" || i.kind === kind) &&
				(!preIpo || i.tags?.some((tag) => tag.startsWith("Pre-IPO"))) &&
				(!q || `${i.name} ${i.symbol}`.toLowerCase().includes(q)),
		);
	});
</script>

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#explore"
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Explore</h1>
				<Badge variant="secondary">Simulated</Badge>
			</div>
			<p class="mt-1 text-lg text-muted-foreground">34 indexes</p>
		</div>

		<div class="flex flex-wrap items-center gap-3">
			<InputGroup class="h-10 basis-full sm:flex-1 sm:basis-0 sm:max-w-[440px] sm:min-w-64">
				<InputGroupAddon>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
					/>
				</InputGroupAddon>
				<InputGroupInput bind:value={query} placeholder="Search name, symbol, asset" aria-label="Search indexes" />
			</InputGroup>
			<ToggleGroup type="single" elevation="raised" variant="segmented" value={kind} onValueChange={(v) => v && (kind = v)}>
				{#each kinds as k (k.value)}
					<ToggleGroupItem value={k.value}>{k.label}</ToggleGroupItem>
				{/each}
			</ToggleGroup>
			<Toggle elevation="raised" variant="outline" bind:pressed={preIpo}>Pre-IPO</Toggle>
			<div class="flex items-center gap-3 sm:ml-auto">
				<Select type="single" bind:value={strategy}>
					<SelectTrigger elevation="raised" class="w-40">{strategies.find((s) => s.value === strategy)?.label}</SelectTrigger>
					<SelectContent>
						{#each strategies as s (s.value)}
							<SelectItem value={s.value} label={s.label} />
						{/each}
					</SelectContent>
				</Select>
				<Select type="single" bind:value={sort}>
					<SelectTrigger elevation="raised" class="w-28">{sorts.find((s) => s.value === sort)?.label}</SelectTrigger>
					<SelectContent>
						{#each sorts as s (s.value)}
							<SelectItem value={s.value} label={s.label} />
						{/each}
					</SelectContent>
				</Select>
			</div>
		</div>

		<Card elevation="raised" class="px-6 py-2">
			<Table>
				<TableHeader>
					<IndexRowHeader />
				</TableHeader>
				<TableBody>
					{#each rows as index (index.symbol)}
						<IndexRow {index} />
					{/each}
				</TableBody>
			</Table>
		</Card>
	</div>
</div>
