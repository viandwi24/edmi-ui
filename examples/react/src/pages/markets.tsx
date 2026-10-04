import { PlusIcon } from "@phosphor-icons/react";
import { IndexRow, IndexRowHeader } from "@/components/index-row";
import { TickerStrip } from "@/components/ticker-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
	activity,
	creators,
	humanVsAi,
	indexes,
	tickers,
} from "@/data/markets";

function CardTop({ title, action }: { title: string; action?: string }) {
	return (
		<div className="flex items-baseline justify-between">
			<h2 className="text-xl font-normal tracking-[-0.3px]">{title}</h2>
			{action ? (
				<a
					href="#all"
					className="text-[13px] text-muted-foreground hover:text-foreground"
				>
					{action}
				</a>
			) : null}
		</div>
	);
}

function Mini({
	label,
	value,
	note,
}: {
	label: string;
	value: string;
	note: string;
}) {
	return (
		<div className="rounded-xl border border-border-2 bg-muted p-[18px] shadow-sunk">
			<div className="text-[13px] text-muted-foreground">{label}</div>
			<div className="my-2 text-[34px] leading-none font-light tracking-[-0.5px] text-success-text">
				{value}
			</div>
			<div className="text-[13px] text-muted-foreground">{note}</div>
		</div>
	);
}

// The page does not know about the shell: it renders the same inside Dashboard and Navbar layouts.
export function MarketsPage() {
	return (
		<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
							Markets
						</h1>
						<Badge variant="secondary">Simulated</Badge>
					</div>
					<p className="mt-1 text-lg text-muted-foreground">
						Tokenized stock indexes. Create one, share it, or join someone
						else’s.
					</p>
				</div>
				<Button size="lg">
					Create index
					<PlusIcon />
				</Button>
			</div>

			<TickerStrip  items={tickers} />

			<Card className="gap-4 px-6">
				<CardTop title="Top indexes" action="View all" />
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

			<div className="grid items-start gap-6 lg:grid-cols-3">
				<Card className="@container gap-4 px-6">
					<CardTop title="Human vs AI" />
					<div className="grid gap-3 @[400px]:grid-cols-2">
						<Mini {...humanVsAi.human} />
						<Mini {...humanVsAi.ai} />
					</div>
				</Card>

				<Card className="gap-3 px-6">
					<CardTop title="Top creators" action="See all" />
					<ul>
						{creators.map((c) => (
							<li
								key={c.address}
								className="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0"
							>
								<span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">
									{c.rank}
								</span>
								<div className="min-w-0 flex-1">
									<div className="font-mono text-[13px] font-semibold">
										{c.address}
									</div>
									<div className="text-xs text-muted-foreground">{c.meta}</div>
								</div>
								<div className="text-right">
									<div className="font-mono text-[13px] font-semibold">
										{c.aum}
									</div>
									<div className="text-xs text-muted-foreground">
										{c.joiners}
									</div>
								</div>
							</li>
						))}
					</ul>
				</Card>

				<Card className="gap-3 px-6">
					<CardTop title="Latest activity" />
					<ul>
						{activity.map((a, i) => (
							<li
								// biome-ignore lint/suspicious/noArrayIndexKey: static mock list
								key={i}
								className="flex items-center gap-2.5 border-b border-border-2 py-3 text-[13px] last:border-b-0"
							>
								<span
									className={`size-1.5 rounded-full ${a.tone === "brand" ? "bg-success" : "bg-warning"}`}
								/>
								<span className="font-mono font-semibold">{a.symbol}</span>
								<span className="min-w-0 flex-1 truncate text-foreground-2">
									{a.text}
								</span>
								<span className="text-muted-foreground">{a.ago}</span>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</div>
	);
}
