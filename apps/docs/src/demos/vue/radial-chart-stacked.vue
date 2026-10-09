<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edmi-vue/ui/card";
import { type ChartConfig, ChartContainer, ChartLegendContent } from "@edmi-vue/ui/chart";

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="items-center gap-1 px-6 pt-5.5 pb-0 text-center">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Radial Chart - Stacked</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-auto w-full">
        <svg viewBox="0 0 256 210" role="img" class="mx-auto aspect-[256/210] max-h-52 w-full">
        <path d="M28.0,140.0A100,100 0 0 1 183.0,56.5" fill="none" stroke="var(--color-desktop)" stroke-width="22"><title>Desktop: 1,260</title></path>
        <path d="M184.7,57.6A100,100 0 0 1 228.0,140.0" fill="none" stroke="var(--color-mobile)" stroke-width="22"><title>Mobile: 570</title></path>
        <text x="128" y="120" text-anchor="middle" class="fill-foreground" font-size="28" font-weight="600" letter-spacing="-1">1,830</text>
        <text x="128" y="140" text-anchor="middle" class="fill-muted-foreground" font-size="12">Visitors</text>
        </svg>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
      <b class="inline-flex items-center gap-2 font-medium">
        Trending up by 5.2% this month
        <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>
      </b>
      <span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
    </CardFooter>
  </Card>
</template>
