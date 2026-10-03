<script lang="ts">
	// Dev/docs-only shim (NEVER shipped in the registry). Registry sources use shadcn-svelte's
	// <IconPlaceholder lucide=".." tabler=".." hugeicons=".." phosphor=".." remixicon=".." />;
	// `shadcn-svelte add` rewrites it to the consumer's `iconLibrary`. Here the `phosphor` prop is
	// rendered with phosphor-svelte (the Edmi default), one lazy chunk per icon, resolved on mount.
	import type { Component } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	const loaders = import.meta.glob("/node_modules/phosphor-svelte/lib/*Icon.svelte") as Record<
		string,
		() => Promise<{ default: Component<Record<string, unknown>> }>
	>;
	const cache = new Map<string, Promise<Component<Record<string, unknown>> | null>>();

	function load(name: string) {
		let hit = cache.get(name);
		if (!hit) {
			const key = `/node_modules/phosphor-svelte/lib/${name}.svelte`;
			hit = loaders[key]?.().then((m) => m.default) ?? Promise.resolve(null);
			cache.set(name, hit);
		}
		return hit;
	}

	let {
		lucide: _l,
		tabler: _t,
		hugeicons: _h,
		phosphor,
		remixicon: _r,
		...restProps
	}: SVGAttributes<SVGSVGElement> & {
		lucide?: string;
		tabler?: string;
		hugeicons?: string;
		phosphor?: string;
		remixicon?: string;
	} = $props();

	let Icon = $state<Component<Record<string, unknown>> | null>(null);

	// Client only: effects do not run during SSR, so the server renders the sized placeholder below.
	$effect(() => {
		const name = phosphor && (phosphor.endsWith("Icon") ? phosphor : `${phosphor}Icon`);
		let live = true;
		if (!name) Icon = null;
		else load(name).then((c) => live && (Icon = c));
		return () => {
			live = false;
		};
	});
</script>

{#if Icon}
	<Icon {...restProps} />
{:else}
	<svg viewBox="0 0 256 256" width="1em" height="1em" aria-hidden="true" {...restProps}></svg>
{/if}
