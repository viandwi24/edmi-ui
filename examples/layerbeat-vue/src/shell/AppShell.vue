<script setup lang="ts">
import { PhArrowClockwise, PhCaretDown, PhCaretUpDown, PhCheck, PhList, PhSidebarSimple } from "@phosphor-icons/vue";
import { ref } from "vue";
import Logo from "@/components/Logo.vue";
import ModeSwitch from "@/components/ModeSwitch.vue";
import SidebarNav from "@/components/SidebarNav.vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { user, workspaces } from "@/data/layerbeat";

const navOpen = ref(true);
const mobileOpen = ref(false);
const workspace = ref(workspaces[0]);
const syncing = ref(false);

function refresh() {
	syncing.value = true;
	setTimeout(() => (syncing.value = false), 900);
}
</script>

<template>
	<SidebarProvider class="h-svh min-h-0 overflow-hidden">
		<!-- Always-dark navy sidebar: a scoped `dark` class puts every token in this subtree in dark mode, even in light mode. -->
		<Sidebar
			v-show="navOpen"
			collapsible="none"
			class="dark sticky top-0 hidden h-svh w-60 shrink-0 bg-[#0b2a6f] md:flex"
		>
			<SidebarNav collapsible @collapse="navOpen = false" />
		</Sidebar>
		<Sheet v-model:open="mobileOpen">
			<SheetContent side="left" class="dark w-60 gap-0 border-sidebar-border bg-[#0b2a6f] p-0 text-sidebar-foreground [&>button]:hidden">
				<SheetHeader class="sr-only">
					<SheetTitle>Navigation</SheetTitle>
					<SheetDescription>Layerbeat navigation</SheetDescription>
				</SheetHeader>
				<div class="flex h-full flex-col"><SidebarNav /></div>
			</SheetContent>
		</Sheet>

		<div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
			<header class="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
				<div class="flex min-w-0 items-center gap-2 md:gap-3">
					<Button variant="ghost" size="icon-sm" class="md:hidden" aria-label="Open navigation" @click="mobileOpen = true">
						<PhList />
					</Button>
					<Button v-if="!navOpen" variant="ghost" size="icon-sm" class="hidden md:inline-flex" aria-label="Open sidebar" @click="navOpen = true">
						<PhSidebarSimple />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<button type="button" class="flex items-center gap-2.5 rounded-md py-1 font-medium outline-none focus-visible:shadow-ring">
								<Logo class="size-[18px]" />
								<span class="truncate">{{ workspace.name }}</span>
								<PhCaretUpDown class="size-4 text-muted-foreground" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" class="w-52">
							<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
							<DropdownMenuItem v-for="w in workspaces" :key="w.id" @select="workspace = w">
								{{ w.name }}
								<PhCheck v-if="w.id === workspace.id" class="ml-auto size-4" />
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Create workspace</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<span class="text-muted-foreground">/</span>
					<span class="hidden text-muted-foreground sm:inline">BeatVPS</span>
				</div>
				<div class="flex shrink-0 items-center gap-3 sm:gap-[18px]">
					<span class="hidden items-center gap-[7px] text-[13px] text-muted-foreground lg:flex">
						<span class="size-1.5 rounded-full bg-success" />
						Connected
					</span>
					<ModeSwitch />
					<Button variant="ghost" size="sm" class="hidden sm:inline-flex" @click="refresh">
						<Spinner v-if="syncing" />
						<PhArrowClockwise v-else />
						Refresh
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<button type="button" class="flex items-center gap-1.5 rounded-full outline-none focus-visible:shadow-ring" aria-label="Account">
								<Avatar class="size-8">
									<AvatarFallback class="text-xs">{{ user.initials }}</AvatarFallback>
								</Avatar>
								<PhCaretDown class="hidden size-3.5 text-muted-foreground sm:block" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" class="w-52">
							<DropdownMenuLabel class="flex flex-col">
								{{ user.name }}
								<span class="text-xs font-normal text-muted-foreground">{{ user.email }}</span>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Account settings</DropdownMenuItem>
							<DropdownMenuItem>Sign out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main class="min-h-0 flex-1 overflow-y-auto overscroll-contain"><slot /></main>
		</div>
	</SidebarProvider>
</template>
