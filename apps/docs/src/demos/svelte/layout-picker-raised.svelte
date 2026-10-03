<script lang="ts">
	import { type Layout, LayoutPicker } from "@edmi-svelte/ui/layout-picker";

	let flat = $state<Layout>("dashboard");
	let raised = $state<Layout>("navbar");
</script>

<div class="flex flex-col gap-4">
	<LayoutPicker bind:value={flat} />
	<LayoutPicker raised bind:value={raised} />
</div>
