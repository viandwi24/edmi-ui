<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { PricingPlan } from "@edmi-svelte/ui/pricing-plan";
</script>

<PricingPlan
	class="w-[300px] max-w-full"
	name="Creator"
	tagline="Launch your own index"
	price="1% fee to you"
	priceNote="Earned on every holder’s share."
	featuresLead="Everything in Holder, plus:"
	features={["Custom weights and mandate", "Pre-IPO sleeve", "Share cards and Blinks"]}
>
	{#snippet action()}
		<Button size="lg">Launch an index</Button>
	{/snippet}
	{#snippet feature(text)}
		<span class="flex items-center gap-2">
			{text}
			{#if text === "Pre-IPO sleeve"}<Badge variant="secondary">New</Badge>{/if}
		</span>
	{/snippet}
</PricingPlan>
