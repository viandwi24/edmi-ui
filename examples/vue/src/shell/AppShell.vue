<script setup lang="ts">
import { computed, ref } from "vue";
import {
	getLayoutCookie,
	type Layout,
	LayoutPickerToast,
} from "@/components/layout-picker";
import DashboardLayout from "./DashboardLayout.vue";
import NavbarLayout from "./NavbarLayout.vue";

// First visit: dashboard + a corner toast to pick a layout; the choice lives in a cookie (DESIGN §6).
const layout = ref<Layout>(getLayoutCookie() ?? "dashboard");
const shell = computed(() =>
	layout.value === "navbar" ? NavbarLayout : DashboardLayout,
);
</script>

<template>
	<component :is="shell">
		<slot />
	</component>
	<LayoutPickerToast raised @value-change="(v: Layout) => (layout = v)" />
</template>
