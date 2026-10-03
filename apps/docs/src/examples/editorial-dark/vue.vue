<script setup lang="ts">
import { ref } from "vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@edmi-vue/ui/accordion";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { SiteFooter } from "@edmi-vue/ui/footer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@edmi-vue/ui/navigation-menu";
import { PricingPlan } from "@edmi-vue/ui/pricing-plan";
import { SiteHeaderBrand } from "@edmi-vue/ui/site-header";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { faq, footer, hero, index, nav, plans } from "./data";

const audience = ref("individual");
function pickAudience(v: unknown) {
	if (typeof v === "string" && v) audience.value = v;
}
</script>

<template>
	<div class="min-h-svh overflow-x-clip bg-background text-foreground">
		<header class="mx-auto flex max-w-[1328px] items-center justify-between gap-4 px-4 py-4 md:px-10">
			<SiteHeaderBrand raised />
			<NavigationMenu class="max-lg:hidden">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Product</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div class="grid w-[640px] grid-cols-4 gap-4">
								<div v-for="col in nav.product" :key="col.title" class="flex flex-col gap-1">
									<span class="px-2 text-xs text-muted-foreground">{{ col.title }}</span>
									<NavigationMenuLink v-for="l in col.links" :key="l.href" :href="l.href">{{ l.label }}</NavigationMenuLink>
								</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem v-for="o in nav.others" :key="o">
						<NavigationMenuLink :href="`#${o.toLowerCase()}`" class="h-9 px-3">{{ o }}</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#login" class="h-9 px-3">{{ nav.login }}</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div class="flex items-center gap-3">
				<Button raised variant="secondary" class="max-sm:hidden">{{ nav.contact }}</Button>
				<Button raised>{{ nav.launch }}</Button>
			</div>
		</header>

		<main class="mx-auto flex max-w-[1328px] flex-col gap-28 px-4 pt-10 pb-16 md:px-10 md:pt-16">
			<section class="grid items-center gap-12 lg:grid-cols-2">
				<div class="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6 text-center">
					<h1 class="text-[56px] leading-[1.05] font-normal tracking-[-2.5px] text-foreground-2 md:text-[72px]">{{ hero.title }}</h1>
					<p class="text-xl text-muted-foreground">{{ hero.lead }}</p>
					<Card raised class="w-full gap-3 p-7">
						<Button raised variant="secondary" size="lg">{{ hero.wallet }}</Button>
						<span class="text-[11px] text-muted-foreground">{{ hero.or }}</span>
						<Button raised size="lg">{{ hero.email }}</Button>
						<p class="text-[11px] leading-relaxed text-muted-foreground">{{ hero.terms }}</p>
					</Card>
					<Button raised variant="outline">{{ hero.devnet }}</Button>
				</div>
				<Card raised class="items-center justify-center p-6 sm:p-12 lg:min-h-[620px]">
					<Card class="w-full max-w-[420px] gap-4 p-7">
						<div class="font-mono text-[11px] text-muted-foreground">{{ index.label }}</div>
						<div class="text-[44px] leading-none font-normal tracking-[-1.5px] text-foreground-2">{{ index.price }}</div>
						<div class="text-xs text-success-text">{{ index.delta }}</div>
						<ul>
							<li v-for="r in index.rows" :key="r.code" class="flex items-center gap-3 border-b border-border-2 py-3.5 last:border-b-0">
								<span class="inline-flex size-8 items-center justify-center rounded-full bg-muted font-mono text-[10px]">{{ r.code }}</span>
								<span class="flex-1 text-[15px] font-medium">{{ r.name }}</span>
								<span class="font-mono text-xs text-muted-foreground">{{ r.weight }}</span>
							</li>
						</ul>
						<Button raised variant="brand" size="lg">{{ index.join }}</Button>
					</Card>
				</Card>
			</section>

			<section class="flex flex-col items-center gap-10">
				<h2 class="text-[40px] font-normal tracking-[-1.5px] text-foreground-2 md:text-[56px]">{{ plans.title }}</h2>
				<ToggleGroup type="single" raised variant="segmented" :model-value="audience" @update:model-value="pickAudience">
					<ToggleGroupItem v-for="t in plans.tabs" :key="t.value" :value="t.value" class="px-4">{{ t.label }}</ToggleGroupItem>
				</ToggleGroup>
				<div class="grid w-full gap-5 md:grid-cols-3">
					<PricingPlan
						v-for="p in plans.items"
						:key="p.name"
						raised
						:name="p.name"
						:tagline="p.tagline"
						:price="p.price"
						:price-note="p.note"
						:features="p.features"
					>
						<template #action>
							<Button raised variant="outline">{{ plans.cta }}</Button>
						</template>
					</PricingPlan>
				</div>
			</section>

			<section class="mx-auto w-full max-w-[660px]">
				<Accordion type="single" collapsible>
					<AccordionItem v-for="f in faq" :key="f.value" :value="f.value">
						<AccordionTrigger class="text-xl font-normal tracking-[-0.3px]">{{ f.q }}</AccordionTrigger>
						<AccordionContent>{{ f.a }}</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			<SiteFooter raised :description="footer.description" :columns="footer.columns" :legal="footer.legal" :note="footer.note">
				<template #brand>
					<SiteHeaderBrand raised />
				</template>
			</SiteFooter>
		</main>
	</div>
</template>
