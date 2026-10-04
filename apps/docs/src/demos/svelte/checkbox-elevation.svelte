<script lang="ts">
	import { Checkbox } from "@edmi-svelte/ui/checkbox";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-center gap-6 text-sm">
				<label class="flex items-center gap-2.5"><Checkbox elevation={level.value} checked /> Checked</label>
				<label class="flex items-center gap-2.5"><Checkbox elevation={level.value} indeterminate /> Indeterminate</label>
				<label class="flex items-center gap-2.5"><Checkbox elevation={level.value} /> Unchecked</label>
			</div>
		</div>
	{/each}
</div>
