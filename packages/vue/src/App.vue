<script setup lang="ts">
import { type Component, computed } from "vue";

// Visual-check page: every `src/preview/<group>.vue` is rendered twice, light and dark, side by
// side. Add a file per group; nothing to register here.
const modules = import.meta.glob<{ default: Component }>(
	["./preview/*.vue", "!./preview/_*.vue"],
	{ eager: true },
);
const groups = computed(() =>
	Object.entries(modules)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([path, mod]) => ({
			name: path.replace("./preview/", "").replace(".vue", ""),
			component: mod.default,
		})),
);
</script>

<template>
  <div class="min-h-screen bg-stage">
    <section v-for="g in groups" :key="g.name" class="p-6">
      <h2 class="mb-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">{{ g.name }}</h2>
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-xl bg-background p-6 text-foreground">
          <component :is="g.component" />
        </div>
        <div class="dark rounded-xl bg-background p-6 text-foreground">
          <component :is="g.component" />
        </div>
      </div>
    </section>
  </div>
</template>
