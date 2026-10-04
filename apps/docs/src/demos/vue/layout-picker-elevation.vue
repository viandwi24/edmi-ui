<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import { type Layout, LayoutPicker, LayoutPickerToast } from "@edmi-vue/ui/layout-picker";

const layout = ref<Layout>("dashboard");
const toast = ref(false);

const levels = [
	{ value: "sunken", label: "Sunken (-1)" } as const,
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
	<div class="flex flex-col items-start gap-4">
		<LayoutPicker v-model="layout" :elevation="l.value" />
		<Button variant="outline" @click="toast = true">Show corner toast</Button>
		<LayoutPickerToast
			v-if="toast"
			:elevation="l.value"
			default-open
			:default-value="layout"
			@value-change="layout = $event"
			@close="toast = false"
		/>
	</div>
		</div>
	</div>
</template>
