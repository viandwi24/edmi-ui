<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import AppShell from "#lib/app/shell/app-shell.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Create a BeatVPS · Layerbeat</title>
</svelte:head>

<AppShell>
	{@render children()}
</AppShell>
