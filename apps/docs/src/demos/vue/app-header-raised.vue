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
</script>

<template>
	<AppHeader raised
		:items="items"
		active="#leaderboard"
		:connect-label="connected ? 'dG6r…4mSr' : 'Connect'"
		@connect="connected = !connected"
	/>
</template>
