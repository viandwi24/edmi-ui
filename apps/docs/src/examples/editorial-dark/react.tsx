import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import { PricingPlan } from "@edmi-react/blocks/pricing-plan/pricing-plan";
import { SiteHeaderBrand } from "@edmi-react/blocks/site-header/site-header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@edmi-react/ui/accordion";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@edmi-react/ui/navigation-menu";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { faq, footer, hero, index, nav, plans } from "./data";

export default function EditorialDarkExample() {
	const [audience, setAudience] = useState("individual");
	return (
		<div className="min-h-svh overflow-x-clip bg-background text-foreground">
			<header className="mx-auto flex max-w-[1328px] items-center justify-between gap-4 px-4 py-4 md:px-10">
				<SiteHeaderBrand raised />
				<NavigationMenu className="max-lg:hidden">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Product</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[640px] grid-cols-4 gap-4">
									{nav.product.map((col) => (
										<div key={col.title} className="flex flex-col gap-1">
											<span className="px-2 text-xs text-muted-foreground">
												{col.title}
											</span>
											{col.links.map((l) => (
												<NavigationMenuLink key={l.href} href={l.href}>
													{l.label}
												</NavigationMenuLink>
											))}
										</div>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						{nav.others.map((o) => (
							<NavigationMenuItem key={o}>
								<NavigationMenuLink
									href={`#${o.toLowerCase()}`}
									className="h-9 px-3"
								>
									{o}
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
						<NavigationMenuItem>
							<NavigationMenuLink href="#login" className="h-9 px-3">
								{nav.login}
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center gap-3">
					<Button raised variant="secondary" className="max-sm:hidden">
						{nav.contact}
					</Button>
					<Button raised>{nav.launch}</Button>
				</div>
			</header>

			<main className="mx-auto flex max-w-[1328px] flex-col gap-28 px-4 pt-10 pb-16 md:px-10 md:pt-16">
				<section className="grid items-center gap-12 lg:grid-cols-2">
					<div className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6 text-center">
						<h1 className="text-[56px] leading-[1.05] font-normal tracking-[-2.5px] text-foreground-2 md:text-[72px]">
							{hero.title}
						</h1>
						<p className="text-xl text-muted-foreground">{hero.lead}</p>
						<Card raised className="w-full gap-3 p-7">
							<Button raised variant="secondary" size="lg">
								{hero.wallet}
							</Button>
							<span className="text-[11px] text-muted-foreground">{hero.or}</span>
							<Button raised size="lg">
								{hero.email}
							</Button>
							<p className="text-[11px] leading-relaxed text-muted-foreground">
								{hero.terms}
							</p>
						</Card>
						<Button raised variant="outline">
							{hero.devnet}
						</Button>
					</div>
					<Card raised className="items-center justify-center p-6 sm:p-12 lg:min-h-[620px]">
						<Card className="w-full max-w-[420px] gap-4 p-7">
							<div className="font-mono text-[11px] text-muted-foreground">
								{index.label}
							</div>
							<div className="text-[44px] leading-none font-normal tracking-[-1.5px] text-foreground-2">
								{index.price}
							</div>
							<div className="text-xs text-success-text">{index.delta}</div>
							<ul>
								{index.rows.map((r) => (
									<li
										key={r.code}
										className="flex items-center gap-3 border-b border-border-2 py-3.5 last:border-b-0"
									>
										<span className="inline-flex size-8 items-center justify-center rounded-full bg-muted font-mono text-[10px]">
											{r.code}
										</span>
										<span className="flex-1 text-[15px] font-medium">
											{r.name}
										</span>
										<span className="font-mono text-xs text-muted-foreground">
											{r.weight}
										</span>
									</li>
								))}
							</ul>
							<Button raised variant="brand" size="lg">
								{index.join}
							</Button>
						</Card>
					</Card>
				</section>

				<section className="flex flex-col items-center gap-10">
					<h2 className="text-[40px] font-normal tracking-[-1.5px] text-foreground-2 md:text-[56px]">
						{plans.title}
					</h2>
					<ToggleGroup
						raised
						variant="segmented"
						value={[audience]}
						onValueChange={(v) => v[0] && setAudience(v[0] as string)}
					>
						{plans.tabs.map((t) => (
							<ToggleGroupItem key={t.value} value={t.value} className="px-4">
								{t.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<div className="grid w-full gap-5 md:grid-cols-3">
						{plans.items.map((p) => (
							<PricingPlan
								key={p.name}
								raised
								name={p.name}
								tagline={p.tagline}
								price={p.price}
								priceNote={p.note}
								action={
									<Button raised variant="outline">
										{plans.cta}
									</Button>
								}
								features={p.features}
							/>
						))}
					</div>
				</section>

				<section className="mx-auto w-full max-w-[660px]">
					<Accordion>
						{faq.map((f) => (
							<AccordionItem key={f.value} value={f.value}>
								<AccordionTrigger className="text-xl font-normal tracking-[-0.3px]">
									{f.q}
								</AccordionTrigger>
								<AccordionContent>{f.a}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>

				<SiteFooter
					raised
					brand={<SiteHeaderBrand raised />}
					description={footer.description}
					columns={footer.columns}
					legal={footer.legal}
					note={footer.note}
				/>
			</main>
		</div>
	);
}
