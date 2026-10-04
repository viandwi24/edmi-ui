<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";
	import * as Item from "@edmi-svelte/ui/item";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { type ArtifactType, banner, groups, menu, tabs, tiles } from "./data";

	const tone: Record<ArtifactType, string> = {
		docs: "bg-[color-mix(in_srgb,var(--chart-2)_14%,var(--card))] text-chart-2",
		slides: "bg-[color-mix(in_srgb,var(--chart-3)_14%,var(--card))] text-chart-3",
		design: "bg-[color-mix(in_srgb,var(--chart-4)_14%,var(--card))] text-chart-4",
	};

	let tab = $state("all");
	let bannerOpen = $state(true);
	const visible = $derived(
		groups
			.map((g) => ({
				...g,
				items: g.items.filter((i) => tab === "all" || (tab === "shared" ? i.shared : !i.shared)),
			}))
			.filter((g) => g.items.length > 0),
	);
</script>

<ElevationProvider mode="layered">
{#snippet typeIcon(type: ArtifactType, cls: string)}
	{#if type === "docs"}
		<IconPlaceholder
			lucide="FileTextIcon"
			tabler="IconFileDescription"
			hugeicons="File01Icon"
			phosphor="FileTextIcon"
			remixicon="RiFileTextLine"
			class={cls}
		/>
	{:else if type === "slides"}
		<IconPlaceholder
			lucide="AppWindowIcon"
			tabler="IconAppWindow"
			hugeicons="BrowserIcon"
			phosphor="AppWindowIcon"
			remixicon="RiWindowLine"
			class={cls}
		/>
	{:else}
		<IconPlaceholder
			lucide="PaletteIcon"
			tabler="IconPalette"
			hugeicons="PaintBoardIcon"
			phosphor="PaletteIcon"
			remixicon="RiPaletteLine"
			class={cls}
		/>
	{/if}
{/snippet}

<div class="min-h-svh bg-background text-foreground">
	<div class="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
		<h1 class="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">Library</h1>

		<div class="mt-[18px] flex flex-wrap items-center justify-between gap-2">
			<Tabs.Root bind:value={tab}>
				<Tabs.List variant="pills">
					{#each tabs as t (t.value)}
						<Tabs.Trigger value={t.value}>{t.label}</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
			<div class="flex items-center gap-1">
				<Button aria-label="Search" size="icon-sm" type="button" variant="ghost">
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
						class="size-4"
					/>
				</Button>
				<Button aria-label="Grid view" size="icon-sm" type="button" variant="ghost">
					<IconPlaceholder
						lucide="LayoutGridIcon"
						tabler="IconLayoutGrid"
						hugeicons="GridViewIcon"
						phosphor="GridFourIcon"
						remixicon="RiLayoutGridLine"
						class="size-4"
					/>
				</Button>
				<Button size="sm" type="button" variant="secondary">
					Edmi Design
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
					/>
				</Button>
			</div>
		</div>

		{#if bannerOpen}
			<Card class="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
				<div>
					<div class="text-sm font-semibold">{banner.title}</div>
					<div class="mt-0.5 text-[13.5px] text-muted-foreground">{banner.text}</div>
					<Button class="mt-2.5" size="sm" type="button" variant="secondary">
						{banner.action}
						<IconPlaceholder
							lucide="ArrowUpRightIcon"
							tabler="IconArrowUpRight"
							hugeicons="ArrowUpRight01Icon"
							phosphor="ArrowUpRightIcon"
							remixicon="RiArrowRightUpLine"
						/>
					</Button>
				</div>
				<Button
					aria-label="Dismiss"
					size="icon-sm"
					type="button"
					variant="ghost"
					onclick={() => (bannerOpen = false)}
				>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
						class="size-4"
					/>
				</Button>
			</Card>
		{/if}

		<div class="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">Make something new</div>
		<div class="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
			{#each tiles as t (t.type)}
				<div class="flex flex-col gap-2">
					<div
						class="flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border {tone[
							t.type
						]}"
					>
						{@render typeIcon(t.type, "size-6")}
					</div>
					<div class="flex items-center gap-1.5 text-sm">
						{t.label}
						<Badge variant="secondary" class="h-[18px] text-[10.5px]">Beta</Badge>
					</div>
				</div>
			{/each}
		</div>

		{#each visible as g (g.label)}
			<section>
				<div class="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">{g.label}</div>
				<Item.Group>
					{#each g.items as i (i.id)}
						<Item.Root class="px-0 py-3">
							<span
								class="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] {tone[
									i.type
								]}"
							>
								{@render typeIcon(i.type, "size-[18px]")}
							</span>
							<Item.Content>
								<Item.Title class="text-[15px] font-normal">{i.title}</Item.Title>
								{#if i.note}<Item.Description>{i.note}</Item.Description>{/if}
							</Item.Content>
							<Item.Actions>
								<span class="flex items-center gap-1.5 text-[13px] text-muted-foreground">
									<IconPlaceholder
										lucide="LockIcon"
										tabler="IconLock"
										hugeicons="SquareLock02Icon"
										phosphor="LockKeyIcon"
										remixicon="RiLockLine"
										class="size-3.5"
									/>
									<span class="max-sm:hidden">{i.viewed}</span>
								</span>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										{#snippet child({ props })}
											<Button
												{...props}
												aria-label="More"
												size="icon-sm"
												type="button"
												variant="ghost"
											>
												<IconPlaceholder
													lucide="MoreHorizontalIcon"
													tabler="IconDots"
													hugeicons="MoreHorizontalCircle01Icon"
													phosphor="DotsThreeOutlineIcon"
													remixicon="RiMoreLine"
													class="size-4 rotate-90"
												/>
											</Button>
										{/snippet}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										{#each menu as m (m)}
											<DropdownMenu.Item variant={m === "Delete" ? "destructive" : "default"}>
												{m}
											</DropdownMenu.Item>
										{/each}
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Item.Actions>
						</Item.Root>
					{/each}
				</Item.Group>
			</section>
		{/each}
	</div>
</div>
</ElevationProvider>
