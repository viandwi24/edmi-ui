<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import { Avatar, AvatarFallback } from "@edmi-svelte/ui/avatar";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as Command from "@edmi-svelte/ui/command";
	import * as Dialog from "@edmi-svelte/ui/dialog";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";
	import { Input } from "@edmi-svelte/ui/input";
	import { Kbd, KbdGroup } from "@edmi-svelte/ui/kbd";
	import * as Popover from "@edmi-svelte/ui/popover";
	import * as Tooltip from "@edmi-svelte/ui/tooltip";
	import {
		depts,
		org,
		orgMenu,
		paletteCommands,
		paletteDepartments,
		palettePlaceholder,
		paletteWorkspaces,
		plant,
		plantHead,
		RING,
		roadmapStages,
		shortcutList,
		TILE,
	} from "../data";
	import Icon from "./Icon.svelte";
	import Pixels from "./Pixels.svelte";

	let { onNewTask, onOpenPanel }: { onNewTask: (name: string) => void; onOpenPanel: () => void } = $props();

	const grid =
		"[background-image:linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:48px_48px]";

	let zoom = $state(100);
	let pan = $state({ x: 0, y: 0 });
	let dragging = $state(false);
	let drag: { id: number; x: number; y: number } | null = null;
	let hub = $state(true);
	let active = $state<string | null>(null);
	let palette = $state(false);
	let shortcuts = $state(false);
	let taskDialog = $state(false);
	let taskName = $state("");

	const pick = (id: string) => {
		active = active === id ? null : id;
	};
	const step = (d: number) => {
		zoom = Math.min(160, Math.max(60, zoom + d));
	};
	const reset = () => {
		zoom = 100;
		pan = { x: 0, y: 0 };
	};
	const down = (e: PointerEvent) => {
		const t = e.target as HTMLElement;
		if (!(e.currentTarget as HTMLElement).contains(t) || t.closest("button,[data-nopan]")) return;
		drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		dragging = true;
	};
	const move = (e: PointerEvent) => {
		if (!drag || drag.id !== e.pointerId) return;
		pan = { x: pan.x + e.clientX - drag.x, y: pan.y + e.clientY - drag.y };
		drag.x = e.clientX;
		drag.y = e.clientY;
	};
	const up = (e: PointerEvent) => {
		if (drag?.id !== e.pointerId) return;
		drag = null;
		dragging = false;
	};
	const onKey = (e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
			e.preventDefault();
			palette = !palette;
		}
	};
	const runCommand = (id: string) => {
		palette = false;
		if (id === "create-task") taskDialog = true;
	};
	const runDept = (id: string) => {
		palette = false;
		active = id;
	};
	const createTask = (e: SubmitEvent) => {
		e.preventDefault();
		const v = taskName.trim();
		if (!v) return;
		onNewTask(v);
		taskName = "";
		taskDialog = false;
	};
	const deptOf = (id: string) => depts.find((d) => d.id === id);
</script>

<svelte:window onkeydown={onKey} />

<Tooltip.Provider>
	<div
		class="absolute inset-0 touch-none overflow-hidden bg-card select-none {grid} {dragging ? 'cursor-grabbing' : 'cursor-grab'}"
		style:background-position="{pan.x}px {pan.y}px"
		role="presentation"
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={up}
	>
		<div
			class="absolute top-[46.5%] left-1/2 size-0 origin-top-left lg:left-[calc((100%-438px)*0.58)]"
			style:transform="translate({pan.x}px, {pan.y}px) scale({zoom / 100})"
		>
			<svg class="pointer-events-none absolute overflow-visible" width="1" height="1" aria-hidden="true">
				<circle r={RING} fill="none" stroke="var(--foreground)" stroke-opacity="0.12" stroke-width="1.5" />
				{#each depts as d (d.id)}
					<line x1="0" y1="0" x2={d.node[0]} y2={d.node[1]} stroke="var(--foreground)" stroke-opacity="0.2" stroke-dasharray="4 4" />
				{/each}
				{#each depts as d (d.id)}
					<g>
						<path
							d={d.path}
							fill="none"
							stroke="var(--foreground)"
							stroke-opacity={active === d.id ? 0.9 : 0.35}
							stroke-width={active === d.id ? 1.5 : 1}
							stroke-dasharray="4 4"
						/>
						<circle cx={d.end[0]} cy={d.end[1]} r="3" fill="var(--border)" />
					</g>
				{/each}
			</svg>

			{#each depts as d (d.id)}
				<div>
					{#each d.thumbs as t (`${t.x}-${t.y}`)}
						<span
							class="pointer-events-none absolute overflow-hidden rounded-[3px] border border-border bg-muted"
							style:left="{t.x}px"
							style:top="{t.y}px"
							style:width="{TILE.w}px"
							style:height="{TILE.h}px"
						>
							<i class="absolute top-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-border"></i>
							<i class="absolute top-3.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-border"></i>
						</span>
					{/each}
					<Button
						type="button"
						variant={active === d.id ? "secondary" : "outline"}
						size="sm"
						aria-pressed={active === d.id}
						class="absolute"
						style="left:{d.plate.x}px;top:{d.plate.y}px;width:{d.plate.w}px;height:{d.grid ? 32 : d.plate.h}px"
						onclick={() => pick(d.id)}
					>
						{d.label}
					</Button>
					{#if d.grid}
						<span
							class="pointer-events-none absolute grid grid-cols-3 gap-px overflow-hidden p-0.5"
							style:left="{d.plate.x}px"
							style:top="{d.plate.y + 32}px"
							style:width="{d.plate.w}px"
							style:height="{d.plate.h - 32}px"
						>
							{#each [0, 1, 2, 3, 4, 5] as n (n)}
								<span class="relative overflow-hidden rounded-[3px] border border-border bg-muted">
									<i class="absolute top-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-border"></i>
								</span>
							{/each}
						</span>
					{/if}
				</div>
			{/each}

			<Pixels
				w={plant.w}
				h={plant.h}
				rects={plant.rects}
				class="pointer-events-none absolute top-[-78px] left-[-18px] w-9 opacity-80"
			/>
			<button
				type="button"
				aria-label="Atlas"
				aria-pressed={hub}
				class="absolute top-[-29px] left-[-49px] h-[58px] w-[98px] rounded-xl p-0.5 outline-none {hub ? 'ring-2 ring-ring' : ''}"
				onclick={() => (hub = !hub)}
			>
				<Card elevation={hub ? "floating" : "raised"} class="size-full items-center justify-center gap-0 py-0">
					<span class="font-serif text-[19px] leading-none tracking-tight">Atlas</span>
				</Card>
			</button>

			{#each depts as d (d.id)}
				<Button
					type="button"
					variant={active === d.id ? "secondary" : "outline"}
					size="icon-sm"
					elevation="raised"
					aria-label={d.label}
					class="absolute z-10 -translate-x-1/2 -translate-y-1/2"
					style="left:{d.node[0]}px;top:{d.node[1]}px"
					onclick={() => pick(d.id)}
				>
					<AgentAvatar seed={d.id} color={d.color} size={13} tile={false} />
				</Button>
			{/each}
		</div>

		<div class="absolute top-4 left-4 flex items-center gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" size="sm" {...props}>
							<Avatar size="sm">
								<AvatarFallback>{org.initials}</AvatarFallback>
							</Avatar>
							{org.name}
							<Icon name="chevronDown" />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-64" elevation="floating">
					{#each orgMenu as group, i (group[0].id)}
						{#if i > 0}<DropdownMenu.Separator />{/if}
						<DropdownMenu.Group>
							{#each group as item (item.id)}
								<DropdownMenu.Item onSelect={() => item.id === "shortcuts" && (shortcuts = true)}>
									<Icon name={item.icon} />
									{item.label}
									{#if item.keys}
										<DropdownMenu.Shortcut>
											<KbdGroup>{#each item.keys as k (k)}<Kbd>{k}</Kbd>{/each}</KbdGroup>
										</DropdownMenu.Shortcut>
									{/if}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Group>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button variant="secondary" size="sm" elevation="raised">
				<Pixels w={plantHead.w} h={plantHead.h} rects={plantHead.rects} class="h-3 w-3.5" />
				Upgrade
			</Button>
		</div>

		<div class="absolute top-4 right-3 flex items-center gap-1.5 lg:right-[485px]">
			<Button variant="ghost" size="icon-xs" aria-label="Search" onclick={() => (palette = true)}><Icon name="search" /></Button>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button variant="ghost" size="icon-xs" aria-label="Map" {...props}><Icon name="map" /></Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content align="end" class="w-72">
					<Popover.Header><Popover.Title>Roadmap</Popover.Title></Popover.Header>
					<ol class="flex flex-col gap-3">
						{#each roadmapStages as s, i (s.title)}
							<li class="flex gap-3">
								<span class="font-mono text-xs text-muted-foreground">{i + 1}</span>
								<div>
									<div class="text-sm font-medium">{s.title}</div>
									<div class="text-xs text-muted-foreground">{s.note}</div>
								</div>
							</li>
						{/each}
					</ol>
				</Popover.Content>
			</Popover.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button variant="ghost" size="icon-xs" aria-label="Theme" {...props}><Icon name="sun" /></Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>Theme follows the viewer</Tooltip.Content>
			</Tooltip.Root>
			<Button variant="outline" size="sm" onclick={() => (taskDialog = true)}>
				<Icon name="plus" />
				New task
			</Button>
			<Button variant="outline" size="icon-sm" class="lg:hidden" aria-label="Open panel" onclick={onOpenPanel}>
				<Icon name="message" />
			</Button>
		</div>

		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="icon-lg" elevation="raised" aria-label="Notifications" class="absolute bottom-4 left-4">
						<Icon name="bell" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content side="top" align="start" class="w-80">
				<Popover.Header class="flex-row items-center justify-between">
					<Popover.Title>Notifications</Popover.Title>
					<Button variant="outline" size="xs">Desktop alerts</Button>
				</Popover.Header>
				<div class="py-6 text-center text-sm text-muted-foreground">All caught up!</div>
			</Popover.Content>
		</Popover.Root>

		<Card data-nopan elevation="raised" class="absolute right-3 bottom-4 flex-row items-center gap-0.5 p-1 py-1 lg:right-[485px]">
			<Button variant="ghost" size="icon-xs" aria-label="Reset view" onclick={reset}><Icon name="home" /></Button>
			<span class="w-12 text-center font-mono text-xs">{zoom}%</span>
			<Button variant="ghost" size="icon-xs" aria-label="Zoom in" disabled={zoom >= 160} onclick={() => step(10)}><Icon name="plus" /></Button>
			<Button variant="ghost" size="icon-xs" aria-label="Zoom out" disabled={zoom <= 60} onclick={() => step(-10)}><Icon name="minus" /></Button>
			<Button variant="ghost" size="icon-xs" aria-label="Shortcuts" onclick={() => (shortcuts = true)}><Icon name="keyboard" /></Button>
		</Card>

		<Command.Dialog bind:open={palette} title="Search" description="Search the workspace">
			<Command.Input placeholder={palettePlaceholder} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Commands">
					{#each paletteCommands as c (c.id)}
						<Command.Item value={c.label} onSelect={() => runCommand(c.id)}>
							<Icon name={c.icon} />
							{c.label}
							<Command.Shortcut>
								<KbdGroup>{#each c.keys as k (k)}<Kbd>{k}</Kbd>{/each}</KbdGroup>
							</Command.Shortcut>
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Group heading="Departments">
					{#each paletteDepartments as id (id)}
						{@const d = deptOf(id)}
						{#if d}
							<Command.Item value={d.label} onSelect={() => runDept(id)}>
								<AgentAvatar seed={id} color={d.color} size={16} tile={false} />
								{d.label}
							</Command.Item>
						{/if}
					{/each}
				</Command.Group>
				<Command.Group heading="Workspaces">
					{#each paletteWorkspaces as w (w)}
						<Command.Item value={w} onSelect={() => (palette = false)}>
							<Icon name="globe" />
							{w}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
			<div class="flex items-center justify-end gap-4 border-t border-border px-3 py-2 text-xs text-muted-foreground">
				<span class="flex items-center gap-1.5"><Kbd>↵</Kbd> Select</span>
				<span class="flex items-center gap-1.5"><Kbd>↑↓</Kbd> Navigate</span>
				<span class="flex items-center gap-1.5"><Kbd>Esc</Kbd> Close</span>
			</div>
		</Command.Dialog>

		<Dialog.Root bind:open={shortcuts}>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Keyboard shortcuts</Dialog.Title>
					<Dialog.Description>Move around without the mouse.</Dialog.Description>
				</Dialog.Header>
				<ul class="flex flex-col gap-2">
					{#each shortcutList as s (s.label)}
						<li class="flex items-center justify-between text-sm">
							{s.label}
							<KbdGroup>{#each s.keys as k (k)}<Kbd>{k}</Kbd>{/each}</KbdGroup>
						</li>
					{/each}
				</ul>
			</Dialog.Content>
		</Dialog.Root>

		<Dialog.Root bind:open={taskDialog}>
			<Dialog.Content>
				<form class="flex flex-col gap-4" onsubmit={createTask}>
					<Dialog.Header>
						<Dialog.Title>New task</Dialog.Title>
						<Dialog.Description>Describe the work and the right agent picks it up.</Dialog.Description>
					</Dialog.Header>
					<Input bind:value={taskName} placeholder="Task title" />
					<Dialog.Footer>
						<Button type="button" variant="outline" onclick={() => (taskDialog = false)}>Cancel</Button>
						<Button type="submit" disabled={!taskName.trim()}>Create</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</Tooltip.Provider>
