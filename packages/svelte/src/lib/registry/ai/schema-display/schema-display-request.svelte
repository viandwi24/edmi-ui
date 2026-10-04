<script lang="ts">
	import type { Snippet } from "svelte";
	import SchemaDisplayProperty from "./schema-display-property.svelte";
	import SchemaDisplaySection from "./schema-display-section.svelte";
	import { useSchemaDisplayContext } from "./use-schema-display.svelte.js";

	let {
		open = $bindable(true),
		class: className,
		children,
	}: { open?: boolean; class?: string; children?: Snippet } = $props();

	const schema = useSchemaDisplayContext();
</script>

<SchemaDisplaySection data-slot="ai-schema-display-request" title="Request body" bind:open class={className}>
	{#if children}
		{@render children()}
	{:else}
		{#each schema.requestBody ?? [] as prop (prop.name)}
			<SchemaDisplayProperty {...prop} depth={0} />
		{/each}
	{/if}
</SchemaDisplaySection>
