<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import { type Layout, LayoutPicker, LayoutPickerToast } from "@edmi-vue/ui/layout-picker";

const layout = ref<Layout>("dashboard");
const toast = ref(false);
</script>

<template>
	<div class="flex flex-col items-start gap-4">
		<LayoutPicker v-model="layout" />
		<Button variant="outline" @click="toast = true">Show corner toast</Button>
		<LayoutPickerToast
			v-if="toast"
			default-open
            :default-value="layout"
			@value-change="layout = $event"
			@close="toast = false"
		/>
	</div>
</template>
