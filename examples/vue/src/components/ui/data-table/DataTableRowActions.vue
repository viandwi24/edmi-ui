<script setup lang="ts">
import { PhDotsThree } from '@phosphor-icons/vue';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * ✦ Row actions trigger: ghost icon button + DropdownMenu. Pass
 * `DropdownMenuItem`s (or groups) in the default slot.
 */
withDefaults(defineProps<{ label?: string }>(), { label: "Open menu" });
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" size="icon-xs">
				<span class="sr-only">{{ label }}</span>
				<PhDotsThree />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-44">
			<slot />
		</DropdownMenuContent>
	</DropdownMenu>
</template>
