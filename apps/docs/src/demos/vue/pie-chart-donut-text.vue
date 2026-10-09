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

const config = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const data = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 187 },
  { browser: "edge", visitors: 173 },
  { browser: "other", visitors: 90 },
];

const CX = 128;
const CY = 118;
const RINGS = [[100,62]] as const; // [outer, inner]
const TOTAL = 925;
const p = (r: number, a: number) => [CX + r * Math.sin(a), CY - r * Math.cos(a)];
const f = (n: number) => n.toFixed(1);

let acc = 0;
const slices = data.map((d) => {
	const a0 = (acc / TOTAL) * 2 * Math.PI;
	acc += d.visitors;
	const a1 = (acc / TOTAL) * 2 * Math.PI;
	const large = a1 - a0 > Math.PI ? 1 : 0;
	const paths = RINGS.map(([ro, ri], ring) => {
		const grow = 0;
		const o = ro + grow;
		const [x0, y0] = p(o, a0);
		const [x1, y1] = p(o, a1);
		if (!ri) return `M${CX},${CY}L${f(x0)},${f(y0)}A${o},${o} 0 ${large} 1 ${f(x1)},${f(y1)}Z`;
		const [x2, y2] = p(ri, a1);
		const [x3, y3] = p(ri, a0);
		return `M${f(x0)},${f(y0)}A${o},${o} 0 ${large} 1 ${f(x1)},${f(y1)}L${f(x2)},${f(y2)}A${ri},${ri} 0 ${large} 0 ${f(x3)},${f(y3)}Z`;
	});
	const mid = (a0 + a1) / 2;
	const at = (r: number) => ({ x: CX + r * Math.sin(mid), y: CY - r * Math.cos(mid) });
	return { ...d, paths, at };
});
</script>

<template>
  <Card class="w-full max-w-sm gap-0 py-0">
    <CardHeader class="items-center justify-items-center gap-1 px-6 pt-5.5 pb-0 text-center">
      <CardTitle class="font-semibold text-base tracking-[-0.2px]">Pie Chart - Donut with Text</CardTitle>
      <CardDescription class="text-[13.5px]">January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="items-center px-5 pt-2.5 pb-0">
      <ChartContainer :config="config" class="aspect-auto h-auto w-auto">
        <svg width="256" height="236" viewBox="0 0 256 236" role="img" aria-label="Pie Chart - Donut with Text" class="block overflow-visible">
          <template v-for="s in slices" :key="s.browser">
            <path v-for="(d, ring) in s.paths" :key="ring" :d="d" :fill="`var(--color-${s.browser})`" stroke="var(--card)" stroke-width="2" stroke-linejoin="round" />
          </template>
          <text x="128" y="116" text-anchor="middle" class="fill-foreground font-bold text-3xl tabular-nums tracking-[-1px]">925</text>
        <text x="128" y="136" text-anchor="middle" class="fill-muted-foreground">Visitors</text>
        </svg>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-center gap-1 px-6 pt-3.5 pb-5.5 text-center text-[13.5px]">
      <div class="flex items-center gap-1.5 font-medium">
        Trending up by 5.2% this month
        <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Showing total visitors for the last 6 months</div>
    </CardFooter>
  </Card>
</template>
