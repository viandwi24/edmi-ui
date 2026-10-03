<script lang="ts">
	import ArrowsClockwise from "phosphor-svelte/lib/ArrowsClockwise";
	import CaretDown from "phosphor-svelte/lib/CaretDown";
	import CaretUpDown from "phosphor-svelte/lib/CaretUpDown";
	import { Avatar, AvatarFallback } from "#lib/components/ui/avatar/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import { workspace } from "#lib/data/layerbeat.js";
	import LayerbeatMark from "../layerbeat-mark.svelte";
	import ThemeSwitch from "../theme-switch.svelte";
</script>

<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
	<div class="flex min-w-0 items-center gap-3">
		<Sidebar.Trigger class="md:hidden" aria-label="Open sidebar" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="flex items-center gap-2.5 rounded-md text-sm font-medium outline-none focus-visible:outline-2 focus-visible:outline-ring">
				<LayerbeatMark size={18} />
				<span class="truncate">{workspace.name}</span>
				<CaretUpDown class="size-3.5 text-muted-foreground" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Label>Workspaces</DropdownMenu.Label>
				<DropdownMenu.Item>{workspace.name}</DropdownMenu.Item>
				<DropdownMenu.Item>Personal</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<span class="text-muted-foreground max-sm:hidden">/</span>
		<span class="text-muted-foreground max-sm:hidden">BeatVPS</span>
	</div>
	<div class="flex items-center gap-3 sm:gap-[18px]">
		<span class="flex items-center gap-[7px] text-[13px] text-success-text max-lg:hidden">
			<span class="size-[7px] rounded-full bg-current"></span>
			<span class="text-muted-foreground">Connected</span>
		</span>
		<ThemeSwitch />
		<Button variant="ghost" size="sm" class="max-sm:hidden">
			<ArrowsClockwise />
			Refresh
		</Button>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="flex items-center gap-1.5 rounded-full outline-none focus-visible:outline-2 focus-visible:outline-ring" aria-label="Account">
				<Avatar><AvatarFallback>{workspace.user}</AvatarFallback></Avatar>
				<CaretDown class="size-3.5 text-muted-foreground max-sm:hidden" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Sign out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
