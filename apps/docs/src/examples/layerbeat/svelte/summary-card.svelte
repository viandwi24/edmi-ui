<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Flag from "./flag.svelte";
	import OsLogo from "./os-logo.svelte";

	let {
		category,
		location,
		plan,
		image,
		version,
		termLabel,
		total,
		credit,
	}: {
		category: string;
		location: { city: string; country: string; flag: { dir: "h" | "v"; colors: string[] } };
		plan: { id: string; vcpu: number; ram: number; ssd: number };
		image: { id: string; name: string; color: string };
		version: string;
		termLabel: string;
		total: string;
		credit: string;
	} = $props();

	// Tailwind scans for whole class names, so each tint is spelled out.
	const tints = [
		"border-[color-mix(in_srgb,var(--chart-1)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-1)_12%,var(--card))] text-chart-1",
		"border-[color-mix(in_srgb,var(--chart-2)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-2)_12%,var(--card))] text-chart-2",
		"border-[color-mix(in_srgb,var(--chart-3)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-3)_12%,var(--card))] text-chart-3",
	];
	const specs = $derived([
		{ label: "vCPU", value: String(plan.vcpu), icon: { lucide: "CpuIcon", tabler: "IconCpu", hugeicons: "CpuIcon", phosphor: "CpuIcon", remixicon: "RiCpuLine" } },
		{ label: "RAM", value: `${plan.ram} GB`, icon: { lucide: "MemoryStickIcon", tabler: "IconCpu2", hugeicons: "RamMemoryIcon", phosphor: "MemoryIcon", remixicon: "RiRamLine" } },
		{ label: "SSD", value: `${plan.ssd} GB`, icon: { lucide: "ServerIcon", tabler: "IconServer", hugeicons: "ServerStackIcon", phosphor: "HardDrivesIcon", remixicon: "RiHardDriveLine" } },
	]);
	const rows = $derived([
		["Image", `${image.name} ${version}`],
		["Billing term", termLabel],
		["Location", `${location.city}, ${location.country}`],
	]);
</script>

<Card elevation="raised" class="gap-0 p-0">
	<div class="relative overflow-hidden border-b border-border-2 bg-[linear-gradient(160deg,var(--brand-soft),var(--card)_75%)] px-5 pt-5 pb-[18px]">
		<span class="absolute -right-[26px] -bottom-[30px] size-[110px] rounded-full bg-[color-mix(in_srgb,var(--chart-2)_35%,transparent)]"></span>
		<span class="absolute right-[30px] -bottom-10 h-[90px] w-[70px] rounded-[40px] bg-[color-mix(in_srgb,var(--chart-1)_30%,transparent)]"></span>
		<div class="relative flex items-center justify-between">
			<span class="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-popover">
				<OsLogo color={image.color} ubuntu={image.id === "ubuntu"} />
			</span>
			<Badge variant="brand" shape="pill">{category}</Badge>
		</div>
		<div class="relative mt-4 text-[22px] font-semibold tracking-[-0.4px]">Your new server</div>
		<div class="relative mt-1 font-mono text-xs text-muted-foreground">{plan.id}</div>
		<div class="relative mt-3.5 flex items-center gap-2 text-sm font-medium">
			<Flag flag={location.flag} />
			{location.city}
		</div>
	</div>
	<div class="flex flex-col gap-3.5 px-5 pt-[18px] pb-5">
		<div class="flex gap-2">
			{#each specs as s, i (s.label)}
				<div class="flex-1 rounded-xl border px-3 py-2.5 {tints[i]}">
					<div class="flex items-center gap-1.5 text-[12.5px]">
						<IconPlaceholder {...s.icon} class="size-3.5" />
						<span class="text-foreground-2">{s.label}</span>
					</div>
					<div class="mt-1.5 font-mono text-[17px] text-foreground">{s.value}</div>
				</div>
			{/each}
		</div>
		{#each rows as r (r[0])}
			<div class="flex items-center justify-between text-[13.5px]">
				<span class="text-muted-foreground">{r[0]}</span>
				<span class="font-medium">{r[1]}</span>
			</div>
		{/each}
		<div class="rounded-xl border border-[color-mix(in_srgb,var(--brand)_25%,var(--popover))] bg-brand-soft px-4 py-3.5">
			<div class="text-[13px] text-foreground-2">Purchase total</div>
			<div class="mt-1 font-mono text-[30px] tracking-[-0.5px]">{total}</div>
			<div class="mt-0.5 text-xs text-muted-foreground">Full term · USD</div>
		</div>
		<div class="flex items-center justify-between rounded-xl bg-success-soft px-3.5 py-2.5 text-[13.5px]">
			<span class="flex items-center gap-2">
				<IconPlaceholder
					lucide="WalletIcon"
					tabler="IconWallet"
					hugeicons="WalletIcon"
					phosphor="WalletIcon"
					remixicon="RiWalletLine"
					class="size-[15px]"
				/>
				Available credit
			</span>
			<span class="font-mono font-medium text-success-text">{credit}</span>
		</div>
		<p class="rounded-xl border border-border px-3.5 py-3 text-xs leading-normal text-muted-foreground">
			Review your configuration before purchasing. Credit is used only when you confirm.
		</p>
		<Button elevation="raised" size="lg" class="w-full">Purchase server</Button>
		<Button variant="ghost" class="-mt-1.5 w-full">Save as draft</Button>
	</div>
</Card>
