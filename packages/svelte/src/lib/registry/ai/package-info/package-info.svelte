<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import PackageInfoChangeType from "./package-info-change-type.svelte";
	import PackageInfoHeader from "./package-info-header.svelte";
	import PackageInfoName from "./package-info-name.svelte";
	import PackageInfoVersion from "./package-info-version.svelte";
	import { type PackageChangeType, setPackageInfoContext } from "./use-package-info.svelte.js";

	let {
		name,
		currentVersion,
		newVersion,
		changeType,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		name: string;
		currentVersion?: string;
		newVersion?: string;
		changeType?: PackageChangeType;
		children?: Snippet;
	} = $props();

	setPackageInfoContext({
		get name() {
			return name;
		},
		get currentVersion() {
			return currentVersion;
		},
		get newVersion() {
			return newVersion;
		},
		get changeType() {
			return changeType;
		},
	});
</script>

<div
	data-slot="ai-package-info"
	class={cn("rounded-xl border border-border bg-card px-4 py-3.5 text-card-foreground", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<PackageInfoHeader>
			<PackageInfoName />
			{#if changeType}<PackageInfoChangeType />{/if}
			<PackageInfoVersion />
		</PackageInfoHeader>
	{/if}
</div>
