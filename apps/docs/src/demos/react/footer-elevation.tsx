import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import { Button } from "@edmi-react/ui/button";
import type { Elevation } from "@edmi-react/ui/elevation";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<SiteFooter
			elevation={elevation}
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

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
