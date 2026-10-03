<script setup lang="ts">
import { MoreHorizontal } from "@lucide/vue";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

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
				<MoreHorizontal />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-44">
			<slot />
		</DropdownMenuContent>
	</DropdownMenu>
</template>
