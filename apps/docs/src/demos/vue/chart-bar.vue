<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";
import {
  Card,
  CardContent,
  CardDescription,
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

type Row = { day: string; joins: number; exits: number };

const data: Row[] = [
  { day: "M", joins: 62, exits: 37 },
  { day: "T", joins: 80, exits: 48 },
  { day: "W", joins: 54, exits: 32 },
  { day: "T", joins: 96, exits: 58 },
  { day: "F", joins: 70, exits: 42 },
  { day: "S", joins: 110, exits: 66 },
  { day: "S", joins: 88, exits: 53 },
];

// No colors given: series fall back to --chart-1, --chart-2 by order (✦).
const config = {
  joins: { label: "Joins" },
  exits: { label: "Exits" },
} satisfies ChartConfig;

const colors = ["var(--chart-1)", "var(--chart-2)"];
const x = (_: Row, i: number) => i;
const tickFormat = (i: number) => data[i]?.day ?? "";
const template = componentToString(config, ChartTooltipContent, {
  indicator: "line",
  labelFormatter: (i) => tickFormat(Number(i)),
});
</script>

<template>
  <Card class="w-full max-w-md gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Joins vs exits</CardTitle>
      <CardDescription class="text-[13.5px]">This week</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-48 w-full">
        <VisXYContainer :data="data" :y-domain="[0, undefined]">
          <VisGroupedBar
            :x="x"
            :y="[(d: Row) => d.joins, (d: Row) => d.exits]"
            :color="(_: Row, i: number) => colors[i]"
            :rounded-corners="4"
          />
          <VisAxis
            type="x"
            :x="x"
            :tick-format="tickFormat"
            :num-ticks="7"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :x="x"
            :y="[(d: Row) => d.joins, (d: Row) => d.exits]"
            :template="template" :color="(_: Row, i: number) => colors[i]" />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
