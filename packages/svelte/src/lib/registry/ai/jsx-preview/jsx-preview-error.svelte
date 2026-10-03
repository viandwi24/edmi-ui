<script lang="ts">
	// Edmi ✦ port: the error state is the destructive ui alert.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Alert, AlertDescription, AlertTitle } from "$lib/registry/ui/alert/index.js";
	import type { Snippet } from "svelte";
	import { useJSXPreview } from "./use-jsx-preview.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet<[Error]> } = $props();

	const preview = useJSXPreview();
</script>

{#if preview.error}
	<Alert data-slot="ai-jsx-preview-error" variant="destructive" class={className}>
		{#if children}
			{@render children(preview.error)}
		{:else}
			<IconPlaceholder
				lucide="AlertCircle"
				tabler="IconAlertCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<AlertTitle>Could not render</AlertTitle>
			<AlertDescription>{preview.error.message}</AlertDescription>
		{/if}
	</Alert>
{/if}
