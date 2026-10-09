<script setup lang="ts">
import { Donut } from "@unovis/ts";
import { VisDonut, VisSingleContainer } from "@unovis/vue";
import { TrendingUpIcon } from "@lucide/vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edmi-vue/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@edmi-vue/ui/chart";

type Slice = { browser: string; visitors: number } & Record<string, string | number>;

const config = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

// Each slice also carries `[browser]: visitors` so the tooltip can look up its label.
const data: Slice[] = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 187 },
  { browser: "edge", visitors: 173 },
  { browser: "other", visitors: 90 },
].map((d) => ({ ...d, [d.browser]: d.visitors }));

const value = (d: Slice) => d.visitors;
const color = (d: Slice) => config[d.browser as keyof typeof config].color;
const template = componentToString(config, ChartTooltipContent, { hideLabel: true });
const triggers = { [Donut.selectors.segment]: template };
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="items-center justify-items-center gap-1 px-6 pt-5.5 pb-0 text-center">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Pie Chart - Legend</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-[266px] w-full max-w-64 [&_[data-vis-single-container]]:!h-[216px]">
        <VisSingleContainer :data="data" :margin="{ top: 8, bottom: 8 }">
          <VisDonut :value="value" :color="color" :arc-width="0" :pad-angle="0.02" />
          <ChartTooltip :triggers="triggers" />
        </VisSingleContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
      <div class="flex items-center gap-1.5 font-medium">
        Trending up by 5.2% this month
        <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Showing total visitors for the last 6 months</div>
    </CardFooter>
  </Card>
</template>
