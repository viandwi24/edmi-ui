<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { setTestSuiteContext, type TestStatusType } from "./use-test-results.svelte.js";

	let {
		ref = $bindable(null),
		open = $bindable(false),
		name,
		status,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Root> & {
		name: string;
		status: TestStatusType;
	} = $props();

	setTestSuiteContext({
		get name() {
			return name;
		},
		get status() {
			return status;
		},
	});
</script>

<Collapsible.Root bind:ref bind:open data-slot="ai-test-suite" {...restProps}>
	{@render children?.()}
</Collapsible.Root>
