<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
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
</script>

<div class={cn("flex items-center gap-2", className)} {...restProps}>
	<IconPlaceholder
		lucide="ContainerIcon"
		tabler="IconBox"
		hugeicons="CubeIcon"
		phosphor="CubeIcon"
		remixicon="RiBox1Line"
		class="size-3.5 text-muted-foreground"
	/>
	<span class="font-mono text-[13.5px] font-semibold">
		{#if children}{@render children()}{:else}{info.name}{/if}
	</span>
</div>
