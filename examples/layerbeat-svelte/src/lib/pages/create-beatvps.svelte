<script lang="ts">
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import Cpu from "phosphor-svelte/lib/Cpu";
	import HardDrive from "phosphor-svelte/lib/HardDrive";
	import Memory from "phosphor-svelte/lib/Memory";
	import Wallet from "phosphor-svelte/lib/Wallet";
	import { toast } from "svelte-sonner";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Kbd } from "#lib/components/ui/kbd/index.js";
	import * as RadioGroup from "#lib/components/ui/radio-group/index.js";
	import * as Select from "#lib/components/ui/select/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";
	import * as Table from "#lib/components/ui/table/index.js";
	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";
	import FlagIcon from "#lib/app/flag.svelte";
	import OsLogo from "#lib/app/os-logo.svelte";
	import {
		availableCredit,
		configurationCount,
		continents,
		osImages,
		planFamilies,
		terms,
		usd,
	} from "#lib/data/layerbeat.js";

	let step = $state("configure");
	let serverName = $state("");
	let continentId = $state("europe");
	let locationId = $state("frankfurt");
	let familyId = $state("general");
	let planId = $state("BEAT2C2G-S");
	let view = $state("list");
	let osId = $state("ubuntu");
	let versions = $state<Record<string, string>>(
		Object.fromEntries(osImages.map((o) => [o.id, o.versions[0]])),
	);
	let months = $state("1");
	let autoRenew = $state(true);

	const location = $derived(
		continents.flatMap((c) => c.locations).find((l) => l.id === locationId) ?? continents[1].locations[0],
	);
	const family = $derived(planFamilies.find((f) => f.id === familyId) ?? planFamilies[0]);
	const plan = $derived(
		planFamilies.flatMap((f) => f.plans).find((p) => p.id === planId) ?? planFamilies[0].plans[1],
	);
	const os = $derived(osImages.find((o) => o.id === osId) ?? osImages[0]);
	const term = $derived(terms.find((t) => String(t.months) === months) ?? terms[0]);
	const total = $derived(plan.price * term.months * (1 - term.discount / 100));
	const imageLabel = $derived(`${os.name} ${versions[os.id].replace(" LTS", "")}`);

	function pickContinent(id: string) {
		continentId = id;
		const first = continents.find((c) => c.id === id)?.locations[0];
		if (first) locationId = first.id;
	}

	function pickFamily(id: string) {
		familyId = id;
		const next = planFamilies.find((f) => f.id === id);
		if (next) planId = (next.plans[1] ?? next.plans[0]).id;
	}

	const sections = [
		["01", "Name your server"],
		["02", "Choose a location"],
		["03", "Choose your configuration"],
		["04", "Choose an image"],
		["05", "Billing term"],
	] as const;
</script>

{#snippet heading(index: string, title: string)}
	<div class="flex items-center gap-3">
		<Kbd class="h-6 min-w-7 text-[11.5px]">{index}</Kbd>
		<h2 class="text-lg font-semibold tracking-[-0.2px]">{title}</h2>
	</div>
{/snippet}

<div class="px-4 pt-6 pb-10 sm:px-9 sm:pt-[34px] sm:pb-12">
	<h1 class="text-[32px] font-semibold tracking-[-0.8px]">Create a BeatVPS</h1>
	<p class="mt-2 text-[15px] text-muted-foreground">
		A place for your next project. Choose a location, configuration and image.
	</p>

	<Card class="mt-[26px] gap-0 p-1.5">
		<Tabs.Root bind:value={step}>
			<Tabs.List variant="pills" class="max-w-full overflow-x-auto">
				<Tabs.Trigger value="configure"><span class="font-mono text-[11.5px]">01</span> Configure</Tabs.Trigger>
				<Tabs.Trigger value="review"><span class="font-mono text-[11.5px]">02</span> Review &amp; purchase</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</Card>

	<div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
		<div class="flex min-w-0 flex-1 flex-col gap-5">
			<!-- 01 Name -->
			<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
				{@render heading(sections[0][0], sections[0][1])}
				<Field.Field class="mt-5 gap-2">
					<Field.Label for="server-name">Server name</Field.Label>
					<Input id="server-name" placeholder="my-first-server" bind:value={serverName} />
					<Field.Description>A name to identify this server in your workspace.</Field.Description>
				</Field.Field>
			</Card>

			<!-- 02 Location -->
			<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
				{@render heading(sections[1][0], sections[1][1])}
				<p class="mt-3 text-sm text-muted-foreground">
					Place your server close to your users. Each location has its own configurations and images.
				</p>
				<Tabs.Root value={continentId} onValueChange={pickContinent} class="mt-5 gap-[18px]">
					<Tabs.List variant="line" class="max-w-full gap-5 overflow-x-auto sm:gap-[22px]">
						{#each continents as c (c.id)}
							<Tabs.Trigger value={c.id}>{c.name}</Tabs.Trigger>
						{/each}
					</Tabs.List>
					{#each continents as c (c.id)}
						<Tabs.Content value={c.id}>
							<RadioGroup.Root
								bind:value={locationId}
								aria-label="Location"
								class="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fill,180px)]"
							>
								{#each c.locations as l (l.id)}
									<Field.Label class="relative has-[>[data-slot=field]]:w-full">
										<Field.Field orientation="horizontal" class="items-center gap-2 px-3 py-3">
											<FlagIcon flag={l.flag} />
											<span class="min-w-0 flex-1 text-sm font-medium whitespace-nowrap">{l.city}</span>
											{#if locationId === l.id}
												<CheckCircle class="size-4 text-brand" />
											{:else}
												<span class="shrink-0 font-mono text-[11px] whitespace-nowrap text-muted-foreground">{l.ping} ms</span>
											{/if}
											<RadioGroup.Item value={l.id} aria-label={l.city} class="absolute inset-0 size-full rounded-lg opacity-0" />
										</Field.Field>
									</Field.Label>
								{/each}
							</RadioGroup.Root>
						</Tabs.Content>
					{/each}
				</Tabs.Root>
			</Card>

			<!-- 03 Configuration -->
			<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
				{@render heading(sections[2][0], sections[2][1])}
				<div class="mt-3.5 flex items-center justify-between gap-3">
					<span class="text-[13.5px] text-muted-foreground">{configurationCount} configurations · monthly prices</span>
					<ToggleGroup.Root
						type="single"
						variant="segmented"
						value={view}
						onValueChange={(v) => v && (view = v)}
						aria-label="View"
					>
						<ToggleGroup.Item value="cards" class="px-3.5">Cards</ToggleGroup.Item>
						<ToggleGroup.Item value="list" class="px-3.5">List</ToggleGroup.Item>
					</ToggleGroup.Root>
				</div>
				<Tabs.Root value={familyId} onValueChange={pickFamily} class="mt-3.5 gap-3.5">
					<Tabs.List variant="line" class="max-w-full gap-5 overflow-x-auto sm:gap-[22px]">
						{#each planFamilies as f (f.id)}
							<Tabs.Trigger value={f.id}>{f.name}</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</Tabs.Root>
				<RadioGroup.Root bind:value={planId} aria-label="Plan" class="mt-3.5 block">
					{#if view === "list"}
						<Table.Root>
							<Table.Header>
								<Table.Row class="hover:bg-transparent">
									<Table.Head class="w-9"><span class="sr-only">Select</span></Table.Head>
									<Table.Head>Plan</Table.Head>
									<Table.Head>vCPU</Table.Head>
									<Table.Head>RAM</Table.Head>
									<Table.Head>SSD</Table.Head>
									<Table.Head>Transfer</Table.Head>
									<Table.Head numeric>Price / mo</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each family.plans as p (p.id)}
									<Table.Row
										data-state={planId === p.id ? "selected" : undefined}
										class="cursor-pointer"
										onclick={() => (planId = p.id)}
									>
										<Table.Cell>
											<RadioGroup.Item value={p.id} aria-label={p.id} />
										</Table.Cell>
										<Table.Cell class="font-mono text-[12.5px]">{p.id}</Table.Cell>
										<Table.Cell class="font-mono">{p.vcpu}</Table.Cell>
										<Table.Cell class="font-mono">{p.ram} GB</Table.Cell>
										<Table.Cell class="font-mono">{p.ssd} GB</Table.Cell>
										<Table.Cell class="font-mono text-muted-foreground">{p.transfer} TB</Table.Cell>
										<Table.Cell numeric class={planId === p.id ? "font-semibold" : "font-normal"}>{usd(p.price)}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					{:else}
						<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
							{#each family.plans as p (p.id)}
								<Field.Label class="relative has-[>[data-slot=field]]:w-full">
									<Field.Field class="gap-1.5 p-3.5">
										<span class="font-mono text-[12.5px]">{p.id}</span>
										<span class="font-mono text-xs text-muted-foreground">
											{p.vcpu} vCPU · {p.ram} GB · {p.ssd} GB · {p.transfer} TB
										</span>
										<span class="font-mono text-base">{usd(p.price)}<span class="text-xs text-muted-foreground"> / mo</span></span>
										<RadioGroup.Item value={p.id} aria-label={p.id} class="absolute inset-0 size-full rounded-lg opacity-0" />
									</Field.Field>
								</Field.Label>
							{/each}
						</div>
					{/if}
				</RadioGroup.Root>
			</Card>

			<!-- 04 Image -->
			<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
				{@render heading(sections[3][0], sections[3][1])}
				<p class="mt-3 text-sm text-muted-foreground">The operating system installed on first boot.</p>
				<RadioGroup.Root bind:value={osId} aria-label="Image" class="mt-[18px] grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
					{#each osImages as o (o.id)}
						<Field.Label class="has-[>[data-slot=field]]:w-full">
							<Field.Field class="gap-3 p-3.5">
								<div class="flex items-center gap-2.5">
									<OsLogo id={o.id} color={o.color} />
									<span class="flex-1 truncate text-sm font-medium">{o.name}</span>
									<RadioGroup.Item value={o.id} aria-label={o.name} />
								</div>
								<Select.Root
									type="single"
									value={versions[o.id]}
									onValueChange={(v) => {
										versions[o.id] = v;
										osId = o.id;
									}}
								>
									<Select.Trigger size="sm" class="w-full" aria-label="{o.name} version">{versions[o.id]}</Select.Trigger>
									<Select.Content>
										{#each o.versions as v (v)}
											<Select.Item value={v} label={v}>{v}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							</Field.Field>
						</Field.Label>
					{/each}
				</RadioGroup.Root>
			</Card>

			<!-- 05 Billing -->
			<Card class="gap-0 px-[26px] pt-[22px] pb-[26px]">
				{@render heading(sections[4][0], sections[4][1])}
				<p class="mt-3 text-sm text-muted-foreground">Pay for the full term up front. Longer terms are cheaper.</p>
				<div class="mt-[18px] flex flex-wrap items-center justify-between gap-4">
					<ToggleGroup.Root
						type="single"
						variant="segmented"
						elevation="raised"
						value={months}
						onValueChange={(v) => v && (months = v)}
						aria-label="Billing term"
						class="max-w-full flex-wrap"
					>
						{#each terms as t (t.months)}
							<ToggleGroup.Item value={String(t.months)} class="px-3.5">
								{t.label}
								{#if t.discount}
									<Badge variant="success" shape="number" class="ml-1 h-[18px]">−{t.discount}%</Badge>
								{/if}
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
					<Field.Field orientation="horizontal" class="w-auto items-center gap-2.5">
						<Switch id="auto-renew" bind:checked={autoRenew} />
						<Field.Label for="auto-renew" class="font-normal">Auto-renew</Field.Label>
					</Field.Field>
				</div>
			</Card>
		</div>

		<!-- Summary -->
		<Card elevation="raised" class="w-full shrink-0 gap-0 overflow-hidden p-0 lg:sticky lg:top-6 lg:w-[330px]">
			<div class="relative overflow-hidden border-b border-border-2 bg-[linear-gradient(160deg,var(--brand-soft),var(--card)_75%)] px-5 pt-5 pb-[18px]">
				<span class="absolute -right-[26px] -bottom-[30px] size-[110px] rounded-full bg-[color-mix(in_srgb,var(--chart-2)_35%,transparent)]"></span>
				<span class="absolute right-[30px] -bottom-10 h-[90px] w-[70px] rounded-[40px] bg-[color-mix(in_srgb,var(--chart-1)_30%,transparent)]"></span>
				<div class="relative flex items-center justify-between">
					<span class="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-popover">
						<OsLogo id={os.id} color={os.color} />
					</span>
					<Badge variant="brand" shape="pill">{family.name}</Badge>
				</div>
				<div class="relative mt-4 text-[22px] font-semibold tracking-[-0.4px]">{serverName.trim() || "Your new server"}</div>
				<div class="relative mt-1 font-mono text-xs text-muted-foreground">{plan.id}</div>
				<div class="relative mt-3.5 flex items-center gap-2 text-sm font-medium">
					<FlagIcon flag={location.flag} />
					{location.city}
				</div>
			</div>
			<div class="flex flex-col gap-3.5 px-5 pt-[18px] pb-5">
				<div class="grid grid-cols-3 gap-2">
					{#each [{ label: "vCPU", value: String(plan.vcpu), color: "chart-1", icon: Cpu }, { label: "RAM", value: `${plan.ram} GB`, color: "chart-2", icon: Memory }, { label: "SSD", value: `${plan.ssd} GB`, color: "chart-3", icon: HardDrive }] as spec (spec.label)}
						<div
							class="rounded-[calc(var(--radius)*1.2)] border px-3 py-2.5"
							style="background:color-mix(in srgb,var(--{spec.color}) 12%,var(--card));border-color:color-mix(in srgb,var(--{spec.color}) 22%,transparent)"
						>
							<div class="flex items-center gap-1.5 text-[12.5px]" style="color:var(--{spec.color})">
								<spec.icon class="size-3.5" />
								<span class="text-foreground-2">{spec.label}</span>
							</div>
							<div class="mt-1.5 font-mono text-[17px]">{spec.value}</div>
						</div>
					{/each}
				</div>
				<dl class="flex flex-col gap-3.5 text-[13.5px]">
					{#each [["Image", imageLabel], ["Billing term", term.label], ["Location", `${location.city}, ${location.country}`]] as [k, v] (k)}
						<div class="flex items-center justify-between gap-3">
							<dt class="text-muted-foreground">{k}</dt>
							<dd class="font-medium">{v}</dd>
						</div>
					{/each}
				</dl>
				<div class="rounded-[calc(var(--radius)*1.2)] border border-[color-mix(in_srgb,var(--brand)_25%,var(--popover))] bg-brand-soft px-4 py-3.5">
					<div class="text-[13px] text-foreground-2">Purchase total</div>
					<div class="mt-1 font-mono text-[30px] tracking-[-0.5px]">{usd(total)}</div>
					<div class="mt-0.5 text-[12.5px] text-muted-foreground">Full term · USD</div>
				</div>
				<div class="flex items-center justify-between rounded-[calc(var(--radius)*1.2)] bg-success-soft px-3.5 py-2.5 text-[13.5px]">
					<span class="flex items-center gap-2"><Wallet class="size-[15px]" />Available credit</span>
					<span class="font-mono font-medium text-success-text">{usd(availableCredit)}</span>
				</div>
				<p class="rounded-[calc(var(--radius)*1.2)] border border-border px-3.5 py-3 text-[12.5px] leading-normal text-muted-foreground">
					Review your configuration before purchasing. Credit is used only when you confirm.
				</p>
				<Button
					elevation="raised"
					size="lg"
					class="w-full"
					onclick={() => toast.success("Server ordered", { description: `${plan.id} in ${location.city}, ${usd(total)} (demo, nothing was purchased).` })}
				>
					Purchase server
				</Button>
				<Button variant="ghost" class="-mt-1.5 w-full" onclick={() => toast("Draft saved")}>Save as draft</Button>
			</div>
		</Card>
	</div>
</div>
