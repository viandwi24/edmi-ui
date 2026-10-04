<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { usePackageInfoContext } from "./use-package-info.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();

	const info = usePackageInfoContext();

	// `18.3.1 → 19.0.0`; with only a new version (added) it reads `→ 6.0.30`. Pushed right inside the header.
	const text = $derived(
		[info.currentVersion, info.newVersion && "→", info.newVersion].filter(Boolean).join(" ")
	);
</script>

{#if info.currentVersion || info.newVersion}
	<div class={cn("ml-auto font-mono text-[12.5px] text-foreground", className)} {...restProps}>
		{#if children}{@render children()}{:else}{text}{/if}
	</div>
{/if}
