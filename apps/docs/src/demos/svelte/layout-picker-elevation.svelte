<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { type Layout, LayoutPicker, LayoutPickerToast } from "@edmi-svelte/ui/layout-picker";

	let layout = $state<Layout>("dashboard");
	let toast = $state(false);

	const levels = [
		{ value: "sunken", label: "Sunken (-1)" } as const,
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<div class="flex flex-col items-start gap-4">
	<LayoutPicker elevation={l.value} bind:value={layout} />
	<Button variant="outline" onclick={() => (toast = true)}>Show corner toast</Button>
	{#if toast}
		<LayoutPickerToast
			elevation={l.value}
			defaultOpen
			defaultValue={layout}
			onValueChange={(v) => (layout = v)}
			onClose={() => (toast = false)}
		/>
	{/if}
</div>
		</div>
	{/each}
</div>
