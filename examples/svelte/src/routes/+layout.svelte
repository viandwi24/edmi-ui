<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import AppShell from "#lib/app/shell/app-shell.svelte";

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Markets · Stockbreak</title>
</svelte:head>

<AppShell layout={data.layout}>
	{@render children()}
</AppShell>
