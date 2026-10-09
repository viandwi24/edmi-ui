<script setup lang="ts">
import { VisAxis, VisStackedBar, VisXYContainer } from "@unovis/vue";
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
  ChartLegendContent,
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
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const colors = [config.desktop.color, config.mobile.color];
const x = (_: Row, i: number) => i;
const tickFormat = (i: number) => data[i]?.month.slice(0, 3) ?? "";
const template = componentToString(config, ChartTooltipContent, {
  indicator: "dot",
  labelFormatter: (i) => data[Number(i)]?.month ?? "",
});
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Bar Chart - Stacked + Legend</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-[15.7rem] w-full [&_[data-vis-xy-container]]:!h-52 [&_[data-vis-xy-container]_.bar]:stroke-card [&_[data-vis-xy-container]_.bar]:stroke-2">
        <VisXYContainer :data="data" :y-domain="[0, undefined]" :margin="{ top: 4 }">
          <VisAxis type="y" :num-ticks="4" :tick-line="false" :domain-line="false" :tick-format="() => ''" />
          <VisStackedBar :x="x" :y="[(d: Row) => d.desktop, (d: Row) => d.mobile]" :color="(_: Row, i: number) => colors[i]" :rounded-corners="4" :bar-max-width="24" />
          <VisAxis type="x" :x="x" :tick-format="tickFormat" :num-ticks="6" :tick-line="false" :domain-line="false" :grid-line="false" />
          <ChartTooltip />
          <ChartCrosshair :x="x" :y="[(d: Row) => d.desktop, (d: Row) => d.mobile]" :template="template" :color="(_: Row, i: number) => colors[i]" />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
