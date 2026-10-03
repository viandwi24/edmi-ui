<script setup lang="ts">
import { Card } from "@edmi-vue/ui/card";
import { Kbd } from "@edmi-vue/ui/kbd";

defineProps<{ index: string; title: string; description?: string }>();
</script>

<template>
	<Card class="gap-0 px-[26px] pt-[22px] pb-[26px] [--card-spacing:0px]">
		<div class="flex items-center gap-3">
			<Kbd class="h-6 min-w-7 text-[11.5px]">{{ index }}</Kbd>
			<h2 class="text-lg font-semibold tracking-[-0.2px]">{{ title }}</h2>
		</div>
		<p v-if="description" class="mt-3 text-sm text-muted-foreground">{{ description }}</p>
		<div class="mt-[18px]"><slot /></div>
	</Card>
</template>
