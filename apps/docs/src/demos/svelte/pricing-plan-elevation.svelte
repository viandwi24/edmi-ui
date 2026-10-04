<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { PricingPlan } from "@edmi-svelte/ui/pricing-plan";

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
<PricingPlan
	elevation={l.value}
	class="w-[300px] max-w-full"
	name="Creator"
	tagline="Launch your own index"
	price="1% fee to you"
	priceNote="Earned on every holder’s share."
	features={["Custom weights and mandate", "Pre-IPO sleeve", "Share cards and Blinks"]}
>
	{#snippet action()}
		<Button size="lg" elevation={l.value}>Launch an index</Button>
	{/snippet}
</PricingPlan>
		</div>
	{/each}
</div>
