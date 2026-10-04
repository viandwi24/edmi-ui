<script lang="ts">
	import type { Snippet } from "svelte";
	import SchemaDisplayParameter from "./schema-display-parameter.svelte";
	import SchemaDisplaySection from "./schema-display-section.svelte";
	import { useSchemaDisplayContext } from "./use-schema-display.svelte.js";

	let {
		open = $bindable(true),
		class: className,
		children,
	}: { open?: boolean; class?: string; children?: Snippet } = $props();

	const schema = useSchemaDisplayContext();
</script>

<SchemaDisplaySection data-slot="ai-schema-display-parameters" title="Parameters" bind:open class={className}>
	{#if children}
		{@render children()}
	{:else}
		{#each schema.parameters ?? [] as param (param.name)}
			<SchemaDisplayParameter {...param} />
		{/each}
	{/if}
</SchemaDisplaySection>
