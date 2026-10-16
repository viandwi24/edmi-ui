<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { InputGroup, InputGroupAddon, InputGroupInput } from "@edmi-svelte/ui/input-group";
	import * as Item from "@edmi-svelte/ui/item";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import { library } from "../data";
	import Icon from "./Icon.svelte";
	import Pixels from "./Pixels.svelte";

	let banner = $state(true);
	let view = $state("grid");
	const count = (n: number) => `${n} ${n === 1 ? "file" : "files"}`;
</script>

<div class="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4">
	<div class="flex items-center justify-between">
		<h2 class="flex items-center gap-2 text-lg font-medium">
			Library
			<Icon name="info" class="size-3.5 text-muted-foreground" />
		</h2>
		<div class="flex items-center gap-2">
			<Button type="button" variant="ghost" size="icon-xs" aria-label="Upload">
				<Icon name="upload" class="size-4" />
			</Button>
			<ToggleGroup.Root type="single" variant="segmented" value={view} onValueChange={(v) => v && (view = v)} aria-label="View">
				<ToggleGroup.Item value="grid" aria-label="Grid"><Icon name="grid" class="size-3.5" /></ToggleGroup.Item>
				<ToggleGroup.Item value="list" aria-label="List"><Icon name="list" class="size-3.5" /></ToggleGroup.Item>
			</ToggleGroup.Root>
		</div>
	</div>
	<InputGroup class="mt-3">
		<InputGroupAddon><Icon name="search" /></InputGroupAddon>
		<InputGroupInput placeholder="Search files" />
	</InputGroup>
	{#if banner}
		<Item.Root variant="muted" size="sm" class="mt-3 items-start">
			<Item.Media variant="icon"><Icon name="message" /></Item.Media>
			<Item.Content>
				<Item.Title>{library.banner.title}</Item.Title>
				<Item.Description class="line-clamp-none">{library.banner.body}</Item.Description>
				<div class="pt-2">
					<Button type="button" variant="outline" size="xs" elevation="raised">{library.banner.action}</Button>
				</div>
			</Item.Content>
			<Item.Actions>
				<Button type="button" variant="ghost" size="icon-xs" aria-label="Dismiss" onclick={() => (banner = false)}>
					<Icon name="close" class="size-3.5" />
				</Button>
			</Item.Actions>
		</Item.Root>
	{/if}
	{#if view === "grid"}
		<div class="mt-3 grid grid-cols-2 gap-3">
			{#each library.folders as f (f.id)}
				<Card class="gap-0 overflow-hidden py-0">
					<div class="aspect-[4/3] overflow-hidden border-b border-border">
						{#if f.kind === "scene" && f.rects}
							<Pixels w={80} h={60} rects={f.rects} class="size-full" />
						{:else}
							<div class="grid size-full grid-cols-2 gap-2 bg-muted p-2">
								{#each [0, 1, 2, 3] as n (n)}
									<div class="grid place-items-center rounded-md border border-border bg-card">
										{#if n === 1}<span class="h-4 w-3 rounded-[2px] bg-muted-foreground"></span>{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="px-3 py-2.5">
						<div class="text-[13px] font-medium">{f.name}</div>
						<div class="text-xs text-muted-foreground">{count(f.files)}</div>
					</div>
				</Card>
			{/each}
		</div>
	{:else}
		<Card class="mt-3 gap-0 py-0">
			{#each library.folders as f (f.id)}
				<Item.Root size="sm">
					<Item.Media variant="image">
						{#if f.kind === "scene" && f.rects}
							<Pixels w={80} h={60} rects={f.rects} class="size-full" />
						{:else}
							<div class="grid size-full grid-cols-2 gap-2 bg-muted p-2">
								{#each [0, 1, 2, 3] as n (n)}
									<div class="grid place-items-center rounded-md border border-border bg-card"></div>
								{/each}
							</div>
						{/if}
					</Item.Media>
					<Item.Content>
						<Item.Title>{f.name}</Item.Title>
						<Item.Description>{count(f.files)}</Item.Description>
					</Item.Content>
				</Item.Root>
			{/each}
		</Card>
	{/if}
</div>
