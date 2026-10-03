<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { usePackageInfoContext } from "./use-package-info.svelte.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof Badge> = $props();

	const info = usePackageInfoContext();

	// major = destructive, minor = warning, patch = success, added = info (soft fill, tinted border).
	const variants = {
		added: "info",
		major: "destructive",
		minor: "warning",
		patch: "success",
		removed: "secondary",
	} as const;
</script>

{#if info.changeType}
	<Badge variant={variants[info.changeType]} class={cn("h-5", className)} {...restProps}>
		{#if children}{@render children()}{:else}{info.changeType}{/if}
	</Badge>
{/if}
