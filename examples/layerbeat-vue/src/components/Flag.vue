<script setup lang="ts">
import type { Flag } from "@/data/layerbeat";

defineProps<{ flag: Flag; size?: number }>();
</script>

<template>
	<svg :width="size ?? 20" :height="Math.round((size ?? 20) * 0.7)" viewBox="0 0 20 14" class="shrink-0 rounded-[2px]" aria-hidden="true">
		<template v-if="flag.dir === 'h'">
			<rect v-for="(c, i) in flag.colors" :key="i" x="0" :y="(i * 14) / 3" width="20" :height="14 / 3 + 0.3" :fill="c" />
		</template>
		<template v-else>
			<rect v-for="(c, i) in flag.colors" :key="i" :x="(i * 20) / 3" y="0" :width="20 / 3 + 0.3" height="14" :fill="c" />
		</template>
	</svg>
</template>
