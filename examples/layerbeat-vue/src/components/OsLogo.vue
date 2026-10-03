<script setup lang="ts">
defineProps<{ os: string; color: string; size?: number }>();
</script>

<template>
	<svg v-if="os === 'ubuntu'" :width="size ?? 22" :height="size ?? 22" viewBox="0 0 24 24" class="shrink-0" aria-hidden="true">
		<circle cx="12" cy="12" r="11" :fill="color" />
		<circle cx="12" cy="12" r="5.2" fill="none" stroke="#fff" stroke-width="2.2" />
		<circle cx="5.6" cy="12" r="2" fill="#fff" />
		<circle cx="15.2" cy="6.5" r="2" fill="#fff" />
		<circle cx="15.2" cy="17.5" r="2" fill="#fff" />
	</svg>
	<span v-else class="inline-block shrink-0 rounded-full" :style="{ width: `${size ?? 22}px`, height: `${size ?? 22}px`, background: color }" aria-hidden="true" />
</template>
