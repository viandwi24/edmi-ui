<script setup lang="ts">
import Chart from "./_data/chart.vue";
import ChartBar from "./_data/chart-bar.vue";
import DataTable from "./_data/data-table.vue";
import Table from "./_data/table.vue";
import DemoList from "./_demo-list.vue";
</script>

<template>
	<div class="flex flex-col gap-6">
		<Table />
		<div class="flex flex-wrap gap-6">
			<Chart />
			<ChartBar />
		</div>
		<DataTable />
		<DemoList :names="['data-table-elevation']" />
	</div>
</template>
