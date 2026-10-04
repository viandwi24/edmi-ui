<script lang="ts">
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";

	const ranges = ["1D", "1W", "1M", "1Y", "All"];
	let range = $state("1M");
	// A range always has one value: ignore the empty value a second click on the active item produces.
	function setRange(v: string) {
		if (v) range = v;
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-start gap-6">
		<ToggleGroup.Root type="single" variant="segmented" value={range} onValueChange={setRange}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="single" variant="outline" spacing={0} value={range} onValueChange={setRange}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	</div>
	<div class="flex flex-wrap items-start gap-6">
		<ToggleGroup.Root type="single" variant="segmented" raised value={range} onValueChange={setRange}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="single" variant="outline" spacing={0} raised value={range} onValueChange={setRange}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	</div>
</div>
