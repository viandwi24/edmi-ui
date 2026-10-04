<script lang="ts">
	import { Avatar, AvatarFallback } from "@edmi-svelte/ui/avatar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";
	import * as Field from "@edmi-svelte/ui/field";
	import { Input } from "@edmi-svelte/ui/input";
	import * as RadioGroup from "@edmi-svelte/ui/radio-group";
	import * as Select from "@edmi-svelte/ui/select";
	import * as Sidebar from "@edmi-svelte/ui/sidebar";
	import { Switch } from "@edmi-svelte/ui/switch";
	import * as Table from "@edmi-svelte/ui/table";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		availableCredit,
		billingTerms,
		configurationCount,
		formatUsd,
		images,
		locations,
		navPlatform,
		navWorkspace,
		type PlanCategory,
		planCategories,
		plans,
		regions,
		workspaces,
	} from "./data";
	import AppSidebar from "./svelte/app-sidebar.svelte";
	import Flag from "./svelte/flag.svelte";
	import HeaderTrigger from "./svelte/header-trigger.svelte";
	import LogoMark from "./svelte/logo-mark.svelte";
	import OsLogo from "./svelte/os-logo.svelte";
	import StepCard from "./svelte/step-card.svelte";
	import SummaryCard from "./svelte/summary-card.svelte";

	let summary = $state<HTMLElement | null>(null);
	let step = $state("configure");
	let name = $state("");
	let region = $state<string>("Europe");
	let locationId = $state("fra");
	let category = $state<PlanCategory>("general");
	let planId = $state("BEAT2C2G-S");
	let view = $state("list");
	let imageId = $state("ubuntu");
	let versions = $state<Record<string, string>>(
		Object.fromEntries(images.map((i) => [i.id, i.versions[0].value])),
	);
	let months = $state("1");
	let autoRenew = $state(true);
	let workspace = $state(workspaces[0]);

	const allPlans = Object.values(plans).flat();
	const location = $derived(locations.find((l) => l.id === locationId) ?? locations[0]);
	const plan = $derived(allPlans.find((p) => p.id === planId) ?? plans.general[0]);
	const image = $derived(images.find((i) => i.id === imageId) ?? images[0]);
	const term = $derived(billingTerms.find((t) => String(t.months) === months) ?? billingTerms[0]);
	const total = $derived(plan.price * term.months * (1 - term.discount / 100));
	const categoryLabel = $derived(planCategories.find((c) => c.id === category)?.label ?? "");

	function pickStep(v: string) {
		step = v;
		if (v === "review") summary?.scrollIntoView({ behavior: "smooth" });
	}
	function pickRegion(v: string) {
		region = v;
		const first = locations.find((l) => l.region === v);
		if (first) locationId = first.id;
	}
	function pickCategory(v: string) {
		category = v as PlanCategory;
		planId = plans[category][0].id;
	}
</script>

<Sidebar.Provider style="--sidebar-width: 15rem">
	<AppSidebar platform={navPlatform} workspace={navWorkspace} />
	<Sidebar.Inset class="min-w-0 bg-background">
		<header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
			<div class="flex min-w-0 items-center gap-1">
				<HeaderTrigger />
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button variant="ghost" class="gap-2.5 px-2 font-medium" {...props}>
								<LogoMark class="size-[18px]" />
								{workspace}
								<IconPlaceholder
									lucide="ChevronsUpDownIcon"
									tabler="IconSelector"
									hugeicons="UnfoldMoreIcon"
									phosphor="CaretUpDownIcon"
									remixicon="RiArrowUpDownLine"
									class="text-muted-foreground"
								/>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="min-w-48">
						<DropdownMenu.Label>Workspaces</DropdownMenu.Label>
						{#each workspaces as w (w)}
							<DropdownMenu.Item onSelect={() => (workspace = w)}>{w}</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<span class="px-1 text-muted-foreground max-sm:hidden">/</span>
				<span class="text-muted-foreground max-sm:hidden">BeatVPS</span>
			</div>
			<div class="flex items-center gap-3 sm:gap-[18px]">
				<span class="flex items-center gap-[7px] text-[13px] text-muted-foreground max-md:hidden">
					<span class="size-1.5 rounded-full bg-success"></span>
					Connected
				</span>
				<div class="flex items-center gap-2 text-muted-foreground">
					<IconPlaceholder
						lucide="SunIcon"
						tabler="IconSun"
						hugeicons="Sun03Icon"
						phosphor="SunIcon"
						remixicon="RiSunLine"
						class="size-4"
					/>
					<Switch aria-label="Dark mode" />
					<IconPlaceholder
						lucide="MoonIcon"
						tabler="IconMoon"
						hugeicons="MoonIcon"
						phosphor="MoonIcon"
						remixicon="RiMoonLine"
						class="size-4"
					/>
				</div>
				<Button variant="ghost" size="sm" class="max-sm:hidden">
					<IconPlaceholder
						lucide="RefreshCwIcon"
						tabler="IconRefresh"
						hugeicons="RefreshIcon"
						phosphor="ArrowClockwiseIcon"
						remixicon="RiRefreshLine"
					/>
					Refresh
				</Button>
				<div class="flex items-center gap-1.5">
					<Avatar class="size-8">
						<AvatarFallback class="text-xs">AR</AvatarFallback>
					</Avatar>
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
						class="size-3.5 text-muted-foreground max-sm:hidden"
					/>
				</div>
			</div>
		</header>

		<div class="flex-1">
			<div class="mx-auto w-full max-w-[1328px] px-4 pt-8 pb-12 md:px-9">
				<h1 class="text-[32px] font-semibold tracking-[-0.8px]">Create a BeatVPS</h1>
				<p class="mt-2 text-[15px] text-muted-foreground">
					A place for your next project. Choose a location, configuration and image.
				</p>

				<Card class="mt-[26px] gap-0 p-1.5">
					<Tabs.Root value={step} onValueChange={pickStep}>
						<Tabs.List variant="pills" class="flex-wrap">
							<Tabs.Trigger value="configure" class="gap-2"><span class="font-mono text-[11.5px]">01</span> Configure</Tabs.Trigger>
							<Tabs.Trigger value="review" class="gap-2"><span class="font-mono text-[11.5px]">02</span> Review &amp; purchase</Tabs.Trigger>
						</Tabs.List>
					</Tabs.Root>
				</Card>

				<div class="mt-6 flex flex-col items-start gap-6 lg:flex-row">
					<div class="flex w-full min-w-0 flex-1 flex-col gap-5">
						<StepCard index="01" title="Name your server">
							<Field.Field>
								<Field.Label for="server-name">Server name</Field.Label>
								<Input id="server-name" placeholder="my-first-server" bind:value={name} />
								<Field.Description>A name to identify this server in your workspace.</Field.Description>
							</Field.Field>
						</StepCard>

						<StepCard
							index="02"
							title="Choose a location"
							description="Place your server close to your users. Each location has its own configurations and images."
						>
							<Tabs.Root value={region} onValueChange={pickRegion}>
								<Tabs.List variant="line" class="mb-[18px] flex-wrap">
									{#each regions as r (r)}
										<Tabs.Trigger value={r}>{r}</Tabs.Trigger>
									{/each}
								</Tabs.List>
							</Tabs.Root>
							<RadioGroup.Root
								bind:value={locationId}
								aria-label="Location"
								class="grid-cols-[repeat(auto-fill,minmax(170px,180px))] gap-3"
							>
								{#each locations.filter((l) => l.region === region) as l (l.id)}
									<Field.Label class="relative has-[>[data-slot=field]]:w-full">
										<Field.Field orientation="horizontal" class="items-center gap-2.5 px-3.5 py-3">
											<Flag flag={l.flag} />
											<span class="min-w-0 flex-1 text-sm font-medium whitespace-nowrap">{l.city}</span>
											{#if locationId === l.id}
												<IconPlaceholder
													lucide="CircleCheckIcon"
													tabler="IconCircleCheck"
													hugeicons="CheckmarkCircle02Icon"
													phosphor="CheckCircleIcon"
													remixicon="RiCheckboxCircleLine"
													class="size-4 text-brand"
												/>
											{:else}
												<span class="shrink-0 font-mono text-[11px] whitespace-nowrap text-muted-foreground">{l.latency} ms</span>
											{/if}
											<RadioGroup.Item value={l.id} aria-label={l.city} class="absolute inset-0 size-full rounded-lg opacity-0" />
										</Field.Field>
									</Field.Label>
								{/each}
							</RadioGroup.Root>
						</StepCard>

						<StepCard index="03" title="Choose your configuration">
							<div class="-mt-1 flex items-center justify-between gap-3">
								<span class="text-[13.5px] text-muted-foreground">{configurationCount} configurations · monthly prices</span>
								<ToggleGroup.Root
									type="single"
									variant="segmented"
									value={view}
									onValueChange={(v) => v && (view = v)}
									aria-label="View"
								>
									<ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
									<ToggleGroup.Item value="list">List</ToggleGroup.Item>
								</ToggleGroup.Root>
							</div>
							<Tabs.Root class="mt-3.5" value={category} onValueChange={pickCategory}>
								<Tabs.List variant="line" class="flex-wrap">
									{#each planCategories as c (c.id)}
										<Tabs.Trigger value={c.id}>{c.label}</Tabs.Trigger>
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
											{#each plans[category] as p (p.id)}
												<Table.Row
													data-state={planId === p.id ? "selected" : undefined}
													class="cursor-pointer [&>td]:py-3.5"
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
													<Table.Cell numeric class={planId === p.id ? "font-semibold" : ""}>{formatUsd(p.price)}</Table.Cell>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>
								{:else}
									<div class="grid gap-3 sm:grid-cols-2">
										{#each plans[category] as p (p.id)}
											<Field.Label class="relative has-[>[data-slot=field]]:w-full">
												<Field.Field orientation="horizontal">
													<div class="flex flex-1 flex-col gap-1">
														<span class="font-mono text-[12.5px] font-medium">{p.id}</span>
														<Field.Description>{p.vcpu} vCPU · {p.ram} GB RAM · {p.ssd} GB SSD</Field.Description>
														<span class="font-mono text-sm">{formatUsd(p.price)} / mo</span>
													</div>
													<RadioGroup.Item value={p.id} aria-label={p.id} />
												</Field.Field>
											</Field.Label>
										{/each}
									</div>
								{/if}
							</RadioGroup.Root>
						</StepCard>

						<StepCard index="04" title="Choose an image" description="The operating system installed on first boot.">
							<RadioGroup.Root bind:value={imageId} aria-label="Image" class="grid-cols-2 gap-3 md:grid-cols-4">
								{#each images as img (img.id)}
									<Field.Label class="has-[>[data-slot=field]]:w-full">
										<Field.Field class="gap-3">
											<div class="flex items-center gap-2.5">
												<OsLogo color={img.color} ubuntu={img.id === "ubuntu"} />
												<span class="flex-1 truncate text-sm font-medium">{img.name}</span>
												<RadioGroup.Item value={img.id} aria-label={img.name} />
											</div>
											<Select.Root
												type="single"
												value={versions[img.id]}
												onValueChange={(v) => {
													versions[img.id] = v;
													imageId = img.id;
												}}
											>
												<Select.Trigger size="sm" class="w-full" aria-label="{img.name} version">
													{img.versions.find((v) => v.value === versions[img.id])?.label}
												</Select.Trigger>
												<Select.Content>
													{#each img.versions as v (v.value)}
														<Select.Item value={v.value} label={v.label}>{v.label}</Select.Item>
													{/each}
												</Select.Content>
											</Select.Root>
										</Field.Field>
									</Field.Label>
								{/each}
							</RadioGroup.Root>
						</StepCard>

						<StepCard index="05" title="Billing term" description="Pay for the full term up front. Longer terms are cheaper.">
							<div class="flex flex-wrap items-center justify-between gap-4">
								<ToggleGroup.Root
									type="single"
									variant="segmented"
									elevation="raised"
									value={months}
									onValueChange={(v) => v && (months = v)}
									aria-label="Billing term"
									class="flex-wrap"
								>
									{#each billingTerms as t (t.months)}
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
						</StepCard>
					</div>

					<div bind:this={summary} class="w-full scroll-mt-6 lg:sticky lg:top-6 lg:w-[330px] lg:shrink-0">
						<SummaryCard
							category={categoryLabel}
							{location}
							{plan}
							{image}
							version={versions[image.id]}
							termLabel={term.label}
							total={formatUsd(total)}
							credit={formatUsd(availableCredit)}
						/>
					</div>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
