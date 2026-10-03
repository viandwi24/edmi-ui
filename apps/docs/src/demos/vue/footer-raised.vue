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
</script>

<template>
  <SiteFooter raised
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
</template>
