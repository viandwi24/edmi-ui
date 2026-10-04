import { useState } from "react";
import { AllocationBar } from "@/registry/edmi/blocks/allocation-bar/allocation-bar";
import { AppHeader } from "@/registry/edmi/blocks/app-header/app-header";
import {
	IndexRow,
	type IndexRowData,
	IndexRowHeader,
} from "@/registry/edmi/blocks/index-row/index-row";
import { JoinPanel } from "@/registry/edmi/blocks/join-panel/join-panel";
import {
	type Layout,
	LayoutPicker,
} from "@/registry/edmi/blocks/layout-picker/layout-picker";
import { LeaderboardPodium } from "@/registry/edmi/blocks/leaderboard-podium/leaderboard-podium";
import { SiteHeader } from "@/registry/edmi/blocks/site-header/site-header";
import {
	StatStrip,
	StatStripItem,
	StatTile,
} from "@/registry/edmi/blocks/stat-tile/stat-tile";
import { TickerStrip } from "@/registry/edmi/blocks/ticker-strip/ticker-strip";
import { WatchlistItem } from "@/registry/edmi/blocks/watchlist-item/watchlist-item";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import { Table, TableBody, TableHeader } from "@/registry/edmi/ui/table";
import { RaisedSection } from "./_raised";

const tokens = [{ label: "A" }, { label: "N" }, { label: "T" }];
const rows: IndexRowData[] = [
	{
		name: "Mag Four Tilt",
		symbol: "MAGT",
		tokens,
		tags: ["Pre-IPO", "Clone"],
		creator: "GbFK…ZUWS",
		price: "$1.00",
		change: "+1.12%",
		aum: "$120.1K",
		holders: 2,
		spark: [4, 5, 4.6, 6, 6.4, 6.1, 7.2, 8, 8.4, 9.1],
	},
	{
		name: "Defense & Space",
		symbol: "DFSP",
		tokens,
		tags: ["Pre-IPO"],
		creator: "7Ge1…kXSq",
		price: "$0.9791",
		change: "−2.09%",
		aum: "$29K",
		holders: 1,
		spark: [9, 8.6, 8.9, 7.8, 7.5, 7.9, 6.8, 6.4, 6.6, 5.9],
	},
];

export default function Patterns1Preview() {
	const [layout, setLayout] = useState<Layout>("dashboard");
	return (
		<div className="flex flex-col gap-8">
			<SiteHeader
				lead="How to"
				steps={[
					{ label: "Start", href: "#" },
					{ label: "Build", href: "#" },
					{ label: "Sell", href: "#" },
					{ label: "Scale", href: "#" },
				]}
				links={[
					{ label: "Resources", href: "#" },
					{ label: "Pricing", href: "#" },
				]}
				action={<Button>Create an index</Button>}
			/>
			<AppHeader
				items={[
					{ label: "Explore", href: "#explore" },
					{ label: "Feed", href: "#feed" },
					{ label: "Leaderboard", href: "#lb" },
					{ label: "AI", href: "#ai" },
					{ label: "Create", href: "#create" },
				]}
				active="#lb"
			/>
			<div className="flex flex-wrap gap-4">
				<StatTile
					label="AUM"
					value="$49,182"
					delta="+37%"
					deltaLabel="vs last week"
				/>
				<StatTile
					label="Daily active holders"
					value="10.291"
					meter={{
						value: 23 / 30,
						zones: [
							{ upTo: 14 / 30, color: "var(--chart-1)" },
							{ upTo: 24 / 30, color: "var(--chart-3)" },
							{ upTo: 1, color: "var(--chart-5)" },
						],
					}}
					delta="+8%"
					deltaLabel="vs last week"
				/>
				<StatTile
					label="Net flow"
					value="−$1,204"
					delta="−4.2%"
					deltaLabel="vs last week"
				/>
			</div>
			<StatStrip>
				<StatStripItem value="412" label="holders" />
				<StatStripItem value="$49.2K" label="AUM" />
				<StatStripItem value="63%" label="activity off-hours" />
				<StatStripItem value="14" label="indexes" />
			</StatStrip>
			<TickerStrip
				items={[
					{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
					{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
					{ symbol: "TSLAx", price: "$370.21", change: "−0.31%" },
					{ symbol: "MSFTx", price: "$513.15", change: "+0.12%" },
					{ symbol: "SPYx", price: "$767.86", change: "+0.30%" },
				]}
			/>
			<Card className="w-full gap-0 py-0">
				<Table>
					<TableHeader>
						<IndexRowHeader />
					</TableHeader>
					<TableBody>
						{rows.map((r) => (
							<IndexRow key={r.symbol} index={r} />
						))}
					</TableBody>
				</Table>
			</Card>
			<div className="flex w-60 flex-col gap-1.5">
				<WatchlistItem
					symbol="MAG4"
					price="1.0000"
					change="+2.38%"
					color="var(--chart-1)"
				/>
				<WatchlistItem
					symbol="AIFR"
					price="1.0104"
					change="+0.84%"
					color="var(--chart-4)"
				/>
				<WatchlistItem
					symbol="ATLS"
					price="0.9893"
					change="−0.64%"
					color="var(--chart-3)"
				/>
			</div>
			<div className="flex flex-wrap items-start gap-8">
				<AllocationBar
					className="max-w-[420px]"
					segments={[
						{ label: "AAPLx", value: 40 },
						{ label: "NVDAx", value: 30 },
						{ label: "TSLAx", value: 20 },
						{ label: "SPACEX-pre", value: 10 },
					]}
				/>
				<JoinPanel
					defaultAmount="1,000"
					rows={[
						{ label: "Estimated shares", value: "982.09" },
						{ label: "Fee", value: "1.00%" },
					]}
					joinLabel="Join MAG4"
				/>
			</div>
			<LeaderboardPodium
				entries={[
					{ rank: 1, name: "dewi", meta: "$49.2K AUM · 412 holders" },
					{ rank: 2, name: "noah", meta: "$31.7K AUM · 265 holders" },
					{ rank: 3, name: "sarah", meta: "$18.9K AUM · 140 holders" },
				]}
			/>
			<LayoutPicker value={layout} onValueChange={setLayout} />
			<RaisedSection>
				<SiteHeader
					elevation="raised"
					lead="How to"
					steps={[
						{ label: "Start", href: "#" },
						{ label: "Build", href: "#" },
					]}
					links={[{ label: "Pricing", href: "#" }]}
					action={<Button elevation="raised">Create an index</Button>}
				/>
				<AppHeader
					elevation="raised"
					items={[
						{ label: "Explore", href: "#explore" },
						{ label: "Leaderboard", href: "#lb" },
					]}
					active="#lb"
				/>
				<div className="flex flex-wrap items-start gap-4">
					<StatTile
						elevation="raised"
						label="AUM"
						value="$49,182"
						delta="+37%"
						deltaLabel="vs last week"
					/>
					<JoinPanel
						elevation="raised"
						defaultAmount="1,000"
						rows={[{ label: "Estimated shares", value: "982.09" }]}
						joinLabel="Join MAG4"
					/>
				</div>
				<LeaderboardPodium
					elevation="raised"
					entries={[
						{ rank: 1, name: "dewi", meta: "$49.2K AUM · 412 holders" },
						{ rank: 2, name: "noah", meta: "$31.7K AUM · 265 holders" },
						{ rank: 3, name: "sarah", meta: "$18.9K AUM · 140 holders" },
					]}
				/>
				<LayoutPicker
					elevation="raised"
					value={layout}
					onValueChange={setLayout}
				/>
			</RaisedSection>
		</div>
	);
}
