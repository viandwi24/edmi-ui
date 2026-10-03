import { AllocationBar } from "@edmi-react/blocks/allocation-bar/allocation-bar";
import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { JoinPanel } from "@edmi-react/blocks/join-panel/join-panel";
import { Avatar, AvatarFallback } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@edmi-react/ui/breadcrumb";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-react/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	allocation,
	assets,
	chart,
	creator,
	index,
	joinRows,
	joinTabs,
	maxAmount,
	nav,
	quickAmounts,
	ranges,
	shareActions,
	statGroups,
} from "./data";

const config = {
	mag4: { label: "MAG4", color: "var(--chart-1)" },
	spyx: { label: "SPYx", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

export default function IndexDetailExample() {
	const [range, setRange] = useState("1M");
	const [side, setSide] = useState("join");
	const [amount, setAmount] = useState("100");

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#explore"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-10">
					<Breadcrumb>
						<BreadcrumbList className="text-base">
							<BreadcrumbItem>
								<BreadcrumbLink href="#explore">Explore</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{index.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="flex items-center gap-2">
						<Button variant="outline" raised>
							Clone
						</Button>
						<Button variant="outline" raised>
							Follow
						</Button>
						<Button variant="outline" raised size="icon" aria-label="Share">
							<IconPlaceholder
								lucide="ArrowUpIcon"
								tabler="IconArrowUp"
								hugeicons="ArrowUpIcon"
								phosphor="ArrowUpIcon"
								remixicon="RiArrowUpLine"
							/>
						</Button>
					</div>
				</div>
			</div>

			<div className="mx-auto grid w-full max-w-[1328px] items-start gap-8 px-4 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px]">
				<div className="flex min-w-0 flex-col gap-6">
					<div className="flex flex-wrap items-center gap-3">
						<Avatar className="size-10">
							<AvatarFallback>{index.initial}</AvatarFallback>
						</Avatar>
						<h1 className="text-[28px] leading-tight font-medium tracking-[-0.5px]">
							{index.name}
							<span className="font-normal text-muted-foreground">
								{" "}
								· ({index.symbol})
							</span>
						</h1>
						{index.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>

					<div className="flex flex-wrap items-start justify-between gap-6">
						<div className="flex flex-wrap gap-x-12 gap-y-4">
							<div>
								<div className="flex flex-wrap items-center gap-3">
									<span className="text-[56px] leading-none font-light tracking-[-2px]">
										{index.nav}
									</span>
									<Badge variant="success" shape="number" className="font-mono">
										{index.navDelta}
									</Badge>
								</div>
								<p className="mt-2 text-[13px] text-muted-foreground">
									{index.navNote}
								</p>
							</div>
							<div>
								<div className="flex flex-wrap items-center gap-3">
									<span className="text-[56px] leading-none font-light tracking-[-2px] text-success-text">
										{index.ret7d}
									</span>
									<Badge variant="success" shape="number" className="font-mono">
										{index.retVs}
									</Badge>
								</div>
								<p className="mt-2 text-[13px] text-muted-foreground">
									{index.retNote}
								</p>
							</div>
						</div>
						<Button variant="outline" raised>
							Compare index
						</Button>
					</div>

					<ChartContainer
						config={config}
						className="aspect-auto h-[260px] w-full"
					>
						<AreaChart data={chart} margin={{ left: 4, right: 4, top: 8 }}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="day"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								interval={1}
							/>
							<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
							<Area
								dataKey="spyx"
								type="monotone"
								stroke="var(--color-spyx)"
								strokeDasharray="5 4"
								fill="var(--color-spyx)"
								fillOpacity={0}
							/>
							<Area
								dataKey="mag4"
								type="monotone"
								stroke="var(--color-mag4)"
								fill="var(--color-mag4)"
								fillOpacity={0.18}
							/>
						</AreaChart>
					</ChartContainer>

					<div className="flex flex-wrap items-center justify-between gap-3">
						<Tabs value={range} onValueChange={(v) => setRange(v as string)}>
							<TabsList variant="line">
								{ranges.map((r) => (
									<TabsTrigger key={r} value={r} className="font-mono text-xs">
										{r}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<div className="flex items-center gap-4 text-[13px]">
							<span className="flex items-center gap-1.5">
								<span className="size-2 rounded-full bg-chart-1" />
								{index.symbol}
							</span>
							<span className="flex items-center gap-1.5">
								<span className="size-2 rounded-full bg-muted-foreground" />
								SPYx
							</span>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{statGroups.map((group) => (
							<div
								key={group[0]?.label}
								className="rounded-xl border border-border-2 bg-muted px-[18px] py-3 shadow-sunk"
							>
								{group.map((row) => (
									<div
										key={row.label}
										className="flex items-center justify-between py-1.5 text-[13px]"
									>
										<span className="text-muted-foreground">{row.label}</span>
										<span className="font-mono">{row.value}</span>
									</div>
								))}
							</div>
						))}
					</div>

					<div>
						<h2 className="mb-3 text-lg font-medium">Assets</h2>
						<Card raised className="gap-4 px-6 py-2">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Asset</TableHead>
										<TableHead numeric>Weight</TableHead>
										<TableHead numeric>Target</TableHead>
										<TableHead numeric>Drift</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{assets.map((a) => (
										<TableRow key={a.symbol}>
											<TableCell>
												<div className="flex items-center gap-3">
													<Avatar className="size-7">
														<AvatarFallback className="text-[10px]">
															{a.initial}
														</AvatarFallback>
													</Avatar>
													<span className="font-mono text-[13px]">
														{a.symbol}
													</span>
												</div>
											</TableCell>
											<TableCell numeric className="font-semibold">
												{a.weight}
											</TableCell>
											<TableCell numeric className="text-muted-foreground">
												{a.target}
											</TableCell>
											<TableCell numeric trend={a.trend}>
												{a.drift}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<AllocationBar className="pb-3" segments={allocation} />
						</Card>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<JoinPanel
						raised
						className="w-full"
						tabs={joinTabs}
						tab={side}
						onTabChange={setSide}
						amount={amount}
						onAmountChange={setAmount}
						onMax={() => setAmount(maxAmount.replace(",", ""))}
						amountSize="lg"
						maxLabel={`Max ${maxAmount}`}
						quickAmounts={quickAmounts}
						rows={joinRows}
						joinLabel={`${side === "join" ? "Join" : "Redeem"} with ${amount || 0} USDC`}
						footnote="Self-custodied · Redeem anytime"
					/>

					<Card raised className="gap-3 px-5">
						<h2 className="text-sm font-semibold">Share</h2>
						<div className="flex flex-wrap gap-2">
							{shareActions.map((s) => (
								<Button key={s} variant="outline" raised size="sm">
									{s}
								</Button>
							))}
						</div>
					</Card>

					<Card raised className="gap-3 px-5">
						<h2 className="text-sm font-semibold">Created by</h2>
						<div className="flex items-center gap-3">
							<Avatar className="size-9">
								<AvatarFallback className="font-mono text-xs">
									{creator.initial}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-mono text-[13px]">{creator.address}</div>
								<div className="text-xs text-muted-foreground">
									{creator.meta}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
