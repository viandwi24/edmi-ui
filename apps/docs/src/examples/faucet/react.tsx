import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { Alert, AlertDescription } from "@edmi-react/ui/alert";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Toaster, toast } from "@edmi-react/ui/sonner";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { nav, solFaucet, usdcFaucet, wallet } from "./data";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function FaucetExample() {
	const [amount, setAmount] = useState(usdcFaucet.defaultAmount);
	const [usdc, setUsdc] = useState(wallet.usdc);
	const [busy, setBusy] = useState(false);

	function mint() {
		setBusy(true);
		setTimeout(() => {
			setUsdc((v) => v + amount);
			setBusy(false);
			toast.success(`${fmt(amount)} USDC minted`, {
				description: "Simulated devnet funds. No real value.",
			});
		}, 600);
	}

	return (
		<div className="min-h-svh bg-background text-foreground">
			<Toaster raised />
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
							Faucet
						</h1>
						<Badge variant="secondary">Simulated</Badge>
					</div>
					<p className="mt-1 text-lg text-muted-foreground">
						Free SOL for fees and simulated USDC on Devnet. No real value.
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2">
					<Card raised className="gap-1 px-6">
						<div className="text-[13px] text-muted-foreground">SOL</div>
						<div className="font-mono text-[32px] leading-tight">
							{wallet.sol}
						</div>
					</Card>
					<Card raised className="gap-1 px-6">
						<div className="text-[13px] text-muted-foreground">USDC</div>
						<div className="font-mono text-[32px] leading-tight">
							{fmt(usdc)}
						</div>
					</Card>
				</div>

				<Card raised className="gap-4 px-7">
					<div>
						<h2 className="text-lg font-medium tracking-[-0.2px]">
							{solFaucet.title}
						</h2>
						<p className="mt-0.5 text-[13px] text-muted-foreground">
							{solFaucet.description}
						</p>
					</div>
					<Alert className="bg-muted">
						<AlertDescription className="text-foreground">
							The in-app SOL faucet is off on this deployment. Get free devnet
							SOL at{" "}
							<a
								href={solFaucet.linkHref}
								className="underline underline-offset-2"
							>
								{solFaucet.linkLabel}
							</a>{" "}
							for{" "}
							<span className="font-mono font-semibold break-all">
								{wallet.address}
							</span>
						</AlertDescription>
					</Alert>
					<Button elevation="raised" variant="outline" className="self-start">
						{solFaucet.buttonLabel}
					</Button>
				</Card>

				<Card raised className="gap-4 px-7">
					<div>
						<h2 className="text-lg font-medium tracking-[-0.2px]">
							{usdcFaucet.title}
						</h2>
						<p className="mt-0.5 text-[13px] text-muted-foreground">
							{usdcFaucet.description}
						</p>
					</div>
					<ToggleGroup
						elevation="raised"
						variant="segmented"
						className="self-start"
						aria-label="Amount"
						value={[String(amount)]}
						onValueChange={(v) => v[0] && setAmount(Number(v[0]))}
					>
						{usdcFaucet.amounts.map((a) => (
							<ToggleGroupItem key={a} value={String(a)}>
								{fmt(a)}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<Button
						elevation="raised"
						size="lg"
						className="self-start"
						disabled={busy}
						onClick={mint}
					>
						Get {fmt(amount)} USDC
					</Button>
				</Card>
			</div>
		</div>
	);
}
