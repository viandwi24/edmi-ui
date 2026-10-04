<script setup lang="ts">
import { ref } from "vue";
import { AppHeader } from "@edmi-vue/ui/app-header";

const items = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];
const connected = ref(false);

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
	<AppHeader :elevation="l.value"
		:items="items"
		active="#leaderboard"
		:connect-label="connected ? 'dG6r…4mSr' : 'Connect'"
		@connect="connected = !connected"
	/>
		</div>
	</div>
</template>
