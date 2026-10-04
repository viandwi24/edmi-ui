<script lang="ts">
	import { FeatureRow } from "@edmi-svelte/ui/feature-row";

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<div class="flex w-[420px] max-w-full flex-col gap-2">
	<FeatureRow elevation={l.value} index="1.1" title="Thesis and weights">
		Describe the thesis, pick up to 10 assets and set their weights.
	</FeatureRow>
	<FeatureRow elevation={l.value} index="1.2" title="Index identity" />
	<FeatureRow elevation={l.value} index="1.3" title="Vault deployment" />
</div>
		</div>
	{/each}
</div>
