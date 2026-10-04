<script lang="ts">
	import type { Snippet } from "svelte";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import { Toaster } from "#lib/components/ui/sonner/index.js";
	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<Sidebar.Provider style="--sidebar-width: 15rem">
	<AppSidebar />
	<Sidebar.Inset class="min-w-0">
		<AppHeader />
		<div class="flex-1">{@render children()}</div>
	</Sidebar.Inset>
</Sidebar.Provider>
<Toaster elevation="raised" />
