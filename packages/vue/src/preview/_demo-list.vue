<script setup lang="ts">
import { defineAsyncComponent } from "vue";

// Renders the docs Vue demos (apps/docs/src/demos/vue) by name.
const demos = import.meta.glob("../../../../apps/docs/src/demos/vue/*.vue");
const props = defineProps<{ names: string[] }>();
const items = props.names.map((name) => {
	const load = demos[`../../../../apps/docs/src/demos/vue/${name}.vue`];
	return { name, component: load ? defineAsyncComponent(load as never) : null };
});
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
