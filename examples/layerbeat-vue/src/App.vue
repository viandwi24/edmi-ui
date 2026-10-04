<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import CreateBeatVps from "@/pages/CreateBeatVps.vue";
import AppShell from "@/shell/AppShell.vue";
</script>

<template>
	<AppShell>
		<CreateBeatVps />
	</AppShell>
	<Toaster elevation="raised" position="bottom-right" />
</template>
