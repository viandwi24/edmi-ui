<script lang="ts">
	import type { Snippet } from "svelte";
	import { LayoutPickerToast, type Layout } from "#lib/components/ui/layout-picker/index.js";
	import { ElevationProvider } from "#lib/components/ui/elevation/index.js";
	import DashboardLayout from "./dashboard-layout.svelte";
	import NavbarLayout from "./navbar-layout.svelte";

	// SSR renders the cookie's layout (`layout` from the root load); the first-visit toast changes it live (DESIGN §6).
	let { layout: initial, children }: { layout: Layout; children: Snippet } = $props();
	let layout = $state<Layout>("dashboard");
	$effect.pre(() => {
		layout = initial;
	});
</script>

<ElevationProvider mode="layered">
	{#if layout === "navbar"}
		<NavbarLayout {children} />
	{:else}
		<DashboardLayout {children} />
	{/if}
	<LayoutPickerToast onValueChange={(v) => (layout = v)} />
</ElevationProvider>
