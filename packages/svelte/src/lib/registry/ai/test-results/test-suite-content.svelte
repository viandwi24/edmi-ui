<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Content> = $props();
</script>

<Collapsible.Content bind:ref data-slot="ai-test-suite-content" {...restProps}>
	<div>
		{@render children?.()}
	</div>
</Collapsible.Content>
