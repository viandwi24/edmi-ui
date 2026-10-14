import {
	IndexRow,
	IndexRowHeader,
} from "@edmi-react/blocks/index-row/index-row";
import { LeaderboardPodium } from "@edmi-react/blocks/leaderboard-podium/leaderboard-podium";
import { Badge } from "@edmi-react/ui/badge";
import { Card } from "@edmi-react/ui/card";
import { Table, TableBody, TableHeader } from "@edmi-react/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import {
	leaderboardBenchmark as benchmark,
	leaderboardIndexes as indexes,
	indexRowLabels,
	leaderboardKinds as kinds,
	leaderboardPeriods as periods,
	leaderboardPodium as podium,
	leaderboardTabs as tabs,
	toIndexRow,
} from "../data";

export function LeaderboardPage() {
	const [tab, setTab] = useState("indexes");
	const [period, setPeriod] = useState("7d");
	const [kind, setKind] = useState("all");

	return (
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
						elevation="raised"
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
						elevation="raised"
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

			<LeaderboardPodium
				variant="cards"
				valueLabel="AUM"
				countLabel="Holders"
				entries={podium}
			/>

			<Card className="px-6 py-2">
				<Table>
					<TableHeader>
						<IndexRowHeader rank labels={indexRowLabels} />
					</TableHeader>
					<TableBody>
						{indexes.map((index, i) => (
							<IndexRow
								key={index.symbol}
								index={toIndexRow(index)}
								rank={i + 1}
								delta="pill"
							/>
						))}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
