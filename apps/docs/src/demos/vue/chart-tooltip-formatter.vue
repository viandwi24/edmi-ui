<script setup lang="ts">
import { VisAxis, VisStackedBar, VisXYContainer } from "@unovis/vue";
import { defineComponent, h, type PropType } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@edmi-vue/ui/card";
import {
  chartColor,
  type ChartConfig,
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@edmi-vue/ui/chart";

type Row = { date: string; running: number; swimming: number };

const data: Row[] = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
];

const config = {
  running: { label: "Running", color: "var(--chart-1)" },
  swimming: { label: "Swimming", color: "var(--chart-2)" },
} satisfies ChartConfig;

const colors = ["var(--chart-1)", "var(--chart-2)"];
const weekday = (date = "") =>
  new Date(date).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
const x = (_: Row, i: number) => i;
const tickFormat = (i: number) => (Number.isInteger(i) ? weekday(data[i]?.date) : "");

// The row layout (value right-aligned with a unit, derived total row) is composed with the default slot of ChartTooltipContent.
const KcalTooltip = defineComponent({
  props: {
    payload: { type: Object as PropType<Row>, default: () => ({}) },
    config: { type: Object as PropType<ChartConfig>, default: () => ({}) },
    x: { type: Number, default: 0 },
  },
  setup(props) {
    return () => {
      const row = props.payload;
      const rows = (["running", "swimming"] as const).map((key) =>
        h("div", { class: "flex w-full items-center gap-2" }, [
          h("div", {
            class: "size-2 shrink-0 rounded-[2px] bg-(--color-bg)",
            style: "--color-bg: " + chartColor(props.config, key),
          }),
          h("span", { class: "flex-1 text-muted-foreground" }, String(props.config[key]?.label)),
          h(
            "span",
            { class: "ml-3 flex items-baseline gap-0.5 whitespace-nowrap font-semibold text-foreground tabular-nums" },
            [String(row[key]), h("span", { class: "font-normal text-muted-foreground" }, "kcal")],
          ),
        ]),
      );
      return h(
        ChartTooltipContent,
        { payload: props.payload, config: props.config, x: props.x },
        {
          default: () => [
            h("div", { class: "font-medium text-foreground" }, weekday(row.date)),
            h("div", { class: "grid gap-1.5" }, rows),
          ],
        },
      );
    };
  },
});
const template = componentToString(config, KcalTooltip as never);
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Tooltip - Formatter</CardTitle>
      <CardDescription class="text-[13.5px]">Tooltip with custom formatter.</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-4">
      <ChartContainer :config="config" class="aspect-auto h-44 w-full">
        <VisXYContainer :data="data" :y-domain="[0, undefined]">
          <VisStackedBar
            :x="x"
            :y="[(d: Row) => d.running, (d: Row) => d.swimming]"
            :color="(_: Row, i: number) => colors[i]"
            :bar-max-width="24"
            :bar-padding="0.3"
            :rounded-corners="4"
          />
          <VisAxis type="y" :num-ticks="4" :tick-format="() => ''" :tick-line="false" :domain-line="false" />
          <VisAxis
            type="x"
            :x="x"
            :tick-values="[0, 1, 2, 3, 4, 5]"
            :tick-format="tickFormat"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :x="x"
            :y="[(d: Row) => d.running, (d: Row) => d.running + d.swimming]"
            :template="template"
            :color="(_: Row, i: number) => colors[i]"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
