<script setup lang="ts">
import { AppHeader } from "@/components/app-header";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { nav } from "@/data/markets";
</script>

<template>
	<div class="min-h-svh">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#explore"
				/>
				<ThemeToggle />
			</div>
		</div>
		<slot />
	</div>
</template>
