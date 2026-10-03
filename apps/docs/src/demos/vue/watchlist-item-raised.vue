<script setup lang="ts">
import { WatchlistItem } from "@edmi-vue/ui/watchlist-item";
</script>

<template>
	<div class="flex w-60 flex-col gap-1.5">
		<WatchlistItem raised href="#mag4" symbol="MAG4" price="1.0000" change="+2.38%" color="var(--chart-1)" active />
		<WatchlistItem raised href="#aifr" symbol="AIFR" price="1.0104" change="+0.84%" color="var(--chart-4)" />
		<WatchlistItem raised href="#atls" symbol="ATLS" price="0.9893" change="−0.64%" color="var(--chart-3)" />
	</div>
</template>
