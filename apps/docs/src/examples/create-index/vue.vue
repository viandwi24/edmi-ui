<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import { computed, ref } from "vue";
import { AllocationBar } from "@edmi-vue/ui/allocation-bar";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@edmi-vue/ui/field";
import { Input } from "@edmi-vue/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@edmi-vue/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@edmi-vue/ui/select";
import { Slider } from "@edmi-vue/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { assets, defaults, nav, rebalance, type StepValue, steps } from "./data";

const step = ref<StepValue>("assets");
const query = ref("");
const selected = ref<string[]>([]);
const weights = ref<Record<string, number>>({});
const rebalanceOn = ref(defaults.rebalance);
const drift = ref(defaults.drift);
const name = ref("");
const symbol = ref("");
const fee = ref(String(defaults.fee));

const visible = computed(() =>
	assets.filter((a) => `${a.symbol} ${a.name}`.toLowerCase().includes(query.value.toLowerCase())),
);
const stepIndex = computed(() => steps.findIndex((s) => s.value === step.value));
const total = computed(() => selected.value.reduce((sum, s) => sum + (weights.value[s] ?? 0), 0));
const segments = computed(() => selected.value.map((s) => ({ label: s, value: weights.value[s] ?? 0 })));
const rebalanceLabel = computed(() => rebalance.find((r) => r.value === rebalanceOn.value)?.label);
const reviewRows = computed(() => [
	["Name", name.value || "Untitled index"],
	["Symbol", symbol.value || "SYMBOL"],
	["Rebalance", rebalanceLabel.value],
	["Drift limit", `${drift.value}%`],
	["Management fee", `${fee.value}% / yr`],
]);
const summaryRows = computed(() => [
	["Strategy", `Drift > ${drift.value}%`],
	["Management fee", `${fee.value}% / yr`],
	["Entry / exit", `${defaults.entry}% / ${defaults.exit}%`],
]);

function equalWeights(symbols: string[]) {
	const base = symbols.length ? Math.floor(100 / symbols.length) : 0;
	const rest = symbols.length ? 100 - base * symbols.length : 0;
	return Object.fromEntries(symbols.map((s, i) => [s, base + (i === 0 ? rest : 0)]));
}

function toggle(sym: string, on: boolean) {
	selected.value = on ? [...selected.value, sym] : selected.value.filter((s) => s !== sym);
	weights.value = equalWeights(selected.value);
}

function go(delta: number) {
	const next = steps[stepIndex.value + delta];
	if (next) step.value = next.value;
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
					active="#create"
				/>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
			<div>
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Create index</h1>
				<p class="mt-1 text-lg text-muted-foreground">
					Pick assets, set weights and rules. The vault program enforces them.
				</p>
			</div>

			<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
				<div class="flex min-w-0 flex-col gap-4">
					<Tabs :model-value="step" @update:model-value="(v) => (step = v as StepValue)">
						<TabsList variant="pills" elevation="raised" class="flex-wrap">
							<TabsTrigger v-for="(s, i) in steps" :key="s.value" :value="s.value" class="gap-2">
								<span class="inline-flex size-[18px] items-center justify-center rounded-full border border-border bg-muted font-mono text-[10.5px] text-muted-foreground">{{ i + 1 }}</span>
								{{ s.label }}
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<template v-if="step === 'assets'">
						<InputGroup class="h-11">
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupInput v-model="query" placeholder="Search assets" aria-label="Search assets" />
						</InputGroup>
						<Card elevation="raised" class="gap-0 px-6 py-0">
							<ul>
								<li v-for="a in visible" :key="a.symbol" class="border-b border-border-2 last:border-b-0">
									<label :for="`asset-${a.symbol}`" class="flex cursor-pointer items-center gap-3.5 py-3.5">
										<span class="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">{{ a.symbol.charAt(0) }}</span>
										<div class="min-w-0 flex-1">
											<div class="flex items-center gap-2">
												<span class="font-mono text-[15px] font-semibold">{{ a.symbol }}</span>
												<Badge v-if="a.tag" variant="secondary">{{ a.tag }}</Badge>
											</div>
											<div class="truncate text-[13px] text-muted-foreground">{{ a.detail }}</div>
										</div>
										<span class="font-mono text-[15px] font-semibold">{{ a.price }}</span>
										<Checkbox
											:id="`asset-${a.symbol}`"
											elevation="raised"
											:aria-label="`Select ${a.symbol}`"
											:model-value="selected.includes(a.symbol)"
											@update:model-value="(v) => toggle(a.symbol, v === true)"
										/>
									</label>
								</li>
								<li v-if="visible.length === 0" class="py-10 text-center text-sm text-muted-foreground">
									No assets match “{{ query }}”.
								</li>
							</ul>
						</Card>
					</template>

					<Card v-if="step === 'weights'" elevation="raised" class="gap-4 px-6">
						<div>
							<h2 class="text-xl font-normal tracking-[-0.3px]">Weights</h2>
							<p class="text-[13px] text-muted-foreground">
								Target allocation per asset. Total <span class="font-mono">{{ total }}%</span>.
							</p>
						</div>
						<p v-if="selected.length === 0" class="py-6 text-sm text-muted-foreground">Pick assets in step 1 first.</p>
						<ul v-else class="flex flex-col gap-5">
							<li v-for="s in selected" :key="s" class="flex items-center gap-4">
								<span class="w-28 font-mono text-[13px] font-semibold">{{ s }}</span>
								<Slider
									elevation="raised"
									:aria-label="`${s} weight`"
									:model-value="[weights[s] ?? 0]"
									@update:model-value="(v) => (weights[s] = v?.[0] ?? 0)"
								/>
								<span class="w-12 text-right font-mono text-[13px]">{{ weights[s] ?? 0 }}%</span>
							</li>
						</ul>
					</Card>

					<Card v-if="step === 'strategy'" elevation="raised" class="gap-5 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Strategy</h2>
						<Field>
							<FieldLabel for="rebalance">Rebalance</FieldLabel>
							<Select :model-value="rebalanceOn" @update:model-value="(v) => (rebalanceOn = String(v))">
								<SelectTrigger id="rebalance" elevation="raised" class="w-full sm:w-60">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem v-for="r in rebalance" :key="r.value" :value="r.value">{{ r.label }}</SelectItem>
								</SelectContent>
							</Select>
							<FieldDescription>When the keeper brings weights back to target.</FieldDescription>
						</Field>
						<Field>
							<FieldLabel for="drift" class="w-full">
								Drift limit
								<span class="ml-auto font-mono text-[13px] font-normal">{{ drift }}%</span>
							</FieldLabel>
							<Slider
								id="drift"
								elevation="raised"
								:min="1"
								:max="20"
								aria-label="Drift limit"
								:model-value="[drift]"
								@update:model-value="(v) => (drift = v?.[0] ?? 0)"
							/>
							<FieldDescription>Rebalance when any weight moves this far from target.</FieldDescription>
						</Field>
					</Card>

					<Card v-if="step === 'fees'" elevation="raised" class="gap-5 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Fees</h2>
						<div class="grid gap-5 sm:grid-cols-2">
							<Field>
								<FieldLabel for="index-name">Index name</FieldLabel>
								<Input id="index-name" v-model="name" placeholder="Mag Four Tilt" />
							</Field>
							<Field>
								<FieldLabel for="index-symbol">Symbol</FieldLabel>
								<Input
									id="index-symbol"
									class="font-mono uppercase"
									placeholder="MAGT"
									maxlength="8"
									:model-value="symbol"
									@update:model-value="(v) => (symbol = String(v).toUpperCase())"
								/>
							</Field>
						</div>
						<Field>
							<FieldLabel for="fee">Management fee (% / yr)</FieldLabel>
							<Input id="fee" v-model="fee" type="number" min="0" max="5" step="0.25" class="font-mono sm:w-40" />
							<FieldDescription>Paid to the creator. Entry and exit stay at 0%.</FieldDescription>
						</Field>
					</Card>

					<Card v-if="step === 'review'" elevation="raised" class="gap-4 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Review</h2>
						<AllocationBar v-if="selected.length" :segments="segments" />
						<p v-else class="text-sm text-muted-foreground">No assets picked yet.</p>
						<dl class="text-sm">
							<div v-for="[k, v] in reviewRows" :key="k" class="flex justify-between border-b border-border-2 py-3 last:border-b-0">
								<dt class="text-muted-foreground">{{ k }}</dt>
								<dd class="font-medium">{{ v }}</dd>
							</div>
						</dl>
					</Card>

					<div class="flex items-center justify-between">
						<Button elevation="raised" variant="outline" size="lg" :disabled="stepIndex === 0" @click="go(-1)">Back</Button>
						<Button elevation="raised" size="lg" :disabled="step === 'assets' && selected.length === 0" @click="go(1)">
							{{ step === "review" ? "Create index" : "Continue" }}
						</Button>
					</div>
				</div>

				<Card elevation="raised" class="gap-5 px-6">
					<div class="flex items-start gap-4">
						<span class="inline-flex size-[54px] shrink-0 items-center justify-center rounded-xl border border-border bg-muted font-mono text-lg">{{ (symbol || name || "").charAt(0) }}</span>
						<div class="min-w-0 flex-1">
							<div class="font-semibold">{{ name || "Untitled index" }}</div>
							<div class="font-mono text-[13px] text-muted-foreground">{{ symbol || "SYMBOL" }}</div>
						</div>
						<Badge variant="secondary">Simulated</Badge>
					</div>
					<AllocationBar v-if="selected.length" :segments="segments" />
					<p v-else class="text-sm text-foreground-2">Pick assets to see the allocation.</p>
					<dl class="text-sm">
						<div v-for="[k, v] in summaryRows" :key="k" class="flex justify-between py-2">
							<dt class="text-muted-foreground">{{ k }}</dt>
							<dd class="font-medium">{{ v }}</dd>
						</div>
					</dl>
				</Card>
			</div>
		</div>
	</div>
</template>
