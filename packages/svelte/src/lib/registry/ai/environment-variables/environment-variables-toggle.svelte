<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { cn } from "$lib/utils.js";
	import { useEnvironmentVariablesContext } from "./use-environment-variables.svelte.js";

	let { class: className }: { class?: string } = $props();

	const list = useEnvironmentVariablesContext();
</script>

<div class={cn("flex items-center gap-2 text-[12.5px]", className)}>
	<span class="text-muted-foreground">
		{#if list.showValues}
			<IconPlaceholder
				lucide="EyeIcon"
				tabler="IconEye"
				hugeicons="EyeIcon"
				phosphor="EyeIcon"
				remixicon="RiEyeLine"
				class="size-3.5"
			/>
		{:else}
			<IconPlaceholder
				lucide="EyeOffIcon"
				tabler="IconEyeClosed"
				hugeicons="ViewOffIcon"
				phosphor="EyeSlashIcon"
				remixicon="RiEyeOffLine"
				class="size-3.5"
			/>
		{/if}
	</span>
	<span>Show values</span>
	<Switch
		aria-label="Toggle value visibility"
		size="sm"
		checked={list.showValues}
		onCheckedChange={(v) => list.setShowValues(v)}
	/>
</div>
