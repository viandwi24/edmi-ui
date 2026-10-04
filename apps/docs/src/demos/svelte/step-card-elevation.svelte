<script lang="ts">
	import { StepCard } from "@edmi-svelte/ui/step-card";

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
<div class="flex flex-wrap gap-3">
	<StepCard elevation={l.value} class="w-[200px]" index="01" title="Create" description="Pick up to 10 assets and set weights." />
	<StepCard elevation={l.value} class="w-[200px]" index="02" title="Share" description="A link, OG image, feed card and Blink." />
	<StepCard elevation={l.value} class="w-[200px]" index="03" title="Join" description="Investors pay in USDC in one click." />
</div>
		</div>
	{/each}
</div>
