<script setup lang="ts">
import type { Component } from "vue";

// Renders the docs Vue demos (apps/docs/src/demos/vue) by name.
const demos = import.meta.glob<{ default: Component }>(
	"../../../../apps/docs/src/demos/vue/*.vue",
	{ eager: true },
);
const props = defineProps<{ names: string[] }>();
const items = props.names.map((name) => ({
	name,
	component: demos[`../../../../apps/docs/src/demos/vue/${name}.vue`]?.default,
}));
</script>

<template>
	<div class="flex flex-col gap-8">
		<section v-for="d in items" :key="d.name" class="flex flex-col gap-2">
			<h3 class="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{{ d.name }}</h3>
			<div class="rounded-xl border border-border bg-muted p-4">
				<component :is="d.component" v-if="d.component" />
				<span v-else class="text-destructive">missing demo</span>
			</div>
		</section>
	</div>
</template>
