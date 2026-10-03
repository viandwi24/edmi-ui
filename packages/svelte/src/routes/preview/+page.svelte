<script lang="ts">
	// Dev preview of every docs Svelte demo, grouped like the docs sidebar, in light and dark.
	import type { Component } from "svelte";

	const demoModules = import.meta.glob<{ default: Component }>(
		"../../../../../apps/docs/src/demos/svelte/*.svelte",
		{ eager: true }
	);
	const pages = import.meta.glob("../../../../../apps/docs/src/content/docs/components/*/*.mdx", {
		query: "?url",
		import: "default",
	});

	const demos = Object.entries(demoModules).map(([path, mod]) => ({
		name: path.split("/").pop()!.replace(".svelte", ""),
		Demo: mod.default,
	}));
	const groupOf = new Map<string, string>();
	for (const path of Object.keys(pages)) {
		const [, group, file] = path.match(/components\/([^/]+)\/([^/]+)\.mdx$/) ?? [];
		if (group) groupOf.set(file, group);
	}
	const byGroup: Record<string, typeof demos> = {};
	for (const d of demos) {
		// `button-sizes` style demos belong to the page of their prefix.
		let g = groupOf.get(d.name);
		if (!g) {
			const parts = d.name.split("-");
			while (!g && parts.length > 1) {
				parts.pop();
				g = groupOf.get(parts.join("-"));
			}
		}
		(byGroup[g ?? "other"] ??= []).push(d);
	}
	const groups = Object.keys(byGroup).sort();
	let active = $state(
		(typeof location !== "undefined" && new URLSearchParams(location.search).get("group")) ||
			groups[0]
	);
	function select(g: string) {
		active = g;
		history.replaceState(null, "", `?group=${g}`);
	}
</script>

<div class="min-h-screen bg-background text-foreground">
	<header class="sticky top-0 z-10 flex flex-wrap gap-1 border-b bg-background p-3">
		{#each groups as g (g)}
			<button
				class="rounded-md border px-2.5 py-1 text-sm {active === g ? 'bg-accent' : ''}"
				onclick={() => select(g)}>{g} ({byGroup[g].length})</button
			>
		{/each}
	</header>
	<main class="space-y-10 p-6">
		{#each byGroup[active] ?? [] as { name, Demo } (name)}
			<section>
				<h2 class="mb-3 font-mono text-sm text-muted-foreground">{name}</h2>
				<div class="grid gap-4 lg:grid-cols-2">
					{#each ["light", "dark"] as theme (theme)}
						<div
							class="{theme === 'dark' ? 'dark' : ''} rounded-lg border bg-background p-6 text-foreground"
						>
							<Demo />
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</main>
</div>
