import { AllocationBar } from "@edmi-react/blocks/allocation-bar/allocation-bar";
import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import {
	IndexRow,
	IndexRowHeader,
	Sparkline,
} from "@edmi-react/blocks/index-row/index-row";
import { Badge } from "@edmi-react/ui/badge";
import { Card } from "@edmi-react/ui/card";
import { Table, TableBody, TableHeader } from "@edmi-react/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { benchmark, indexes, kinds, nav, periods, podium, tabs } from "./data";

const isDown = (s: string) => /^[-−–]/.test(s.trim());

export default function LeaderboardExample() {
	const [tab, setTab] = useState("indexes");
	const [period, setPeriod] = useState("7d");
	const [kind, setKind] = useState("all");

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#leaderboard"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
				<div className="flex items-center gap-3">
					<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
						Leaderboard
					</h1>
					<Badge variant="secondary">Simulated</Badge>
				</div>

				<div className="flex flex-wrap items-end justify-between gap-4">
					<Tabs value={tab} onValueChange={(v) => setTab(v as string)}>
						<TabsList variant="line">
							{tabs.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<div className="flex flex-wrap items-center gap-3">
						<ToggleGroup
							raised
							variant="segmented"
							value={[period]}
							onValueChange={(v) => v[0] && setPeriod(v[0] as string)}
						>
							{periods.map((p) => (
								<ToggleGroupItem key={p.value} value={p.value}>
									{p.label}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
						<ToggleGroup
							raised
							variant="segmented"
							value={[kind]}
							onValueChange={(v) => v[0] && setKind(v[0] as string)}
						>
							{kinds.map((k) => (
								<ToggleGroupItem key={k.value} value={k.value}>
									{k.label}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>
				</div>
				<p className="-mt-3 text-sm text-muted-foreground">{benchmark}</p>

				<div className="grid gap-4 lg:grid-cols-3">
					{podium.map((e) => {
						const down = isDown(e.change);
						return (
							<Card key={e.rank} raised className="gap-0 p-6">
								<div className="flex items-center justify-between text-[13px]">
									<span className="font-medium">No. {e.rank}</span>
									<span className="font-mono text-xs text-muted-foreground">
										{e.creator}
									</span>
								</div>
								<div className="mt-3 flex items-center gap-3">
									<span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-success-text">
										<IconPlaceholder
											lucide="ChartLineIcon"
											tabler="IconChartLine"
											hugeicons="ChartLineData01Icon"
											phosphor="ChartLineUpIcon"
											remixicon="RiLineChartLine"
											className="size-5"
										/>
									</span>
									<div>
										<div className="text-lg font-medium">{e.name}</div>
										<div className="font-mono text-xs text-muted-foreground">
											{e.symbol}
										</div>
									</div>
								</div>
								<div className="mt-4 flex items-end justify-between gap-3">
									<span
										className={`text-[40px] leading-none font-light tracking-[-1px] ${down ? "text-destructive-text" : "text-success-text"}`}
									>
										{e.change}
									</span>
									<Sparkline
										data={e.spark}
										width={150}
										height={34}
										className="max-w-[45%]"
									/>
								</div>
								<AllocationBar className="mt-4" segments={e.allocation} />
								<div className="mt-4 flex items-center gap-4 border-t border-border-2 pt-4 text-[13px] text-muted-foreground">
									<span>
										AUM{" "}
										<b className="font-mono font-medium text-foreground">
											{e.aum}
										</b>
									</span>
									<span>
										Holders{" "}
										<b className="font-mono font-medium text-foreground">
											{e.holders}
										</b>
									</span>
								</div>
							</Card>
						);
					})}
				</div>

				<Card raised className="px-6 py-2">
					<Table>
						<TableHeader>
							<IndexRowHeader />
						</TableHeader>
						<TableBody>
							{indexes.map((index) => (
								<IndexRow key={index.symbol} index={index} />
							))}
						</TableBody>
					</Table>
				</Card>
			</div>
		</div>
	);
}
