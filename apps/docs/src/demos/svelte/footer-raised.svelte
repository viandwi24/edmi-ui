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
</script>

<SiteFooter
	raised
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
		<Button variant="secondary" raised size="icon-sm" aria-label="X">
			<IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
		</Button>
		<Button variant="secondary" raised size="icon-sm" aria-label="Link">
			<IconPlaceholder lucide="LinkIcon" tabler="IconLink" hugeicons="LinkIcon" phosphor="LinkIcon" remixicon="RiLinksLine" />
		</Button>
	{/snippet}
</SiteFooter>
