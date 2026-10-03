<script setup lang="ts">
import { PhMoon, PhSun } from "@phosphor-icons/vue";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { getTheme, setTheme } from "@/lib/theme";

const theme = ref(getTheme());

function toggle() {
	const next = theme.value === "dark" ? "light" : "dark";
	setTheme(next);
	theme.value = next;
}
</script>

<template>
	<Button variant="outline" raised size="icon" aria-label="Toggle theme" @click="toggle">
		<PhSun v-if="theme === 'dark'" />
		<PhMoon v-else />
	</Button>
</template>
