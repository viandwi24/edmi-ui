<script lang="ts">
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";

	const ranges = ["1D", "1W", "1M", "1Y", "All"];
	let format = $state<string[]>(["b"]);
	let range = $state("1M");
	// A range always has one value: ignore the empty value a second click on the active item produces.
	function setRange(v: string) {
		if (v) range = v;
	}
</script>

<div class="flex flex-wrap items-start gap-6">
	<ToggleGroup.Root type="multiple" bind:value={format}>
		<ToggleGroup.Item value="b" aria-label="Bold"><b>B</b></ToggleGroup.Item>
		<ToggleGroup.Item value="i" aria-label="Italic"><i>I</i></ToggleGroup.Item>
		<ToggleGroup.Item value="u" aria-label="Underline"><u>U</u></ToggleGroup.Item>
	</ToggleGroup.Root>
	<ToggleGroup.Root type="single" variant="outline" spacing={0} value={range} onValueChange={setRange}>
		{#each ranges as v (v)}
			<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<ToggleGroup.Root type="single" variant="segmented" value={range} onValueChange={setRange}>
		{#each ranges as v (v)}
			<ToggleGroup.Item value={v}>{v}</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<ToggleGroup.Root type="multiple" orientation="vertical" variant="outline">
		<ToggleGroup.Item value="b" aria-label="Bold"><b>B</b></ToggleGroup.Item>
		<ToggleGroup.Item value="i" aria-label="Italic"><i>I</i></ToggleGroup.Item>
	</ToggleGroup.Root>
</div>
