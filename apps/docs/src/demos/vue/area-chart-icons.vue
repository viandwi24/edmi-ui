<script setup lang="ts">
import { CurveType } from "@unovis/ts";
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { GlobeIcon, MonitorIcon } from "@lucide/vue";
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
  desktop: { label: "Desktop", color: "var(--chart-1)", icon: MonitorIcon },
  mobile: { label: "Mobile", color: "var(--chart-2)", icon: GlobeIcon },
} satisfies ChartConfig;

// Gradient washes (6-26%) under the 2px line.
const fills = ["url(#fill-desktop-icons)", "url(#fill-mobile-icons)"];
const svgDefs = '<linearGradient id="fill-desktop-icons" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--chart-1);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--chart-1);stop-opacity:.03"/></linearGradient><linearGradient id="fill-mobile-icons" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--chart-2);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--chart-2);stop-opacity:.03"/></linearGradient>';

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
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Area Chart - Icons</CardTitle>
      <CardDescription class="text-[13.5px]">Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-4">
      <ChartContainer :config="config" class="aspect-auto h-[203px] w-full [&_[data-vis-xy-container]]:!h-44" cursor>
        <VisXYContainer
          :data="data"
          :margin="{ left: 12, right: 12 }"
          :y-domain="[0, undefined]"
          :svg-defs="svgDefs"
        >
          <VisArea
            :x="x"
            :y="(d: Row) => d.desktop"
            :color="() => fills[0]"
            :opacity="1"
            :curve-type="CurveType.Natural"
          />
          <VisLine :x="x" :y="(d: Row) => d.desktop" :color="config.desktop.color" :curve-type="CurveType.Natural" />
          <VisArea
            :x="x"
            :y="(d: Row) => d.mobile"
            :color="() => fills[1]"
            :opacity="1"
            :curve-type="CurveType.Natural"
          />
          <VisLine :x="x" :y="(d: Row) => d.mobile" :color="config.mobile.color" :curve-type="CurveType.Natural" />
          <VisAxis
            type="x"
            :x="x"
            :tick-values="[0, 1, 2, 3, 4, 5]"
            :tick-format="tickFormat"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <VisAxis type="y" :num-ticks="4" :tick-format="() => ''" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair
            :x="x"
            :y="[(d: Row) => d.desktop, (d: Row) => d.mobile]"
            :template="template"
            :color="(_: Row, i: number) => [config.desktop.color, config.mobile.color][i]"
          />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
