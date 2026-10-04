<script lang="ts">
	import { Slider } from "@edmi-svelte/ui/slider";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex w-72 flex-col gap-5">
				<Slider type="multiple" elevation={level.value} value={[33]} max={100} step={1} />
				<Slider type="multiple" elevation={level.value} value={[25, 75]} />
			</div>
		</div>
	{/each}
</div>
