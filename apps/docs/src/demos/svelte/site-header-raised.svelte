<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { SiteHeader } from "@edmi-svelte/ui/site-header";

	const steps = [
		{ label: "Start", href: "#start" },
		{ label: "Build", href: "#build" },
		{ label: "Sell", href: "#sell" },
		{ label: "Scale", href: "#scale" },
	];
	const links = [
		{ label: "Resources", href: "#resources" },
		{ label: "Pricing", href: "#pricing" },
	];
</script>

<SiteHeader raised lead="How to" {steps} {links}>
	{#snippet action({ raised })}
		<Button elevation={raised ? "raised" : undefined}>Create an index</Button>
	{/snippet}
</SiteHeader>
