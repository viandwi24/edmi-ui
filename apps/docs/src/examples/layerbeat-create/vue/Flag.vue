<script setup lang="ts">
defineProps<{ flag: { dir: "h" | "v"; colors: string[] } }>();
</script>

<template>
	<svg width="20" height="14" viewBox="0 0 20 14" class="shrink-0 rounded-[2px]" aria-hidden="true">
		<template v-if="flag.dir === 'h'">
			<rect v-for="(c, i) in flag.colors" :key="i" x="0" :y="(i * 14) / 3" width="20" :height="14 / 3 + 0.3" :fill="c" />
		</template>
		<template v-else>
			<rect v-for="(c, i) in flag.colors" :key="i" :x="(i * 20) / 3" y="0" :width="20 / 3 + 0.3" height="14" :fill="c" />
		</template>
	</svg>
</template>
