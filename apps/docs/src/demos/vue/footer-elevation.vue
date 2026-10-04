<script setup lang="ts">
import { GlobeIcon, XIcon } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import { SiteFooter, type FooterColumn } from "@edmi-vue/ui/footer";

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

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <SiteFooter :elevation="l.value"
    class="w-full"
    description="Turn a stock thesis into a token. Built on Solana devnet."
    :columns="columns"
    legal="© 2026 Stockbreak"
    note="Not investment advice · devnet only"
  >
    <template #brand>
      <span class="font-brand text-xl font-semibold tracking-tight">Stockbreak</span>
    </template>
    <template #socials>
      <Button variant="secondary" size="icon-sm" aria-label="X"><XIcon /></Button>
      <Button variant="secondary" size="icon-sm" aria-label="Link"><GlobeIcon /></Button>
    </template>
  </SiteFooter>
		</div>
	</div>
</template>
