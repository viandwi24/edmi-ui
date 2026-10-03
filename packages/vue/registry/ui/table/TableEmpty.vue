<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/registry/edmi/lib/utils";

import TableCell from "./TableCell.vue";
import TableRow from "./TableRow.vue";

const props = withDefaults(
	defineProps<{
		class?: HTMLAttributes["class"];
		colspan?: number;
	}>(),
	{ colspan: 1 },
);
</script>

<template>
	<TableRow class="hover:bg-transparent">
		<TableCell :colspan="props.colspan" :class="cn('text-foreground', props.class)">
			<div class="flex h-24 items-center justify-center text-muted-foreground">
				<slot />
			</div>
		</TableCell>
	</TableRow>
</template>
