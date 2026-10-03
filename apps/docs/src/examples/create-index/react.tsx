import { AllocationBar } from "@edmi-react/blocks/allocation-bar/allocation-bar";
import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Checkbox } from "@edmi-react/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@edmi-react/ui/field";
import { Input } from "@edmi-react/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@edmi-react/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Slider } from "@edmi-react/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useMemo, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	assets,
	defaults,
	nav,
	rebalance,
	type StepValue,
	steps,
} from "./data";

function equalWeights(symbols: string[]) {
	const base = symbols.length ? Math.floor(100 / symbols.length) : 0;
	const rest = symbols.length ? 100 - base * symbols.length : 0;
	return Object.fromEntries(
		symbols.map((s, i) => [s, base + (i === 0 ? rest : 0)]),
	);
}

export default function CreateIndexExample() {
	const [step, setStep] = useState<StepValue>("assets");
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<string[]>([]);
	const [weights, setWeights] = useState<Record<string, number>>({});
	const [rebalanceOn, setRebalanceOn] = useState(defaults.rebalance);
	const [drift, setDrift] = useState(defaults.drift);
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	const [fee, setFee] = useState(String(defaults.fee));

	const visible = useMemo(
		() =>
			assets.filter((a) =>
				`${a.symbol} ${a.name}`.toLowerCase().includes(query.toLowerCase()),
			),
		[query],
	);
	const stepIndex = steps.findIndex((s) => s.value === step);
	const total = selected.reduce((sum, s) => sum + (weights[s] ?? 0), 0);

	function toggle(sym: string, on: boolean) {
		const next = on ? [...selected, sym] : selected.filter((s) => s !== sym);
		setSelected(next);
		setWeights(equalWeights(next));
	}

	const go = (delta: number) => {
		const next = steps[stepIndex + delta];
		if (next) setStep(next.value);
	};

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#create"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
				<div>
					<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
						Create index
					</h1>
					<p className="mt-1 text-lg text-muted-foreground">
						Pick assets, set weights and rules. The vault program enforces them.
					</p>
				</div>

				<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
					<div className="flex min-w-0 flex-col gap-4">
						<Tabs value={step} onValueChange={(v) => setStep(v as StepValue)}>
							<TabsList variant="pills" raised className="flex-wrap">
								{steps.map((s, i) => (
									<TabsTrigger key={s.value} value={s.value} className="gap-2">
										<span className="inline-flex size-[18px] items-center justify-center rounded-full border border-border bg-muted font-mono text-[10.5px] text-muted-foreground">
											{i + 1}
										</span>
										{s.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>

						{step === "assets" ? (
							<>
								<InputGroup className="h-11">
									<InputGroupAddon>
										<IconPlaceholder
											lucide="SearchIcon"
											tabler="IconSearch"
											hugeicons="SearchIcon"
											phosphor="MagnifyingGlassIcon"
											remixicon="RiSearchLine"
										/>
									</InputGroupAddon>
									<InputGroupInput
										placeholder="Search assets"
										aria-label="Search assets"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
									/>
								</InputGroup>
								<Card raised className="gap-0 px-6 py-0">
									<ul>
										{visible.map((a) => (
											<li
												key={a.symbol}
												className="border-b border-border-2 last:border-b-0"
											>
												<label
													htmlFor={`asset-${a.symbol}`}
													className="flex cursor-pointer items-center gap-3.5 py-3.5"
												>
													<span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">
														{a.symbol.charAt(0)}
													</span>
													<div className="min-w-0 flex-1">
														<div className="flex items-center gap-2">
															<span className="font-mono text-[15px] font-semibold">
																{a.symbol}
															</span>
															{a.tag ? (
																<Badge variant="secondary">{a.tag}</Badge>
															) : null}
														</div>
														<div className="truncate text-[13px] text-muted-foreground">
															{a.detail}
														</div>
													</div>
													<span className="font-mono text-[15px] font-semibold">
														{a.price}
													</span>
													<Checkbox
														id={`asset-${a.symbol}`}
														raised
														aria-label={`Select ${a.symbol}`}
														checked={selected.includes(a.symbol)}
														onCheckedChange={(v) =>
															toggle(a.symbol, v === true)
														}
													/>
												</label>
											</li>
										))}
										{visible.length === 0 ? (
											<li className="py-10 text-center text-sm text-muted-foreground">
												No assets match “{query}”.
											</li>
										) : null}
									</ul>
								</Card>
							</>
						) : null}

						{step === "weights" ? (
							<Card raised className="gap-4 px-6">
								<div>
									<h2 className="text-xl font-normal tracking-[-0.3px]">
										Weights
									</h2>
									<p className="text-[13px] text-muted-foreground">
										Target allocation per asset. Total{" "}
										<span className="font-mono">{total}%</span>.
									</p>
								</div>
								{selected.length === 0 ? (
									<p className="py-6 text-sm text-muted-foreground">
										Pick assets in step 1 first.
									</p>
								) : (
									<ul className="flex flex-col gap-5">
										{selected.map((s) => (
											<li key={s} className="flex items-center gap-4">
												<span className="w-28 font-mono text-[13px] font-semibold">
													{s}
												</span>
												<Slider
													raised
													aria-label={`${s} weight`}
													value={[weights[s] ?? 0]}
													onValueChange={(v) => {
														const n = Array.isArray(v) ? (v[0] ?? 0) : v;
														setWeights((w) => ({ ...w, [s]: n }));
													}}
												/>
												<span className="w-12 text-right font-mono text-[13px]">
													{weights[s] ?? 0}%
												</span>
											</li>
										))}
									</ul>
								)}
							</Card>
						) : null}

						{step === "strategy" ? (
							<Card raised className="gap-5 px-6">
								<h2 className="text-xl font-normal tracking-[-0.3px]">
									Strategy
								</h2>
								<Field>
									<FieldLabel htmlFor="rebalance">Rebalance</FieldLabel>
									<Select
										value={rebalanceOn}
										items={rebalance}
										onValueChange={(v) => setRebalanceOn(String(v))}
									>
										<SelectTrigger
											id="rebalance"
											raised
											className="w-full sm:w-60"
										>
											<SelectValue />
										</SelectTrigger>
										<SelectContent alignItemWithTrigger={false}>
											{rebalance.map((r) => (
												<SelectItem key={r.value} value={r.value}>
													{r.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FieldDescription>
										When the keeper brings weights back to target.
									</FieldDescription>
								</Field>
								<Field>
									<FieldLabel htmlFor="drift" className="w-full">
										Drift limit
										<span className="ml-auto font-mono text-[13px] font-normal">
											{drift}%
										</span>
									</FieldLabel>
									<Slider
										id="drift"
										raised
										min={1}
										max={20}
										aria-label="Drift limit"
										value={[drift]}
										onValueChange={(v) =>
											setDrift(Array.isArray(v) ? (v[0] ?? 0) : v)
										}
									/>
									<FieldDescription>
										Rebalance when any weight moves this far from target.
									</FieldDescription>
								</Field>
							</Card>
						) : null}

						{step === "fees" ? (
							<Card raised className="gap-5 px-6">
								<h2 className="text-xl font-normal tracking-[-0.3px]">Fees</h2>
								<div className="grid gap-5 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="index-name">Index name</FieldLabel>
										<Input
											id="index-name"
											placeholder="Mag Four Tilt"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Field>
									<Field>
										<FieldLabel htmlFor="index-symbol">Symbol</FieldLabel>
										<Input
											id="index-symbol"
											className="font-mono uppercase"
											placeholder="MAGT"
											maxLength={8}
											value={symbol}
											onChange={(e) => setSymbol(e.target.value.toUpperCase())}
										/>
									</Field>
								</div>
								<Field>
									<FieldLabel htmlFor="fee">Management fee (% / yr)</FieldLabel>
									<Input
										id="fee"
										type="number"
										min={0}
										max={5}
										step={0.25}
										className="font-mono sm:w-40"
										value={fee}
										onChange={(e) => setFee(e.target.value)}
									/>
									<FieldDescription>
										Paid to the creator. Entry and exit stay at 0%.
									</FieldDescription>
								</Field>
							</Card>
						) : null}

						{step === "review" ? (
							<Card raised className="gap-4 px-6">
								<h2 className="text-xl font-normal tracking-[-0.3px]">
									Review
								</h2>
								{selected.length ? (
									<AllocationBar
										segments={selected.map((s) => ({
											label: s,
											value: weights[s] ?? 0,
										}))}
									/>
								) : (
									<p className="text-sm text-muted-foreground">
										No assets picked yet.
									</p>
								)}
								<dl className="text-sm">
									{[
										["Name", name || "Untitled index"],
										["Symbol", symbol || "SYMBOL"],
										[
											"Rebalance",
											rebalance.find((r) => r.value === rebalanceOn)?.label,
										],
										["Drift limit", `${drift}%`],
										["Management fee", `${fee}% / yr`],
									].map(([k, v]) => (
										<div
											key={k}
											className="flex justify-between border-b border-border-2 py-3 last:border-b-0"
										>
											<dt className="text-muted-foreground">{k}</dt>
											<dd className="font-medium">{v}</dd>
										</div>
									))}
								</dl>
							</Card>
						) : null}

						<div className="flex items-center justify-between">
							<Button
								raised
								variant="outline"
								size="lg"
								disabled={stepIndex === 0}
								onClick={() => go(-1)}
							>
								Back
							</Button>
							<Button
								raised
								size="lg"
								disabled={step === "assets" && selected.length === 0}
								onClick={() => go(1)}
							>
								{step === "review" ? "Create index" : "Continue"}
							</Button>
						</div>
					</div>

					<Card raised className="gap-5 px-6">
						<div className="flex items-start gap-4">
							<span className="inline-flex size-[54px] shrink-0 items-center justify-center rounded-xl border border-border bg-muted font-mono text-lg">
								{(symbol || name || "").charAt(0)}
							</span>
							<div className="min-w-0 flex-1">
								<div className="font-semibold">{name || "Untitled index"}</div>
								<div className="font-mono text-[13px] text-muted-foreground">
									{symbol || "SYMBOL"}
								</div>
							</div>
							<Badge variant="secondary">Simulated</Badge>
						</div>
						{selected.length ? (
							<AllocationBar
								segments={selected.map((s) => ({
									label: s,
									value: weights[s] ?? 0,
								}))}
							/>
						) : (
							<p className="text-sm text-foreground-2">
								Pick assets to see the allocation.
							</p>
						)}
						<dl className="text-sm">
							{[
								["Strategy", `Drift > ${drift}%`],
								["Management fee", `${fee}% / yr`],
								["Entry / exit", `${defaults.entry}% / ${defaults.exit}%`],
							].map(([k, v]) => (
								<div key={k} className="flex justify-between py-2">
									<dt className="text-muted-foreground">{k}</dt>
									<dd className="font-medium">{v}</dd>
								</div>
							))}
						</dl>
					</Card>
				</div>
			</div>
		</div>
	);
}
