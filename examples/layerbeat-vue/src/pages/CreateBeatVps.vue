<script setup lang="ts">
import { PhCheckCircle } from "@phosphor-icons/vue";
import { computed, ref } from "vue";
import Flag from "@/components/Flag.vue";
import OsLogo from "@/components/OsLogo.vue";
import ServerSummary from "@/components/ServerSummary.vue";
import StepCard from "@/components/StepCard.vue";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	configurationCount,
	type Location,
	money,
	osImages,
	type Plan,
	planCategories,
	regions,
	terms,
} from "@/data/layerbeat";

// The page does not know about the shell; it only needs a container.
const name = ref("");
const regionId = ref("europe");
const locationId = ref("frankfurt");
const categoryId = ref("general");
const view = ref<"cards" | "list">("list");
const sku = ref("BEAT2C2G-S");
const osId = ref("ubuntu");
const versions = ref<Record<string, string>>(Object.fromEntries(osImages.map((o) => [o.id, o.versions[0]])));
const months = ref(1);
const autoRenew = ref(true);
const step = ref("configure");

const allLocations = regions.flatMap((r) => r.locations);
const allPlans = planCategories.flatMap((c) => c.plans.map((p) => ({ ...p, category: c.label })));

const location = computed<Location>(() => allLocations.find((l) => l.id === locationId.value) ?? allLocations[0]);
const category = computed(() => planCategories.find((c) => c.id === categoryId.value) ?? planCategories[0]);
const plan = computed(() => allPlans.find((p) => p.sku === sku.value) ?? allPlans[0]);
const os = computed(() => osImages.find((o) => o.id === osId.value) ?? osImages[0]);
const term = computed(() => terms.find((t) => t.months === months.value) ?? terms[0]);
const total = computed(() => plan.value.price * term.value.months * (1 - term.value.discount / 100));

// Keep the selection inside the visible tab: switching a tab selects its first option.
function pickRegion(id: string | number) {
	regionId.value = String(id);
	const region = regions.find((r) => r.id === regionId.value);
	if (region && !region.locations.some((l) => l.id === locationId.value)) locationId.value = region.locations[0].id;
}
function pickCategory(id: string | number) {
	categoryId.value = String(id);
	const next = planCategories.find((c) => c.id === categoryId.value);
	if (next && !next.plans.some((p) => p.sku === sku.value)) sku.value = next.plans[0].sku;
}
function pickTerm(value: unknown) {
	if (value) months.value = Number(value);
}
function pickView(value: unknown) {
	if (value) view.value = value as "cards" | "list";
}
function pickOs(id: string) {
	osId.value = id;
}
function pickVersion(id: string, value: unknown) {
	if (typeof value === "string") versions.value[id] = value;
	osId.value = id;
}
function toSummary() {
	step.value = "review";
	document.getElementById("summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
const isSelected = (p: Plan) => p.sku === sku.value;
</script>

<template>
	<div class="mx-auto w-full max-w-[1280px] px-4 pt-8 pb-12 md:px-9">
		<h1 class="text-[32px] font-semibold tracking-[-0.8px]">Create a BeatVPS</h1>
		<p class="mt-2 text-[15px] text-muted-foreground">A place for your next project. Choose a location, configuration and image.</p>

		<Card class="mt-6 p-1.5 [--card-spacing:6px]">
			<Tabs :model-value="step" @update:model-value="(v) => (v === 'review' ? toSummary() : (step = String(v)))">
				<TabsList variant="pills">
					<TabsTrigger value="configure"><span class="font-mono text-[11.5px]">01</span> Configure</TabsTrigger>
					<TabsTrigger value="review"><span class="font-mono text-[11.5px]">02</span> Review &amp; purchase</TabsTrigger>
				</TabsList>
			</Tabs>
		</Card>

		<div class="mt-6 flex flex-col items-start gap-6 lg:flex-row">
			<div class="flex min-w-0 w-full flex-1 flex-col gap-5">
				<!-- 01 name -->
				<StepCard step="01" title="Name your server">
					<Field class="mt-5 gap-2">
						<Label for="server-name">Server name</Label>
						<Input id="server-name" v-model="name" placeholder="my-first-server" autocomplete="off" />
						<FieldDescription>A name to identify this server in your workspace.</FieldDescription>
					</Field>
				</StepCard>

				<!-- 02 location -->
				<StepCard step="02" title="Choose a location">
					<p class="mt-3 text-sm text-muted-foreground">Place your server close to your users. Each location has its own configurations and images.</p>
					<Tabs :model-value="regionId" class="mt-5 gap-[18px]" @update:model-value="pickRegion">
						<div class="overflow-x-auto">
							<TabsList variant="line">
								<TabsTrigger v-for="r in regions" :key="r.id" :value="r.id" class="px-2">{{ r.label }}</TabsTrigger>
							</TabsList>
						</div>
					</Tabs>
					<RadioGroup v-model="locationId" class="mt-[18px] grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
						<template v-for="r in regions" :key="r.id">
							<FieldLabel v-for="l in r.locations" v-show="r.id === regionId" :key="l.id" :for="`loc-${l.id}`">
								<Field orientation="horizontal" class="items-center gap-2.5">
									<Flag :flag="l.flag" />
									<span class="flex-1 text-sm font-medium">{{ l.city }}</span>
									<PhCheckCircle v-if="l.id === locationId" class="size-4 text-brand" weight="regular" />
									<span v-else class="font-mono text-[11px] text-muted-foreground">{{ l.ms }} ms</span>
									<RadioGroupItem :id="`loc-${l.id}`" :value="l.id" class="sr-only" />
								</Field>
							</FieldLabel>
						</template>
					</RadioGroup>
				</StepCard>

				<!-- 03 configuration -->
				<StepCard step="03" title="Choose your configuration">
					<div class="mt-3.5 flex flex-wrap items-center justify-between gap-3">
						<span class="text-[13.5px] text-muted-foreground">{{ configurationCount }} configurations · monthly prices</span>
						<ToggleGroup type="single" variant="segmented" elevation="raised" :model-value="view" aria-label="View" @update:model-value="pickView">
							<ToggleGroupItem value="cards" class="px-3">Cards</ToggleGroupItem>
							<ToggleGroupItem value="list" class="px-3">List</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<Tabs :model-value="categoryId" class="mt-3.5" @update:model-value="pickCategory">
						<div class="overflow-x-auto">
							<TabsList variant="line">
								<TabsTrigger v-for="c in planCategories" :key="c.id" :value="c.id" class="px-2">{{ c.label }}</TabsTrigger>
							</TabsList>
						</div>
					</Tabs>
					<RadioGroup v-model="sku" class="mt-3.5 gap-0">
						<Table v-if="view === 'list'">
							<TableHeader>
								<TableRow class="hover:bg-transparent">
									<TableHead class="w-9" />
									<TableHead>Plan</TableHead>
									<TableHead>vCPU</TableHead>
									<TableHead>RAM</TableHead>
									<TableHead>SSD</TableHead>
									<TableHead>Transfer</TableHead>
									<TableHead class="text-right">Price / mo</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow
									v-for="p in category.plans"
									:key="p.sku"
									class="cursor-pointer"
									:data-state="isSelected(p) ? 'selected' : undefined"
									@click="sku = p.sku"
								>
									<TableCell class="w-9 pr-0">
										<RadioGroupItem :id="`plan-${p.sku}`" :value="p.sku" :aria-label="p.sku" @click.stop />
									</TableCell>
									<TableCell class="font-mono text-[12.5px]">{{ p.sku }}</TableCell>
									<TableCell class="font-mono">{{ p.vcpu }}</TableCell>
									<TableCell class="font-mono">{{ p.ramGb }} GB</TableCell>
									<TableCell class="font-mono">{{ p.ssdGb }} GB</TableCell>
									<TableCell class="font-mono text-muted-foreground">{{ p.transferTb }} TB</TableCell>
									<TableCell numeric :class="isSelected(p) ? 'font-semibold' : ''">{{ money(p.price) }}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
							<FieldLabel v-for="p in category.plans" :key="p.sku" :for="`plan-${p.sku}`">
								<Field class="gap-2">
									<div class="flex items-center justify-between gap-2">
										<span class="font-mono text-[12.5px]">{{ p.sku }}</span>
										<RadioGroupItem :id="`plan-${p.sku}`" :value="p.sku" />
									</div>
									<span class="font-mono text-xs text-muted-foreground">{{ p.vcpu }} vCPU · {{ p.ramGb }} GB · {{ p.ssdGb }} GB</span>
									<span class="font-mono text-lg tracking-[-0.3px]">{{ money(p.price) }}<span class="text-xs text-muted-foreground"> / mo</span></span>
								</Field>
							</FieldLabel>
						</div>
					</RadioGroup>
				</StepCard>

				<!-- 04 image -->
				<StepCard step="04" title="Choose an image">
					<p class="mt-3 text-sm text-muted-foreground">The operating system installed on first boot.</p>
					<RadioGroup v-model="osId" class="mt-[18px] grid grid-cols-2 gap-3 lg:grid-cols-4">
						<div
							v-for="o in osImages"
							:key="o.id"
							:data-state="o.id === osId ? 'checked' : 'unchecked'"
							class="flex cursor-pointer flex-col gap-3 rounded-lg border border-border bg-card p-3.5 transition-colors hover:bg-muted data-[state=checked]:border-ring data-[state=checked]:shadow-[0_0_0_1px_var(--ring)]"
							@click="pickOs(o.id)"
						>
							<div class="flex items-center gap-2.5">
								<OsLogo :os="o.id" :color="o.color" />
								<Label :for="`os-${o.id}`" class="flex-1 cursor-pointer text-sm font-medium">{{ o.name }}</Label>
								<RadioGroupItem :id="`os-${o.id}`" :value="o.id" @click.stop="pickOs(o.id)" />
							</div>
							<Select :model-value="versions[o.id]" @update:model-value="(v) => pickVersion(o.id, v)">
								<SelectTrigger size="sm" class="w-full" :aria-label="`${o.name} version`" @click.stop>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem v-for="v in o.versions" :key="v" :value="v">{{ v }}</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</RadioGroup>
				</StepCard>

				<!-- 05 billing -->
				<StepCard step="05" title="Billing term">
					<p class="mt-3 text-sm text-muted-foreground">Pay for the full term up front. Longer terms are cheaper.</p>
					<div class="mt-[18px] flex flex-wrap items-center justify-between gap-4">
						<div class="max-w-full overflow-x-auto">
							<ToggleGroup type="single" variant="segmented" elevation="raised" :model-value="String(months)" aria-label="Billing term" @update:model-value="pickTerm">
								<ToggleGroupItem v-for="t in terms" :key="t.months" :value="String(t.months)" class="gap-1 px-3.5">
									{{ t.label }}
									<Badge v-if="t.discount" variant="success" shape="number" class="ml-1 h-[18px]">−{{ t.discount }}%</Badge>
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div class="flex items-center gap-2.5 text-[13.5px]">
							<Switch id="auto-renew" v-model="autoRenew" elevation="raised" />
							<Label for="auto-renew">Auto-renew</Label>
						</div>
					</div>
				</StepCard>
			</div>

			<div id="summary" class="w-full scroll-mt-24 lg:sticky lg:top-24 lg:w-[330px] lg:shrink-0">
				<ServerSummary
					:plan="plan"
					:category="plan.category"
					:location="location"
					:os="os"
					:version="versions[os.id]"
					:term="term"
					:total="total"
					:name="name"
					:auto-renew="autoRenew"
				/>
			</div>
		</div>
	</div>
</template>
