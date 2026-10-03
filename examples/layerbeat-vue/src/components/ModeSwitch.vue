<script setup lang="ts">
import { PhMoon, PhSun } from "@phosphor-icons/vue";
import { ref } from "vue";
import { Switch } from "@/components/ui/switch";
import { getTheme, setTheme } from "@/lib/theme";

// Light/dark mode: `.dark` on <html> + a cookie (index.html applies it before first paint).
const dark = ref(getTheme() === "dark");

function update(value: boolean) {
	dark.value = value;
	setTheme(value ? "dark" : "light");
}
</script>

<template>
	<div class="flex items-center gap-2 text-muted-foreground">
		<PhSun class="size-4" aria-hidden="true" />
		<Switch :model-value="dark" aria-label="Dark mode" @update:model-value="update" />
		<PhMoon class="size-4" aria-hidden="true" />
	</div>
</template>
