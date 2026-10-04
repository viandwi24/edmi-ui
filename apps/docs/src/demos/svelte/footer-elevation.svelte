<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { SiteFooter, type FooterColumn } from "@edmi-svelte/ui/footer";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const columns: FooterColumn[] = [
		{
			title: "Product",
			links: [
				{ label: "Explore", href: "#" },
				{ label: "Leaderboard", href: "#" },
				{ label: "Create index", href: "#" },
				{ label: "Faucet", href: "#" },
			],
		},
		{
			title: "Developers",
			links: [
				{ label: "Docs", href: "#" },
				{ label: "API", href: "#" },
				{ label: "MCP server", href: "#" },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About", href: "#" },
				{ label: "Careers", href: "#" },
				{ label: "Terms", href: "#" },
			],
		},
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
<SiteFooter
	elevation={l.value}
	class="w-full"
	description="Turn a stock thesis into a token. Built on Solana devnet."
	{columns}
	legal="© 2026 Stockbreak"
	note="Not investment advice · devnet only"
>
	{#snippet brand()}
		<span class="font-brand text-xl font-semibold tracking-tight">Stockbreak</span>
	{/snippet}
	{#snippet socials()}
		<Button variant="secondary" elevation={l.value} size="icon-sm" aria-label="X">
			<IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
		</Button>
		<Button variant="secondary" elevation={l.value} size="icon-sm" aria-label="Link">
			<IconPlaceholder lucide="LinkIcon" tabler="IconLink" hugeicons="LinkIcon" phosphor="LinkIcon" remixicon="RiLinksLine" />
		</Button>
	{/snippet}
</SiteFooter>
		</div>
	{/each}
</div>
