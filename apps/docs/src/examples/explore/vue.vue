<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import { computed, ref } from "vue";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Badge } from "@edmi-vue/ui/badge";
import { Card } from "@edmi-vue/ui/card";
import { IndexRow, IndexRowHeader } from "@edmi-vue/ui/index-row";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@edmi-vue/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-vue/ui/select";
import { Table, TableBody, TableHeader } from "@edmi-vue/ui/table";
import { Toggle } from "@edmi-vue/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { indexes, kinds, nav, sorts, strategies } from "./data";

const query = ref("");
const kind = ref("all");
const preIpo = ref(false);
const strategy = ref("any");
const sort = ref("aum");

const rows = computed(() => {
	const q = query.value.trim().toLowerCase();
	return indexes.filter(
		(i) =>
			(kind.value === "all" || i.kind === kind.value) &&
			(!preIpo.value || i.tags?.some((tag) => tag.startsWith("Pre-IPO"))) &&
			(!q || `${i.name} ${i.symbol}`.toLowerCase().includes(q)),
	);
});

function pickKind(v: unknown) {
	if (v) kind.value = String(v);
}
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					raised
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#explore"
				/>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
			<div>
				<div class="flex items-center gap-3">
					<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Explore</h1>
					<Badge variant="secondary">Simulated</Badge>
				</div>
				<p class="mt-1 text-lg text-muted-foreground">34 indexes</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<InputGroup class="h-10 basis-full sm:flex-1 sm:basis-0 sm:max-w-[440px] sm:min-w-64">
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupInput v-model="query" placeholder="Search name, symbol, asset" aria-label="Search indexes" />
				</InputGroup>
				<ToggleGroup type="single" elevation="raised" variant="segmented" :model-value="kind" @update:model-value="pickKind">
					<ToggleGroupItem v-for="k in kinds" :key="k.value" :value="k.value">{{ k.label }}</ToggleGroupItem>
				</ToggleGroup>
				<Toggle elevation="raised" variant="outline" :model-value="preIpo" @update:model-value="(v) => (preIpo = !!v)">Pre-IPO</Toggle>
				<div class="flex items-center gap-3 sm:ml-auto">
					<Select v-model="strategy">
						<SelectTrigger elevation="raised" class="w-40">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="s in strategies" :key="s.value" :value="s.value">{{ s.label }}</SelectItem>
						</SelectContent>
					</Select>
					<Select v-model="sort">
						<SelectTrigger elevation="raised" class="w-28">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="s in sorts" :key="s.value" :value="s.value">{{ s.label }}</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Card raised class="px-6 py-2">
				<Table>
					<TableHeader>
						<IndexRowHeader />
					</TableHeader>
					<TableBody>
						<IndexRow v-for="index in rows" :key="index.symbol" :index="index" />
					</TableBody>
				</Table>
			</Card>
		</div>
	</div>
</template>
