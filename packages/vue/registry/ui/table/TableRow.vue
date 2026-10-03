<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/registry/edmi/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<tr
		data-slot="table-row"
		:class="cn('border-b border-border transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-brand/7', props.class)"
	>
		<slot />
	</tr>
</template>
