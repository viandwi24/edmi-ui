<script setup lang="ts">
import { GroupedBar } from "@unovis/ts";
import { VisAxis, VisGroupedBar, VisXYContainer, VisXYLabels } from "@unovis/vue";
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
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@edmi-vue/ui/chart";

type Row = { browser: string; visitors: number } & Record<string, string | number>;

const data: Row[] = [
  { browser: "chrome", visitors: 275, chrome: 275 },
  { browser: "safari", visitors: 200, safari: 200 },
  { browser: "firefox", visitors: 187, firefox: 187 },
  { browser: "edge", visitors: 173, edge: 173 },
  { browser: "other", visitors: 90, other: 90 },
];

const config = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const x = (_: Row, i: number) => data.length - 1 - i;
const tickFormat = (i: number) => config[data[data.length - 1 - i]?.browser as keyof typeof config]?.label ?? "";
const colorOf = () => "var(--chart-1)";
const template = componentToString(config, ChartTooltipContent, {
  hideLabel: true,
  indicator: "dot",
});
const triggers = { [GroupedBar.selectors.bar]: template };
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Custom Label</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-52 w-full">
        <VisXYContainer :data="data" :y-domain="[0, undefined]" :margin="{ left: 4, right: 28 }">
          <VisGroupedBar :x="x" :y="(d: Row) => d.visitors" :color="colorOf" orientation="horizontal" :rounded-corners="4" :group-max-width="24" />
          <VisXYLabels :x="(d: Row) => d.visitors + 18" :y="(d: Row) => data.length - 1 - data.findIndex((r) => r.browser === d.browser)" :label="(d: Row) => String(d.visitors)" :label-font-size="12" :clustering="false" background-color="transparent" :color="() => 'var(--foreground)'" />
          <VisAxis type="y" :x="x" :tick-format="tickFormat" :num-ticks="5" :tick-line="false" :domain-line="false" :grid-line="false" />
          <ChartTooltip :triggers="triggers" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
      <b class="inline-flex items-center gap-2 font-medium">
        Trending up by 5.2% this month
        <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>
      </b>
      <span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
    </CardFooter>
  </Card>
</template>
