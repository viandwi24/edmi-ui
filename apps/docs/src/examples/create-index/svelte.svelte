<script lang="ts">
	import { AllocationBar } from "@edmi-svelte/ui/allocation-bar";
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
	import * as Field from "@edmi-svelte/ui/field";
	import { Input } from "@edmi-svelte/ui/input";
	import * as InputGroup from "@edmi-svelte/ui/input-group";
	import * as Select from "@edmi-svelte/ui/select";
	import { Slider } from "@edmi-svelte/ui/slider";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { assets, defaults, nav, rebalance, type StepValue, steps } from "./data";

	let step = $state<StepValue>("assets");
	let query = $state("");
	let selected = $state<string[]>([]);
	let weights = $state<Record<string, number>>({});
	let rebalanceOn = $state(defaults.rebalance);
	let drift = $state(defaults.drift);
	let name = $state("");
	let symbol = $state("");
	let fee = $state(String(defaults.fee));

	const visible = $derived(
		assets.filter((a) => `${a.symbol} ${a.name}`.toLowerCase().includes(query.toLowerCase())),
	);
	const stepIndex = $derived(steps.findIndex((s) => s.value === step));
	const total = $derived(selected.reduce((sum, s) => sum + (weights[s] ?? 0), 0));
	const segments = $derived(selected.map((s) => ({ label: s, value: weights[s] ?? 0 })));
	const rebalanceLabel = $derived(rebalance.find((r) => r.value === rebalanceOn)?.label);
	const reviewRows = $derived([
		["Name", name || "Untitled index"],
		["Symbol", symbol || "SYMBOL"],
		["Rebalance", rebalanceLabel],
		["Drift limit", `${drift}%`],
		["Management fee", `${fee}% / yr`],
	]);
	const summaryRows = $derived([
		["Strategy", `Drift > ${drift}%`],
		["Management fee", `${fee}% / yr`],
		["Entry / exit", `${defaults.entry}% / ${defaults.exit}%`],
	]);

	function equalWeights(symbols: string[]) {
		const base = symbols.length ? Math.floor(100 / symbols.length) : 0;
		const rest = symbols.length ? 100 - base * symbols.length : 0;
		return Object.fromEntries(symbols.map((s, i) => [s, base + (i === 0 ? rest : 0)]));
	}

	function toggle(sym: string, on: boolean) {
		selected = on ? [...selected, sym] : selected.filter((s) => s !== sym);
		weights = equalWeights(selected);
	}

	function go(delta: number) {
		const next = steps[stepIndex + delta];
		if (next) step = next.value;
	}
</script>

<div class="min-h-svh bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#create"
				onConnect={() => {}}
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
				<Tabs.Root value={step} onValueChange={(v) => (step = v as StepValue)}>
					<Tabs.List variant="pills" raised class="flex-wrap">
						{#each steps as s, i (s.value)}
							<Tabs.Trigger value={s.value} class="gap-2">
								<span class="inline-flex size-[18px] items-center justify-center rounded-full border border-border bg-muted font-mono text-[10.5px] text-muted-foreground">{i + 1}</span>
								{s.label}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</Tabs.Root>

				{#if step === "assets"}
					<InputGroup.Root class="h-11">
						<InputGroup.Addon>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="SearchIcon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
							/>
						</InputGroup.Addon>
						<InputGroup.Input placeholder="Search assets" aria-label="Search assets" bind:value={query} />
					</InputGroup.Root>
					<Card raised class="gap-0 px-6 py-0">
						<ul>
							{#each visible as a (a.symbol)}
								<li class="border-b border-border-2 last:border-b-0">
									<label for="asset-{a.symbol}" class="flex cursor-pointer items-center gap-3.5 py-3.5">
										<span class="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">{a.symbol.charAt(0)}</span>
										<div class="min-w-0 flex-1">
											<div class="flex items-center gap-2">
												<span class="font-mono text-[15px] font-semibold">{a.symbol}</span>
												{#if a.tag}<Badge variant="secondary">{a.tag}</Badge>{/if}
											</div>
											<div class="truncate text-[13px] text-muted-foreground">{a.detail}</div>
										</div>
										<span class="font-mono text-[15px] font-semibold">{a.price}</span>
										<Checkbox
											id="asset-{a.symbol}"
											raised
											aria-label="Select {a.symbol}"
											checked={selected.includes(a.symbol)}
											onCheckedChange={(v) => toggle(a.symbol, v === true)}
										/>
									</label>
								</li>
							{/each}
							{#if visible.length === 0}
								<li class="py-10 text-center text-sm text-muted-foreground">No assets match “{query}”.</li>
							{/if}
						</ul>
					</Card>
				{/if}

				{#if step === "weights"}
					<Card raised class="gap-4 px-6">
						<div>
							<h2 class="text-xl font-normal tracking-[-0.3px]">Weights</h2>
							<p class="text-[13px] text-muted-foreground">
								Target allocation per asset. Total <span class="font-mono">{total}%</span>.
							</p>
						</div>
						{#if selected.length === 0}
							<p class="py-6 text-sm text-muted-foreground">Pick assets in step 1 first.</p>
						{:else}
							<ul class="flex flex-col gap-5">
								{#each selected as s (s)}
									<li class="flex items-center gap-4">
										<span class="w-28 font-mono text-[13px] font-semibold">{s}</span>
										<Slider
											type="single"
											raised
											aria-label="{s} weight"
											value={weights[s] ?? 0}
											onValueChange={(v) => (weights[s] = v)}
										/>
										<span class="w-12 text-right font-mono text-[13px]">{weights[s] ?? 0}%</span>
									</li>
								{/each}
							</ul>
						{/if}
					</Card>
				{/if}

				{#if step === "strategy"}
					<Card raised class="gap-5 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Strategy</h2>
						<Field.Field>
							<Field.Label for="rebalance">Rebalance</Field.Label>
							<Select.Root type="single" value={rebalanceOn} onValueChange={(v) => (rebalanceOn = v)}>
								<Select.Trigger id="rebalance" raised class="w-full sm:w-60">
									{rebalanceLabel}
								</Select.Trigger>
								<Select.Content>
									{#each rebalance as r (r.value)}
										<Select.Item value={r.value} label={r.label}>{r.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Field.Description>When the keeper brings weights back to target.</Field.Description>
						</Field.Field>
						<Field.Field>
							<Field.Label for="drift" class="w-full">
								Drift limit
								<span class="ml-auto font-mono text-[13px] font-normal">{drift}%</span>
							</Field.Label>
							<Slider
								type="single"
								id="drift"
								raised
								min={1}
								max={20}
								aria-label="Drift limit"
								value={drift}
								onValueChange={(v) => (drift = v)}
							/>
							<Field.Description>Rebalance when any weight moves this far from target.</Field.Description>
						</Field.Field>
					</Card>
				{/if}

				{#if step === "fees"}
					<Card raised class="gap-5 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Fees</h2>
						<div class="grid gap-5 sm:grid-cols-2">
							<Field.Field>
								<Field.Label for="index-name">Index name</Field.Label>
								<Input id="index-name" placeholder="Mag Four Tilt" bind:value={name} />
							</Field.Field>
							<Field.Field>
								<Field.Label for="index-symbol">Symbol</Field.Label>
								<Input
									id="index-symbol"
									class="font-mono uppercase"
									placeholder="MAGT"
									maxlength={8}
									value={symbol}
									oninput={(e) => (symbol = e.currentTarget.value.toUpperCase())}
								/>
							</Field.Field>
						</div>
						<Field.Field>
							<Field.Label for="fee">Management fee (% / yr)</Field.Label>
							<Input id="fee" type="number" min={0} max={5} step={0.25} class="font-mono sm:w-40" bind:value={fee} />
							<Field.Description>Paid to the creator. Entry and exit stay at 0%.</Field.Description>
						</Field.Field>
					</Card>
				{/if}

				{#if step === "review"}
					<Card raised class="gap-4 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Review</h2>
						{#if selected.length}
							<AllocationBar {segments} />
						{:else}
							<p class="text-sm text-muted-foreground">No assets picked yet.</p>
						{/if}
						<dl class="text-sm">
							{#each reviewRows as [k, v] (k)}
								<div class="flex justify-between border-b border-border-2 py-3 last:border-b-0">
									<dt class="text-muted-foreground">{k}</dt>
									<dd class="font-medium">{v}</dd>
								</div>
							{/each}
						</dl>
					</Card>
				{/if}

				<div class="flex items-center justify-between">
					<Button raised variant="outline" size="lg" disabled={stepIndex === 0} onclick={() => go(-1)}>Back</Button>
					<Button raised size="lg" disabled={step === "assets" && selected.length === 0} onclick={() => go(1)}>
						{step === "review" ? "Create index" : "Continue"}
					</Button>
				</div>
			</div>

			<Card raised class="gap-5 px-6">
				<div class="flex items-start gap-4">
					<span class="inline-flex size-[54px] shrink-0 items-center justify-center rounded-xl border border-border bg-muted font-mono text-lg">{(symbol || name || "").charAt(0)}</span>
					<div class="min-w-0 flex-1">
						<div class="font-semibold">{name || "Untitled index"}</div>
						<div class="font-mono text-[13px] text-muted-foreground">{symbol || "SYMBOL"}</div>
					</div>
					<Badge variant="secondary">Simulated</Badge>
				</div>
				{#if selected.length}
					<AllocationBar {segments} />
				{:else}
					<p class="text-sm text-foreground-2">Pick assets to see the allocation.</p>
				{/if}
				<dl class="text-sm">
					{#each summaryRows as [k, v] (k)}
						<div class="flex justify-between py-2">
							<dt class="text-muted-foreground">{k}</dt>
							<dd class="font-medium">{v}</dd>
						</div>
					{/each}
				</dl>
			</Card>
		</div>
	</div>
</div>
