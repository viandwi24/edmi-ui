<script setup lang="ts">
import { IndexRow, IndexRowHeader, type IndexRowData } from "@edmi-vue/ui/index-row";
import { Card } from "@edmi-vue/ui/card";
import { Table, TableBody, TableHeader } from "@edmi-vue/ui/table";

const tokens = [{ label: "A" }, { label: "N" }, { label: "T" }];

const rows: IndexRowData[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens,
		tags: ["Pre-IPO", "Clone"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
		spark: [4, 5, 4.6, 6, 6.4, 6.1, 7.2, 8, 8.4, 9.1],
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		tokens,
		tags: ["Pre-IPO"],
		creator: "7Ge1…kXSq",
		price: "$0.9791",
		change: "−2.09%",
		aum: "$29K",
		holders: 1,
		spark: [9, 8.6, 8.9, 7.8, 7.5, 7.9, 6.8, 6.4, 6.6, 5.9],
	},
];
</script>

<template>
	<Card class="w-full gap-0 py-0">
		<Table>
			<TableHeader>
				<IndexRowHeader />
			</TableHeader>
			<TableBody>
				<IndexRow v-for="r in rows" :key="r.symbol" :index="r" />
			</TableBody>
		</Table>
	</Card>
</template>
