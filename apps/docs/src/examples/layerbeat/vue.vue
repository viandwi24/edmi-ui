<script setup lang="ts">
import {
	ChevronDownIcon,
	ChevronsUpDownIcon,
	CircleCheckIcon,
	MoonIcon,
	RefreshCwIcon,
	SunIcon,
} from "@lucide/vue";
import { computed, ref } from "vue";
import { Avatar, AvatarFallback } from "@edmi-vue/ui/avatar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@edmi-vue/ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "@edmi-vue/ui/field";
import { Input } from "@edmi-vue/ui/input";
import { Label } from "@edmi-vue/ui/label";
import { RadioGroup, RadioGroupItem } from "@edmi-vue/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-vue/ui/select";
import { SidebarInset, SidebarProvider } from "@edmi-vue/ui/sidebar";
import { Switch } from "@edmi-vue/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-vue/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import {
	availableCredit,
	billingTerms,
	configurationCount,
	formatUsd,
	images,
	locations,
	navPlatform,
	navWorkspace,
	planCategories,
	plans,
	regions,
	workspaces,
} from "./data";
import AppSidebar from "./vue/AppSidebar.vue";
import Flag from "./vue/Flag.vue";
import HeaderTrigger from "./vue/HeaderTrigger.vue";
import LogoMark from "./vue/LogoMark.vue";
import OsLogo from "./vue/OsLogo.vue";
import StepCard from "./vue/StepCard.vue";
import SummaryCard from "./vue/SummaryCard.vue";

const summary = ref<HTMLElement | null>(null);
const step = ref("configure");
const name = ref("");
const region = ref<string>("Europe");
const locationId = ref("fra");
const category = ref<keyof typeof plans>("general");
const planId = ref("BEAT2C2G-S");
const view = ref("list");
const imageId = ref("ubuntu");
const versions = ref<Record<string, string>>(
	Object.fromEntries(images.map((i) => [i.id, i.versions[0].value])),
);
const months = ref("1");
const autoRenew = ref(true);
const workspace = ref(workspaces[0]);

const allPlans = Object.values(plans).flat();
const location = computed(
	() => locations.find((l) => l.id === locationId.value) ?? locations[0],
);
const plan = computed(
	() => allPlans.find((p) => p.id === planId.value) ?? plans.general[0],
);
const image = computed(
	() => images.find((i) => i.id === imageId.value) ?? images[0],
);
const term = computed(
	() =>
		billingTerms.find((t) => String(t.months) === months.value) ??
		billingTerms[0],
);
const total = computed(
	() => plan.value.price * term.value.months * (1 - term.value.discount / 100),
);
const categoryLabel = computed(
	() => planCategories.find((c) => c.id === category.value)?.label ?? "",
);

function pickStep(v: string | number) {
	step.value = String(v);
	if (v === "review") summary.value?.scrollIntoView({ behavior: "smooth" });
}
function pickRegion(v: string | number) {
	region.value = String(v);
	const first = locations.find((l) => l.region === region.value);
	if (first) locationId.value = first.id;
}
function pickCategory(v: string | number) {
	category.value = String(v) as keyof typeof plans;
	planId.value = plans[category.value][0].id;
}
function pickView(v: unknown) {
	if (v) view.value = String(v);
}
function pickTerm(v: unknown) {
	if (v) months.value = String(v);
}
function pickVersion(id: string, v: unknown) {
	if (typeof v === "string") versions.value[id] = v;
	imageId.value = id;
}
</script>

<template>
	<SidebarProvider class="h-svh min-h-0 overflow-hidden" style="--sidebar-width: 15rem">
		<AppSidebar :platform="navPlatform" :workspace="navWorkspace" />
		<SidebarInset class="min-h-0 min-w-0 overflow-hidden bg-background">
			<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
				<div class="flex min-w-0 items-center gap-1">
					<HeaderTrigger />
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button variant="ghost" class="gap-2.5 px-2 font-medium">
								<LogoMark class="size-[18px]" />
								{{ workspace }}
								<ChevronsUpDownIcon class="text-muted-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" class="min-w-48">
							<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
							<DropdownMenuItem v-for="w in workspaces" :key="w" @select="workspace = w">{{ w }}</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<span class="px-1 text-muted-foreground max-sm:hidden">/</span>
					<span class="text-muted-foreground max-sm:hidden">BeatVPS</span>
				</div>
				<div class="flex items-center gap-3 sm:gap-[18px]">
					<span class="flex items-center gap-[7px] text-[13px] text-muted-foreground max-md:hidden">
						<span class="size-1.5 rounded-full bg-success" />
						Connected
					</span>
					<div class="flex items-center gap-2 text-muted-foreground">
						<SunIcon class="size-4" />
						<Switch aria-label="Dark mode" />
						<MoonIcon class="size-4" />
					</div>
					<Button variant="ghost" size="sm" class="max-sm:hidden">
						<RefreshCwIcon />
						Refresh
					</Button>
					<div class="flex items-center gap-1.5">
						<Avatar class="size-8">
							<AvatarFallback class="text-xs">AR</AvatarFallback>
						</Avatar>
						<ChevronDownIcon class="size-3.5 text-muted-foreground max-sm:hidden" />
					</div>
				</div>
			</header>

			<div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
				<div class="mx-auto w-full max-w-[1328px] px-4 pt-8 pb-12 md:px-9">
					<h1 class="text-[32px] font-semibold tracking-[-0.8px]">Create a BeatVPS</h1>
					<p class="mt-2 text-[15px] text-muted-foreground">
						A place for your next project. Choose a location, configuration and image.
					</p>

					<Card class="mt-[26px] p-1.5 [--card-spacing:6px]">
						<Tabs :model-value="step" @update:model-value="pickStep">
							<TabsList variant="pills" class="flex-wrap">
								<TabsTrigger value="configure" class="gap-2"><span class="font-mono text-[11.5px]">01</span> Configure</TabsTrigger>
								<TabsTrigger value="review" class="gap-2"><span class="font-mono text-[11.5px]">02</span> Review &amp; purchase</TabsTrigger>
							</TabsList>
						</Tabs>
					</Card>

					<div class="mt-6 flex flex-col items-start gap-6 lg:flex-row">
						<div class="flex w-full min-w-0 flex-1 flex-col gap-5">
							<StepCard index="01" title="Name your server">
								<Field>
									<Label for="server-name">Server name</Label>
									<Input id="server-name" v-model="name" placeholder="my-first-server" autocomplete="off" />
									<FieldDescription>A name to identify this server in your workspace.</FieldDescription>
								</Field>
							</StepCard>

							<StepCard
								index="02"
								title="Choose a location"
								description="Place your server close to your users. Each location has its own configurations and images."
							>
								<Tabs :model-value="region" @update:model-value="pickRegion">
									<TabsList variant="line" class="mb-[18px] flex-wrap">
										<TabsTrigger v-for="r in regions" :key="r" :value="r">{{ r }}</TabsTrigger>
									</TabsList>
								</Tabs>
								<RadioGroup v-model="locationId" class="grid-cols-[repeat(auto-fill,minmax(170px,180px))] gap-3">
									<template v-for="l in locations" :key="l.id">
										<FieldLabel v-show="l.region === region" :for="`loc-${l.id}`">
											<Field orientation="horizontal" class="items-center gap-2.5 px-3.5 py-3">
												<Flag :flag="l.flag" />
												<span class="flex-1 text-sm font-medium whitespace-nowrap">{{ l.city }}</span>
												<CircleCheckIcon v-if="l.id === locationId" class="size-4 text-brand" />
												<span v-else class="font-mono text-[11px] whitespace-nowrap text-muted-foreground">{{ l.latency }} ms</span>
												<RadioGroupItem :id="`loc-${l.id}`" :value="l.id" class="sr-only" />
											</Field>
										</FieldLabel>
									</template>
								</RadioGroup>
							</StepCard>

							<StepCard index="03" title="Choose your configuration">
								<div class="-mt-1 flex items-center justify-between gap-3">
									<span class="text-[13.5px] text-muted-foreground">{{ configurationCount }} configurations · monthly prices</span>
									<ToggleGroup type="single" variant="segmented" :model-value="view" aria-label="View" @update:model-value="pickView">
										<ToggleGroupItem value="cards">Cards</ToggleGroupItem>
										<ToggleGroupItem value="list">List</ToggleGroupItem>
									</ToggleGroup>
								</div>
								<Tabs class="mt-3.5" :model-value="category" @update:model-value="pickCategory">
									<TabsList variant="line" class="flex-wrap">
										<TabsTrigger v-for="c in planCategories" :key="c.id" :value="c.id">{{ c.label }}</TabsTrigger>
									</TabsList>
								</Tabs>
								<RadioGroup v-model="planId" class="mt-3.5 block">
									<Table v-if="view === 'list'">
										<TableHeader>
											<TableRow class="hover:bg-transparent">
												<TableHead class="w-9" />
												<TableHead>Plan</TableHead>
												<TableHead>vCPU</TableHead>
												<TableHead>RAM</TableHead>
												<TableHead>SSD</TableHead>
												<TableHead>Transfer</TableHead>
												<TableHead numeric>Price / mo</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow
												v-for="p in plans[category]"
												:key="p.id"
												:data-state="p.id === planId ? 'selected' : undefined"
												class="cursor-pointer [&>td]:py-3.5"
												@click="planId = p.id"
											>
												<TableCell>
													<RadioGroupItem :value="p.id" :aria-label="p.id" @click.stop />
												</TableCell>
												<TableCell class="font-mono text-[12.5px]">{{ p.id }}</TableCell>
												<TableCell class="font-mono">{{ p.vcpu }}</TableCell>
												<TableCell class="font-mono">{{ p.ram }} GB</TableCell>
												<TableCell class="font-mono">{{ p.ssd }} GB</TableCell>
												<TableCell class="font-mono text-muted-foreground">{{ p.transfer }} TB</TableCell>
												<TableCell numeric :class="p.id === planId ? 'font-semibold' : ''">{{ formatUsd(p.price) }}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<div v-else class="grid gap-3 sm:grid-cols-2">
										<FieldLabel v-for="p in plans[category]" :key="p.id" :for="`plan-${p.id}`">
											<Field orientation="horizontal">
												<div class="flex flex-1 flex-col gap-1">
													<span class="font-mono text-[12.5px] font-medium">{{ p.id }}</span>
													<FieldDescription>{{ p.vcpu }} vCPU · {{ p.ram }} GB RAM · {{ p.ssd }} GB SSD</FieldDescription>
													<span class="font-mono text-sm">{{ formatUsd(p.price) }} / mo</span>
												</div>
												<RadioGroupItem :id="`plan-${p.id}`" :value="p.id" />
											</Field>
										</FieldLabel>
									</div>
								</RadioGroup>
							</StepCard>

							<StepCard index="04" title="Choose an image" description="The operating system installed on first boot.">
								<RadioGroup v-model="imageId" class="grid-cols-2 gap-3 md:grid-cols-4">
									<FieldLabel v-for="img in images" :key="img.id" :for="`img-${img.id}`">
										<Field class="gap-3">
											<div class="flex items-center gap-2.5">
												<OsLogo :color="img.color" :ubuntu="img.id === 'ubuntu'" />
												<span class="flex-1 text-sm font-medium">{{ img.name }}</span>
												<RadioGroupItem :id="`img-${img.id}`" :value="img.id" />
											</div>
											<Select :model-value="versions[img.id]" @update:model-value="(v) => pickVersion(img.id, v)">
												<SelectTrigger size="sm" class="w-full" :aria-label="`${img.name} version`" @click.stop>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem v-for="v in img.versions" :key="v.value" :value="v.value">{{ v.label }}</SelectItem>
												</SelectContent>
											</Select>
										</Field>
									</FieldLabel>
								</RadioGroup>
							</StepCard>

							<StepCard index="05" title="Billing term" description="Pay for the full term up front. Longer terms are cheaper.">
								<div class="flex flex-wrap items-center justify-between gap-4">
									<ToggleGroup type="single" elevation="raised" variant="segmented" class="flex-wrap" :model-value="months" aria-label="Billing term" @update:model-value="pickTerm">
										<ToggleGroupItem v-for="t in billingTerms" :key="t.months" :value="String(t.months)" class="px-3.5">
											{{ t.label }}
											<Badge v-if="t.discount" variant="success" shape="number" class="ml-1 h-[18px]">−{{ t.discount }}%</Badge>
										</ToggleGroupItem>
									</ToggleGroup>
									<Label class="gap-2.5 text-[13.5px]">
										<Switch v-model="autoRenew" />
										Auto-renew
									</Label>
								</div>
							</StepCard>
						</div>

						<div ref="summary" class="w-full scroll-mt-6 lg:sticky lg:top-6 lg:w-[330px] lg:shrink-0">
							<SummaryCard
								:category="categoryLabel"
								:location="location"
								:plan="plan"
								:image="image"
								:version="versions[image.id]"
								:term-label="term.label"
								:total="formatUsd(total)"
								:credit="formatUsd(availableCredit)"
							/>
						</div>
					</div>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>
