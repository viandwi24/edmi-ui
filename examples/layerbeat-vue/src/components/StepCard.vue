<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";

defineProps<{ step: string; title: string }>();
</script>

<template>
	<Card class="gap-0 px-6 pt-[22px] pb-[26px] [--card-spacing:0px]">
		<div class="flex items-center gap-3">
			<Kbd class="h-6 min-w-7 text-[11.5px]">{{ step }}</Kbd>
			<h2 class="text-lg font-semibold tracking-[-0.2px]">{{ title }}</h2>
		</div>
		<slot />
	</Card>
</template>
