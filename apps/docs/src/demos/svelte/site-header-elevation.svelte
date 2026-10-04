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
<SiteHeader elevation={l.value} lead="How to" {steps} {links}>
	{#snippet action({ elevation })}
		<Button {elevation}>Create an index</Button>
	{/snippet}
</SiteHeader>
		</div>
	{/each}
</div>
