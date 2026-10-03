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
		:class="cn('border-b border-border transition-colors hover:bg-[color-mix(in_srgb,var(--muted)_50%,var(--card))] has-aria-expanded:bg-[color-mix(in_srgb,var(--muted)_50%,var(--card))] data-[state=selected]:bg-[color-mix(in_srgb,var(--brand)_7%,var(--card))]', props.class)"
	>
		<slot />
	</tr>
</template>
