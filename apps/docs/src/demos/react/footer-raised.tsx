import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import { Button } from "@edmi-react/ui/button";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<SiteFooter
			raised
			className="w-full"
			brand={
				<span className="font-brand text-xl font-semibold tracking-tight">
					Stockbreak
				</span>
			}
			description="Turn a stock thesis into a token. Built on Solana devnet."
			socials={
				<>
					<Button variant="secondary" size="icon-sm" aria-label="X">
						<IconPlaceholder
							lucide="XIcon"
							tabler="IconX"
							hugeicons="Cancel01Icon"
							phosphor="XIcon"
							remixicon="RiCloseLine"
						/>
					</Button>
					<Button variant="secondary" size="icon-sm" aria-label="Link">
						<IconPlaceholder
							lucide="LinkIcon"
							tabler="IconLink"
							hugeicons="LinkIcon"
							phosphor="LinkIcon"
							remixicon="RiLinksLine"
						/>
					</Button>
				</>
			}
			columns={[
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
			]}
			legal="© 2026 Stockbreak"
			note="Not investment advice · devnet only"
		/>
	);
}
