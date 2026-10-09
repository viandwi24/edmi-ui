<script setup lang="ts">
import { CurveType } from "@unovis/ts";
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { computed, ref } from "vue";
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@edmi-vue/ui/select";

type Row = { date: string; desktop: number; mobile: number };

// 91 days (Apr 1 - Jun 30, 2024) of sample visitors.
const data: Row[] = Array.from({ length: 91 }, (_, i) => {
  const date = new Date(Date.UTC(2024, 3, 1 + i)).toISOString().slice(0, 10);
  const desktop = Math.round(
    220 + 110 * Math.sin(i / 3.1) + 70 * Math.sin(i / 7.3 + 1) + (i % 5) * 9,
  );
  const mobile = Math.round(
    170 + 90 * Math.sin(i / 2.7 + 2) + 60 * Math.cos(i / 6.1) + (i % 4) * 11,
  );
  return { date, desktop, mobile };
});

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const ranges = [
  { value: "90d", label: "Last 3 months", days: 90 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "7d", label: "Last 7 days", days: 7 },
];
const range = ref("90d");
const filtered = computed(() => data.slice(-(ranges.find((r) => r.value === range.value)?.days ?? 90)));

const fills = ["url(#fill-desktop-main)", "url(#fill-mobile-main)"];
const svgDefs =
  '<linearGradient id="fill-desktop-main" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--chart-1);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--chart-1);stop-opacity:.03"/></linearGradient><linearGradient id="fill-mobile-main" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--chart-2);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--chart-2);stop-opacity:.03"/></linearGradient>';

const x = (_: Row, i: number) => i;
const label = (i: number) =>
  new Date(`${filtered.value[Math.round(i)]?.date}`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const template = componentToString(config, ChartTooltipContent, {
  indicator: "dot",
  labelFormatter: (i) => label(Number(i)),
});
</script>

<template>
  <Card class="w-full max-w-3xl gap-0 py-0">
    <CardHeader class="gap-1 border-b px-6 pt-5.5 pb-5.5">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Area Chart - Interactive</CardTitle>
      <CardDescription class="text-[13.5px]">Showing total visitors for the last 3 months</CardDescription>
      <CardAction class="self-center">
        <Select v-model="range">
          <SelectTrigger class="w-40" aria-label="Select a range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="r in ranges" :key="r.value" :value="r.value">{{ r.label }}</SelectItem>
          </SelectContent>
        </Select>
      </CardAction>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-4">
      <ChartContainer :config="config" class="aspect-auto h-64 w-full" cursor>
        <VisXYContainer
          :data="filtered"
          :margin="{ left: 12, right: 12 }"
          :y-domain="[0, undefined]"
          :svg-defs="svgDefs"
        >
          <VisArea :x="x" :y="(d: Row) => d.desktop" :color="() => fills[0]" :opacity="1" :curve-type="CurveType.Natural" />
          <VisLine :x="x" :y="(d: Row) => d.desktop" :color="config.desktop.color" :curve-type="CurveType.Natural" />
          <VisArea :x="x" :y="(d: Row) => d.mobile" :color="() => fills[1]" :opacity="1" :curve-type="CurveType.Natural" />
          <VisLine :x="x" :y="(d: Row) => d.mobile" :color="config.mobile.color" :curve-type="CurveType.Natural" />
          <VisAxis
            type="x"
            :x="x"
            :num-ticks="range === '7d' ? 7 : 8"
            :tick-format="(i: number) => label(i)"
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
