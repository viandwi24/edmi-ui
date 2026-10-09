<script setup lang="ts">
import { TrendingUpIcon } from "@lucide/vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edmi-vue/ui/card";
import { type ChartConfig, ChartContainer } from "@edmi-vue/ui/chart";
import RadarSvg from "./_radar/RadarSvg.vue";

const axes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

const series = [
  { key: "desktop", label: "Desktop", color: "var(--color-desktop)", values: [186, 305, 237, 73, 209, 214] },
];
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="gap-1 px-6 pt-5.5 pb-0">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Radar Chart - Custom Label</CardTitle>
      <CardDescription class="text-[13.5px]">Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-auto w-full">
        <RadarSvg :axes="axes" :series="series" grid="polygon" custom-label />
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-stretch gap-1 px-6 pt-3.5 pb-5.5 text-[13.5px]">
      <b class="flex items-center gap-1.5 font-medium">
        Trending up by 5.2% this month
        <TrendingUpIcon class="size-4" />
      </b>
      <span class="text-muted-foreground">January - June 2024</span>
    </CardFooter>
  </Card>
</template>
