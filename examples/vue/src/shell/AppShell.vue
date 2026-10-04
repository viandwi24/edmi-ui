<script setup lang="ts">
import { computed, ref } from "vue";
import {
	getLayoutCookie,
	type Layout,
	LayoutPickerToast,
} from "@/components/layout-picker";
import { ElevationProvider } from "@/components/ui/elevation";
import DashboardLayout from "./DashboardLayout.vue";
import NavbarLayout from "./NavbarLayout.vue";

// First visit: dashboard + a corner toast to pick a layout; the choice lives in a cookie (DESIGN §6).
const layout = ref<Layout>(getLayoutCookie() ?? "dashboard");
const shell = computed(() =>
	layout.value === "navbar" ? NavbarLayout : DashboardLayout,
);
</script>

<template>
	<ElevationProvider mode="layered">
		<component :is="shell">
			<slot />
		</component>
		<LayoutPickerToast @value-change="(v: Layout) => (layout = v)" />
	</ElevationProvider>
</template>
