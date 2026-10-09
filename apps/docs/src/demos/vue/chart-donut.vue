<script setup lang="ts">
import { Donut } from "@unovis/ts";
import { VisDonut, VisSingleContainer } from "@unovis/vue";
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
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@edmi-vue/ui/chart";

type Slice = { token: string; weight: number } & Record<string, string | number>;

// Each slice also carries `[token]: weight` so the tooltip can look up its label.
const data: Slice[] = [
  { token: "nvdax", weight: 32 },
  { token: "msftx", weight: 28 },
  { token: "aaplx", weight: 24 },
  { token: "anthrp", weight: 16 },
].map((d) => ({ ...d, [d.token]: d.weight }));

const config = {
  nvdax: { label: "NVDAx", color: "var(--chart-1)" },
  msftx: { label: "MSFTx", color: "var(--chart-2)" },
  aaplx: { label: "AAPLx", color: "var(--chart-3)" },
  anthrp: { label: "ANTHRP-pre", color: "var(--chart-4)" },
} satisfies ChartConfig;

const value = (d: Slice) => d.weight;
const color = (d: Slice) => config[d.token as keyof typeof config].color;
const template = componentToString(config, ChartTooltipContent, {
  hideLabel: true,
  indicator: "dashed",
});
const triggers = { [Donut.selectors.segment]: template };
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Allocation</CardTitle>
      <CardDescription class="text-[13.5px]">MAG4 weights</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-60 w-full">
        <VisSingleContainer :data="data" :margin="{ top: 8, bottom: 8 }">
          <VisDonut :value="value" :color="color" :arc-width="26" :pad-angle="0.02" />
          <ChartTooltip :triggers="triggers" />
        </VisSingleContainer>
        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
