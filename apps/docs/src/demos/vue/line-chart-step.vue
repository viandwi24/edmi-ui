<script setup lang="ts">
import { CurveType } from "@unovis/ts";
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
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
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@edmi-vue/ui/chart";

type Row = { month: string; desktop: number };

const data: Row[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

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
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Line Chart - Step</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-44 w-full" cursor>
        <VisXYContainer :data="data" :margin="{ left: 12, right: 12 }" :y-domain="[0, undefined]" :x-domain="[0, 5]">
          <VisLine :x="x" :y="(d: Row) => d.desktop" color="var(--chart-1)" :curve-type="CurveType.Step" />
          <VisAxis type="y" :tick-format="() => ''" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <VisAxis
            type="x"
            :x="x"
            :tick-format="tickFormat"
            :num-ticks="6"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair :x="x" :y="[(d: Row) => d.desktop]" :template="template" color="var(--chart-1)" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
      <b class="flex items-center gap-1.5 font-medium">
        Trending up by 5.2% this month
        <TrendingUpIcon class="size-4" />
      </b>
      <span class="text-muted-foreground">Showing total visitors for the last 6 months</span>
    </CardFooter>
  </Card>
</template>
