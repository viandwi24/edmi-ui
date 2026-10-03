<script lang="ts">
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";

	const ranges = ["1D", "1W", "1M", "1Y", "All"];
	let range = $state("1M");
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-start gap-6">
		<ToggleGroup.Root type="single" variant="segmented" bind:value={range}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="single" variant="outline" spacing={0} bind:value={range}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	</div>
	<div class="flex flex-wrap items-start gap-6">
		<ToggleGroup.Root type="single" variant="segmented" raised bind:value={range}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="single" variant="outline" spacing={0} raised bind:value={range}>
			{#each ranges as v (v)}
				<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	</div>
</div>
