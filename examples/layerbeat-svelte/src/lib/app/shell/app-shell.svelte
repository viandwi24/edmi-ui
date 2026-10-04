<script lang="ts">
	import type { Snippet } from "svelte";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import { Toaster } from "#lib/components/ui/sonner/index.js";
	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<Sidebar.Provider class="h-svh min-h-0 overflow-hidden" style="--sidebar-width: 15rem">
	<AppSidebar />
	<Sidebar.Inset class="min-h-0 min-w-0 overflow-hidden">
		<AppHeader />
		<div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">{@render children()}</div>
	</Sidebar.Inset>
</Sidebar.Provider>
<Toaster elevation="raised" />
