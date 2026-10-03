<script setup lang="ts">
import { SidebarTrigger, useSidebar } from "@edmi-vue/ui/sidebar";

// The sidebar owns the toggle while it is open on desktop; the header takes over when it is closed or on mobile.
const { isMobile, state } = useSidebar();
</script>

<template>
	<SidebarTrigger v-if="isMobile || state === 'collapsed'" />
</template>
