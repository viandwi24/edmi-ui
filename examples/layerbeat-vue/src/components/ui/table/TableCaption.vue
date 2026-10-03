<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<caption
		data-slot="table-caption"
		:class="cn('border-t border-border p-2.5 text-center text-[13px] text-muted-foreground', props.class)"
	>
		<slot />
	</caption>
</template>
