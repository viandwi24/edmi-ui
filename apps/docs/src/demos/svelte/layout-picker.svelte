<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { type Layout, LayoutPicker, LayoutPickerToast } from "@edmi-svelte/ui/layout-picker";

	let layout = $state<Layout>("dashboard");
	let toast = $state(false);
</script>

<div class="flex flex-col items-start gap-4">
	<LayoutPicker bind:value={layout} />
	<Button variant="outline" onclick={() => (toast = true)}>Show corner toast</Button>
	{#if toast}
		<LayoutPickerToast defaultOpen defaultValue={layout} onValueChange={(v) => (layout = v)} onClose={() => (toast = false)} />
	{/if}
</div>
