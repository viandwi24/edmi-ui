<script setup lang="ts">
import { PhCpu, PhHardDrives, PhMemory, PhWallet } from "@phosphor-icons/vue";
import { computed } from "vue";
import { toast } from "vue-sonner";
import Flag from "@/components/Flag.vue";
import OsLogo from "@/components/OsLogo.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { credit, type Location, money, type OsImage, type Plan, type Term } from "@/data/layerbeat";

const props = defineProps<{
	plan: Plan;
	category: string;
	location: Location;
	os: OsImage;
	version: string;
	term: Term;
	total: number;
	name: string;
	autoRenew: boolean;
}>();

const specs = computed(() => [
	{ label: "vCPU", value: String(props.plan.vcpu), icon: PhCpu, tone: 1 },
	{ label: "RAM", value: `${props.plan.ramGb} GB`, icon: PhMemory, tone: 2 },
	{ label: "SSD", value: `${props.plan.ssdGb} GB`, icon: PhHardDrives, tone: 3 },
]);
const tones: Record<number, string> = {
	1: "bg-[color-mix(in_srgb,var(--chart-1)_12%,var(--card))] border-[color-mix(in_srgb,var(--chart-1)_22%,transparent)] text-chart-1",
	2: "bg-[color-mix(in_srgb,var(--chart-2)_12%,var(--card))] border-[color-mix(in_srgb,var(--chart-2)_22%,transparent)] text-chart-2",
	3: "bg-[color-mix(in_srgb,var(--chart-3)_12%,var(--card))] border-[color-mix(in_srgb,var(--chart-3)_22%,transparent)] text-chart-3",
};
const afterCredit = computed(() => credit - props.total);

function purchase() {
	const label = props.name.trim() || "my-first-server";
	if (afterCredit.value < 0) {
		toast.error("Not enough credit", { description: `${money(props.total)} is more than your ${money(credit)} credit.` });
		return;
	}
	toast.success(`${label} is being created`, { description: `${props.plan.sku} in ${props.location.city}, ${money(props.total)} charged.` });
}
function saveDraft() {
	toast.info("Draft saved", { description: props.name.trim() || "my-first-server" });
}
</script>

<template>
	<Card raised class="gap-0 overflow-hidden p-0 [--card-spacing:0px]">
		<div class="relative overflow-hidden border-b border-border-2 bg-[linear-gradient(160deg,var(--brand-soft),var(--card)_75%)] px-5 pt-5 pb-[18px]">
			<span class="absolute -right-[26px] -bottom-[30px] size-[110px] rounded-full bg-[color-mix(in_srgb,var(--chart-2)_35%,transparent)]" />
			<span class="absolute right-[30px] -bottom-10 h-[90px] w-[70px] rounded-[40px] bg-[color-mix(in_srgb,var(--chart-1)_30%,transparent)]" />
			<div class="relative flex items-center justify-between">
				<span class="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-popover">
					<OsLogo :os="os.id" :color="os.color" />
				</span>
				<Badge variant="brand" shape="pill">{{ category }}</Badge>
			</div>
			<div class="relative mt-4 text-[22px] font-semibold tracking-[-0.4px]">Your new server</div>
			<div class="relative mt-1 font-mono text-xs text-muted-foreground">{{ plan.sku }}</div>
			<div class="relative mt-3.5 flex items-center gap-2 text-sm font-medium">
				<Flag :flag="location.flag" />
				{{ location.city }}
			</div>
		</div>

		<div class="flex flex-col gap-3.5 px-5 pt-[18px] pb-5">
			<div class="grid grid-cols-3 gap-2">
				<div v-for="s in specs" :key="s.label" :class="['rounded-[12px] border px-3 py-2.5', tones[s.tone]]">
					<div class="flex items-center gap-1.5 text-[12.5px]">
						<component :is="s.icon" class="size-3.5" />
						<span class="text-foreground-2">{{ s.label }}</span>
					</div>
					<div class="mt-1.5 font-mono text-[17px] text-foreground">{{ s.value }}</div>
				</div>
			</div>

			<dl class="flex flex-col gap-3.5 text-[13.5px]">
				<div class="flex items-center justify-between"><dt class="text-muted-foreground">Image</dt><dd class="font-medium">{{ os.name }} {{ version }}</dd></div>
				<div class="flex items-center justify-between"><dt class="text-muted-foreground">Billing term</dt><dd class="font-medium">{{ term.label }}</dd></div>
				<div class="flex items-center justify-between"><dt class="text-muted-foreground">Location</dt><dd class="font-medium">{{ location.city }}, {{ location.code }}</dd></div>
			</dl>

			<div class="rounded-[12px] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] bg-brand-soft px-4 py-3.5">
				<div class="text-[13px] text-foreground-2">Purchase total</div>
				<div class="mt-1 font-mono text-3xl tracking-[-0.5px]">{{ money(total) }}</div>
				<div class="mt-0.5 text-xs text-muted-foreground">Full term · USD</div>
			</div>

			<div class="flex items-center justify-between rounded-[12px] bg-success-soft px-3.5 py-2.5 text-[13.5px]">
				<span class="flex items-center gap-2"><PhWallet class="size-[15px]" />Available credit</span>
				<span class="font-mono font-medium text-success-text">{{ money(credit) }}</span>
			</div>

			<p class="rounded-[12px] border border-border px-3.5 py-3 text-xs leading-normal text-muted-foreground">
				Review your configuration before purchasing. Credit is used only when you confirm.
			</p>

			<Button raised size="lg" class="w-full" @click="purchase">Purchase server</Button>
			<Button variant="ghost" class="-mt-1.5 w-full" @click="saveDraft">Save as draft</Button>
		</div>
	</Card>
</template>
