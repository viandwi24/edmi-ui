<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { Alert, AlertDescription } from "@edmi-svelte/ui/alert";
	import { AppHeader } from "@edmi-svelte/ui/app-header";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Toaster, toast } from "@edmi-svelte/ui/sonner";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import { nav, solFaucet, usdcFaucet, wallet } from "./data";

	const fmt = (n: number) => n.toLocaleString("en-US");

	let amount = $state(usdcFaucet.defaultAmount);
	let usdc = $state(wallet.usdc);
	let busy = $state(false);

	function mint() {
		busy = true;
		setTimeout(() => {
			usdc += amount;
			busy = false;
			toast.success(`${fmt(amount)} USDC minted`, {
				description: "Simulated devnet funds. No real value.",
			});
		}, 600);
	}
</script>

<ElevationProvider mode="layered">

<div class="min-h-svh bg-background text-foreground">
	<Toaster elevation="raised" />
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				onConnect={() => {}}
			/>
		</div>
	</div>
	<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">Faucet</h1>
				<Badge variant="secondary">Simulated</Badge>
			</div>
			<p class="mt-1 text-lg text-muted-foreground">Free SOL for fees and simulated USDC on Devnet. No real value.</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<Card class="gap-1 px-6">
				<div class="text-[13px] text-muted-foreground">SOL</div>
				<div class="font-mono text-[32px] leading-tight">{wallet.sol}</div>
			</Card>
			<Card class="gap-1 px-6">
				<div class="text-[13px] text-muted-foreground">USDC</div>
				<div class="font-mono text-[32px] leading-tight">{fmt(usdc)}</div>
			</Card>
		</div>

		<Card class="gap-4 px-7">
			<div>
				<h2 class="text-lg font-medium tracking-[-0.2px]">{solFaucet.title}</h2>
				<p class="mt-0.5 text-[13px] text-muted-foreground">{solFaucet.description}</p>
			</div>
			<Alert class="bg-muted">
				<AlertDescription class="text-foreground">
					The in-app SOL faucet is off on this deployment. Get free devnet SOL at
					<a href={solFaucet.linkHref} class="underline underline-offset-2">{solFaucet.linkLabel}</a>
					for
					<span class="font-mono font-semibold break-all">{wallet.address}</span>
				</AlertDescription>
			</Alert>
			<Button elevation="raised" variant="outline" class="self-start">{solFaucet.buttonLabel}</Button>
		</Card>

		<Card class="gap-4 px-7">
			<div>
				<h2 class="text-lg font-medium tracking-[-0.2px]">{usdcFaucet.title}</h2>
				<p class="mt-0.5 text-[13px] text-muted-foreground">{usdcFaucet.description}</p>
			</div>
			<ToggleGroup.Root
				type="single"
				elevation="raised"
				variant="segmented"
				class="self-start"
				aria-label="Amount"
				value={String(amount)}
				onValueChange={(v) => v && (amount = Number(v))}
			>
				{#each usdcFaucet.amounts as a (a)}
					<ToggleGroup.Item value={String(a)}>{fmt(a)}</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<Button size="lg" class="self-start" disabled={busy} onclick={mint}>Get {fmt(amount)} USDC</Button>
		</Card>
	</div>
</div>
</ElevationProvider>
