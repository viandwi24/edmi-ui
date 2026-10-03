<script setup lang="ts">
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
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

type Row = { day: string; mag4: number; spyx: number };

const data: Row[] = [
  { day: "Sep 1", mag4: 4.0, spyx: 2.0 },
  { day: "Sep 7", mag4: 5.6, spyx: 2.6 },
  { day: "Sep 13", mag4: 6.4, spyx: 3.4 },
  { day: "Sep 19", mag4: 9.8, spyx: 5.1 },
  { day: "Sep 21", mag4: 11.0, spyx: 6.4 },
  { day: "Sep 25", mag4: 12.3, spyx: 7.2 },
  { day: "Oct 1", mag4: 14.1, spyx: 8.0 },
];

const config = {
  mag4: { label: "MAG4", color: "var(--chart-1)" },
  spyx: { label: "SPYx", color: "var(--chart-2)" },
} satisfies ChartConfig;

const x = (_: Row, i: number) => i;
const tickFormat = (i: number) => data[i]?.day ?? "";
const template = componentToString(config, ChartTooltipContent, {
  indicator: "dot",
  labelFormatter: (i) => tickFormat(Number(i)),
});
</script>

<template>
  <Card class="w-full max-w-lg">
    <CardHeader>
      <CardTitle>NAV vs benchmark</CardTitle>
      <CardDescription>Last 30 days</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="config" class="aspect-auto h-52 w-full" cursor>
        <VisXYContainer :data="data" :margin="{ left: 4, right: 4 }" :y-domain="[0, undefined]">
          <VisArea :x="x" :y="(d: Row) => d.spyx" :color="config.spyx.color" :opacity="0.12" />
          <VisLine :x="x" :y="(d: Row) => d.spyx" :color="config.spyx.color" :line-dash-array="[5, 4]" />
          <VisArea :x="x" :y="(d: Row) => d.mag4" :color="config.mag4.color" :opacity="0.2" />
          <VisLine :x="x" :y="(d: Row) => d.mag4" :color="config.mag4.color" />
          <VisAxis
            type="x"
            :x="x"
            :tick-format="tickFormat"
            :num-ticks="4"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :x="x"
            :y="[(d: Row) => d.mag4, (d: Row) => d.spyx]"
            :template="template" :color="() => config.mag4.color" />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
