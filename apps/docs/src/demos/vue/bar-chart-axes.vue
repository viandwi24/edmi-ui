<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";
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

type Row = { month: string; desktop: number; mobile: number };

const data: Row[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

const x = (_: Row, i: number) => i;
const tickFormat = (i: number) => data[i]?.month.slice(0, 3) ?? "";
const template = componentToString(config, ChartTooltipContent, {
  indicator: "dot",
  hideLabel: true,
  labelFormatter: (i) => data[Number(i)]?.month ?? "",
});
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Axes</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-52 w-full">
        <VisXYContainer :data="data" :y-domain="[0, 400]" :margin="{ top: 8 }">
          <VisAxis type="y" :tick-values="[0, 133, 266, 400]" :tick-line="false" :domain-line="false" />
          <VisGroupedBar :x="x" :y="(d: Row) => d.desktop" :color="config.desktop.color" :rounded-corners="4" :group-max-width="24" />
          <VisAxis type="x" :x="x" :tick-format="tickFormat" :num-ticks="6" :tick-line="false" :domain-line="false" :grid-line="false" />
          <ChartTooltip />
          <ChartCrosshair :x="x" :y="(d: Row) => d.desktop" :template="template" :color="() => config.desktop.color" />
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
