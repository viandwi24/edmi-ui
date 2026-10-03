<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /** ✦ Right-aligned, mono, tabular numbers (DESIGN §4 rule 10). */
    numeric?: boolean;
}>();
</script>

<template>
	<th
		data-slot="table-head"
		:data-numeric="numeric ? '' : undefined"
		:class="cn('px-3 py-2.5 text-left align-middle text-[12.5px] font-medium whitespace-nowrap text-muted-foreground data-[numeric]:text-right [&:has([role=checkbox])]:pr-0', props.class)"
	>
		<slot />
	</th>
</template>
