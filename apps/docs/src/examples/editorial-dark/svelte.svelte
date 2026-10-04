<script lang="ts">
	import * as Accordion from "@edmi-svelte/ui/accordion";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { SiteFooter } from "@edmi-svelte/ui/footer";
	import * as NavigationMenu from "@edmi-svelte/ui/navigation-menu";
	import { PricingPlan } from "@edmi-svelte/ui/pricing-plan";
	import { SiteHeaderBrand } from "@edmi-svelte/ui/site-header";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import { faq, footer, hero, index, nav, plans } from "./data";

	let audience = $state("individual");
</script>

{#snippet footerBrand()}
	<SiteHeaderBrand raised />
{/snippet}

{#snippet planAction()}
	<Button elevation="raised" variant="outline">{plans.cta}</Button>
{/snippet}

<div class="min-h-svh overflow-x-clip bg-background text-foreground">
	<header class="mx-auto flex max-w-[1328px] items-center justify-between gap-4 px-4 py-4 md:px-10">
		<SiteHeaderBrand raised />
		<NavigationMenu.Root class="max-lg:hidden">
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<div class="grid w-[640px] grid-cols-4 gap-4">
							{#each nav.product as col (col.title)}
								<div class="flex flex-col gap-1">
									<span class="px-2 text-xs text-muted-foreground">{col.title}</span>
									{#each col.links as l (l.href)}
										<NavigationMenu.Link href={l.href}>{l.label}</NavigationMenu.Link>
									{/each}
								</div>
							{/each}
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				{#each nav.others as o (o)}
					<NavigationMenu.Item>
						<NavigationMenu.Link href={`#${o.toLowerCase()}`} class="h-9 px-3">{o}</NavigationMenu.Link>
					</NavigationMenu.Item>
				{/each}
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#login" class="h-9 px-3">{nav.login}</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
		<div class="flex items-center gap-3">
			<Button elevation="raised" variant="secondary" class="max-sm:hidden">{nav.contact}</Button>
			<Button elevation="raised">{nav.launch}</Button>
		</div>
	</header>

	<main class="mx-auto flex max-w-[1328px] flex-col gap-28 px-4 pt-10 pb-16 md:px-10 md:pt-16">
		<section class="grid items-center gap-12 lg:grid-cols-2">
			<div class="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6 text-center">
				<h1 class="text-[56px] leading-[1.05] font-normal tracking-[-2.5px] text-foreground-2 md:text-[72px]">{hero.title}</h1>
				<p class="text-xl text-muted-foreground">{hero.lead}</p>
				<Card raised class="w-full gap-3 p-7">
					<Button elevation="raised" variant="secondary" size="lg">{hero.wallet}</Button>
					<span class="text-[11px] text-muted-foreground">{hero.or}</span>
					<Button elevation="raised" size="lg">{hero.email}</Button>
					<p class="text-[11px] leading-relaxed text-muted-foreground">{hero.terms}</p>
				</Card>
				<Button elevation="raised" variant="outline">{hero.devnet}</Button>
			</div>
			<Card raised class="items-center justify-center p-6 sm:p-12 lg:min-h-[620px]">
				<Card class="w-full max-w-[420px] gap-4 p-7">
					<div class="font-mono text-[11px] text-muted-foreground">{index.label}</div>
					<div class="text-[44px] leading-none font-normal tracking-[-1.5px] text-foreground-2">{index.price}</div>
					<div class="text-xs text-success-text">{index.delta}</div>
					<ul>
						{#each index.rows as r (r.code)}
							<li class="flex items-center gap-3 border-b border-border-2 py-3.5 last:border-b-0">
								<span class="inline-flex size-8 items-center justify-center rounded-full bg-muted font-mono text-[10px]">{r.code}</span>
								<span class="flex-1 text-[15px] font-medium">{r.name}</span>
								<span class="font-mono text-xs text-muted-foreground">{r.weight}</span>
							</li>
						{/each}
					</ul>
					<Button elevation="raised" variant="brand" size="lg">{index.join}</Button>
				</Card>
			</Card>
		</section>

		<section class="flex flex-col items-center gap-10">
			<h2 class="text-[40px] font-normal tracking-[-1.5px] text-foreground-2 md:text-[56px]">{plans.title}</h2>
			<ToggleGroup.Root
				type="single"
				elevation="raised"
				variant="segmented"
				value={audience}
				onValueChange={(v) => v && (audience = v)}
			>
				{#each plans.tabs as t (t.value)}
					<ToggleGroup.Item value={t.value} class="px-4">{t.label}</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<div class="grid w-full gap-5 md:grid-cols-3">
				{#each plans.items as p (p.name)}
					<PricingPlan
						raised
						name={p.name}
						tagline={p.tagline}
						price={p.price}
						priceNote={p.note}
						featuresLead={p.lead}
						features={p.features}
						action={planAction}
					/>
				{/each}
			</div>
		</section>

		<section class="mx-auto w-full max-w-[660px]">
			<Accordion.Root type="single">
				{#each faq as f (f.value)}
					<Accordion.Item value={f.value}>
						<Accordion.Trigger class="text-xl font-normal tracking-[-0.3px]">{f.q}</Accordion.Trigger>
						<Accordion.Content>{f.a}</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</section>

		<SiteFooter
			raised
			brand={footerBrand}
			description={footer.description}
			columns={footer.columns}
			legal={footer.legal}
			note={footer.note}
		/>
	</main>
</div>
