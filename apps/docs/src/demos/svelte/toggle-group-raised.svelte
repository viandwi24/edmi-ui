<script lang="ts">
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";

	const ranges = ["1D", "1W", "1M", "1Y", "All"];
	let range = $state("1M");
	// A range always has one value: ignore the empty value a second click on the active item produces.
	function setRange(v: string) {
		if (v) range = v;
	}

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-start gap-6">
				<ToggleGroup.Root type="single" variant="segmented" elevation={level.value} value={range} onValueChange={setRange}>
					{#each ranges as v (v)}
						<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
				<ToggleGroup.Root type="single" variant="outline" spacing={0} elevation={level.value} value={range} onValueChange={setRange}>
					{#each ranges as v (v)}
						<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>
		</div>
	{/each}
</div>
