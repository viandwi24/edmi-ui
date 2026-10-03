<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/registry/edmi/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
	/** ✦ Right-aligned, mono, tabular numbers (DESIGN §4 rule 10). */
	numeric?: boolean;
	/** ✦ Colours a numeric value: up = brand text, down = destructive text. */
	trend?: "up" | "down";
}>();
</script>

<template>
	<td
		data-slot="table-cell"
		:data-numeric="numeric ? '' : undefined"
		:data-trend="trend"
		:class="cn('p-3 align-middle whitespace-nowrap data-[numeric]:text-right data-[numeric]:font-mono data-[numeric]:tabular-nums data-[trend=down]:text-destructive-text data-[trend=up]:text-success-text [&:has([role=checkbox])]:pr-0', props.class)"
	>
		<slot />
	</td>
</template>
