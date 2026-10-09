<script setup lang="ts">
// Docs helper (not a demo): Unovis has no radar chart, so the radar is plain SVG inside ChartContainer.
// Geometry and styling follow refs/edmi-ui/reference/ChartRadar*.dc.html (hairline grid, 2px series polygon,
// 8px dots with a 2px surface ring, labels in muted text, tooltip = ChartTooltipContent look).
import { computed, ref } from "vue";

type Series = { key: string; label: string; color: string; values: number[] };

const props = withDefaults(
  defineProps<{
    axes: string[];
    series: Series[];
    max?: number;
    /** polygon | circle | custom (two polygon rings) | none */
    grid?: "polygon" | "circle" | "custom" | "none";
    radialLines?: boolean;
    dots?: boolean;
    fillOpacity?: number;
    /** custom: label is "<value> (<axis>)" with a bold value */
    customLabel?: boolean;
    cy?: number;
    radius?: number;
    height?: number;
    tooltipIndicator?: "line" | "dot";
  }>(),
  {
    max: 400,
    grid: "polygon",
    radialLines: true,
    dots: false,
    fillOpacity: 0.18,
    customLabel: false,
    cy: 135,
    radius: 88,
    height: 262,
    tooltipIndicator: "line",
  },
);

const W = 256;
const CX = W / 2;
const n = computed(() => props.axes.length);
const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n.value;
const pt = (i: number, r: number) => ({
  x: CX + r * Math.cos(angle(i)),
  y: props.cy + r * Math.sin(angle(i)),
});
const f = (v: number) => v.toFixed(1);
const poly = (r: number) =>
  Array.from({ length: n.value }, (_, i) => {
    const p = pt(i, r);
    return `${f(p.x)},${f(p.y)}`;
  }).join(" ");

const rings = computed(() => {
  if (props.grid === "none") return [];
  if (props.grid === "custom") return [props.radius / 2, props.radius];
  return [props.radius / 3, (2 * props.radius) / 3, props.radius];
});
const spokes = computed(() =>
  props.grid === "none" || !props.radialLines ? [] : Array.from({ length: n.value }, (_, i) => pt(i, props.radius)),
);

const shapes = computed(() =>
  props.series.map((s) => {
    const points = s.values.map((v, i) => pt(i, (Math.min(v, props.max) / props.max) * props.radius));
    return { ...s, points, path: points.map((p) => `${f(p.x)},${f(p.y)}`).join(" ") };
  }),
);

const labels = computed(() =>
  props.axes.map((axis, i) => {
    const r = props.radius + 16;
    const a = angle(i);
    const cos = Math.cos(a);
    return {
      axis,
      value: props.series[0]?.values[i],
      x: CX + r * cos,
      y: props.cy + r * Math.sin(a) + 4 - (props.customLabel ? 3 : 0),
      anchor: cos > 0.1 ? "start" : cos < -0.1 ? "end" : "middle",
    };
  }),
);

const hover = ref<{ i: number; x: number; y: number } | null>(null);
function onMove(e: PointerEvent) {
  const el = e.currentTarget as SVGSVGElement;
  const rect = el.getBoundingClientRect();
  const scale = rect.width / W;
  const dx = (e.clientX - rect.left) / scale - CX;
  const dy = (e.clientY - rect.top) / scale - props.cy;
  let a = Math.atan2(dy, dx) + Math.PI / 2;
  a = (a + 2 * Math.PI) % (2 * Math.PI);
  const i = Math.round(a / ((2 * Math.PI) / n.value)) % n.value;
  hover.value = { i, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 };
}
const gridStroke = "color-mix(in srgb,var(--border) 75%,var(--card))";
</script>

<template>
  <div class="relative mx-auto w-full max-w-64" :style="{ aspectRatio: `${W} / ${height}` }">
    <svg
      :viewBox="`0 0 ${W} ${height}`"
      class="size-full overflow-visible"
      role="img"
      aria-label="Radar chart"
      @pointermove="onMove"
      @pointerleave="hover = null"
    >
      <template v-if="grid === 'circle'">
        <circle v-for="r in rings" :key="r" :cx="CX" :cy="cy" :r="r" fill="none" :stroke="gridStroke" />
      </template>
      <template v-else>
        <polygon v-for="r in rings" :key="r" :points="poly(r)" fill="none" :stroke="gridStroke" />
      </template>
      <line v-for="(p, i) in spokes" :key="i" :x1="CX" :y1="cy" :x2="p.x" :y2="p.y" :stroke="gridStroke" />
      <g v-for="s in shapes" :key="s.key">
        <polygon
          :points="s.path"
          :fill="s.color"
          :fill-opacity="fillOpacity"
          :stroke="s.color"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <template v-if="dots">
          <circle
            v-for="(p, i) in s.points"
            :key="i"
            :cx="p.x"
            :cy="p.y"
            r="4"
            :fill="s.color"
            stroke="var(--card)"
            stroke-width="2"
          />
        </template>
      </g>
      <text
        v-for="(l, i) in labels"
        :key="i"
        :x="l.x"
        :y="l.y"
        :text-anchor="l.anchor"
        class="fill-muted-foreground text-xs"
      >
        <template v-if="customLabel">
          <tspan class="fill-foreground font-semibold">{{ l.value }}</tspan>
          <tspan> ({{ l.axis }})</tspan>
        </template>
        <template v-else>{{ l.axis }}</template>
      </text>
    </svg>
    <div
      v-if="hover"
      class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground text-xs shadow-floating"
      :style="{ left: `${hover.x}px`, top: `${hover.y}px` }"
    >
      <div class="font-medium text-foreground">{{ axes[hover.i] }}</div>
      <div v-for="s in series" :key="s.key" class="flex items-center gap-2">
        <span
          :class="tooltipIndicator === 'line' ? 'min-h-3.5 w-1 self-stretch rounded-[2px]' : 'size-2 shrink-0 rounded-[2px]'"
          :style="{ backgroundColor: s.color }"
        />
        <span class="flex-1 text-muted-foreground">{{ s.label }}</span>
        <span class="ml-3 font-semibold text-foreground tabular-nums">{{ s.values[hover.i].toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>
