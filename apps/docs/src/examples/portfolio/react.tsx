import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { Sparkline } from "@edmi-react/blocks/index-row/index-row";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-react/ui/table";
import {
	looseAssets,
	looseNote,
	nav,
	positions,
	totals,
	yourIndexes,
} from "./data";

function Tokens({ tokens }: { tokens: string[] }) {
	return (
		<AvatarGroup>
			{tokens.map((t) => (
				<Avatar key={t} className="size-8">
					<AvatarFallback className="text-[10px]">{t}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
	);
}

function CardTop({ title, action }: { title: string; action?: string }) {
	return (
		<div className="flex items-center justify-between gap-3">
			<h2 className="text-xl font-normal tracking-[-0.3px]">{title}</h2>
			{action ? (
				<Button elevation="raised" variant="outline" size="sm">
					{action}
				</Button>
			) : null}
		</div>
	);
}

export default function PortfolioExample() {
	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#portfolio"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
							Portfolio
						</h1>
						<Badge variant="secondary">Simulated</Badge>
					</div>
					<p className="mt-1 text-lg text-muted-foreground">
						Your positions, loose assets and indexes.
					</p>
				</div>

				<div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
					<Card elevation="raised" className="gap-1.5 px-7">
						<div className="text-[13px] text-muted-foreground">Total value</div>
						<div className="text-[56px] leading-none font-light tracking-[-2px]">
							{totals.value}
						</div>
						<div className="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
							<Badge variant="destructive" shape="number">
								{totals.delta}
							</Badge>
							{totals.deltaNote}
						</div>
						<div className="mt-1 text-[13px] text-muted-foreground">
							{totals.breakdown}
						</div>
					</Card>
					{[totals.usdc, totals.sol].map((t, i) => (
						<Card key={t.value} elevation="raised" className="gap-1 px-6">
							<div className="text-[13px] text-muted-foreground">
								{i === 0 ? "USDC" : "SOL"}
							</div>
							<div className="font-mono text-[32px] leading-tight">
								{t.value}
							</div>
							<div className="text-[13px] text-muted-foreground">{t.note}</div>
						</Card>
					))}
				</div>

				<Card elevation="raised" className="gap-4 px-6">
					<CardTop title="Positions" action="Redeem all" />
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Index</TableHead>
								<TableHead className="text-right">Shares</TableHead>
								<TableHead className="text-right">Price</TableHead>
								<TableHead className="text-right">Value</TableHead>
								<TableHead className="text-right">PnL</TableHead>
								<TableHead className="text-right">7d</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{positions.map((p) => {
								const down = p.pnl.startsWith("-");
								return (
									<TableRow key={p.symbol}>
										<TableCell>
											<div className="flex items-center gap-3">
												<Tokens tokens={p.tokens} />
												<div className="flex items-baseline gap-2">
													<span className="font-medium">{p.name}</span>
													<span className="font-mono text-[11.5px] text-muted-foreground">
														{p.symbol}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell className="text-right font-mono text-[13px]">
											{p.shares}
										</TableCell>
										<TableCell className="text-right font-mono text-[13px]">
											{p.price}
										</TableCell>
										<TableCell className="text-right font-mono text-[13px]">
											{p.value}
										</TableCell>
										<TableCell
											className={`text-right font-mono text-[13px] ${down ? "text-destructive-text" : "text-success-text"}`}
										>
											{p.pnl} <span className="text-[11.5px]">{p.pnlPct}</span>
										</TableCell>
										<TableCell className="text-right">
											<Sparkline
												data={p.spark}
												tone={down ? "down" : "up"}
												width={64}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Card>

				<div className="grid items-start gap-6 lg:grid-cols-2">
					<Card elevation="raised" className="gap-3 px-6">
						<CardTop title="Loose assets" action="Swap all to USDC" />
						<p className="text-[13px] leading-relaxed text-muted-foreground">
							Assets in your wallet that are not in any index, worth about{" "}
							<b className="font-semibold text-foreground">{looseNote}</b>. Swap
							them back to USDC or use them to finish a join.
						</p>
						<ul>
							{looseAssets.map((a) => (
								<li
									key={a.symbol}
									className="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0"
								>
									<span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-[11px]">
										{a.letter}
									</span>
									<span className="flex-1 font-mono text-[14px] font-semibold">
										{a.symbol}
									</span>
									<span className="font-mono text-[13px] text-muted-foreground">
										{a.amount}
									</span>
								</li>
							))}
						</ul>
					</Card>

					<Card elevation="raised" className="gap-3 px-6">
						<CardTop title="Your indexes" action="Create index" />
						<ul>
							{yourIndexes.map((x) => (
								<li
									key={x.symbol}
									className="flex items-center gap-3 border-b border-border-2 py-3 last:border-b-0"
								>
									<Tokens tokens={x.tokens} />
									<div className="min-w-0 flex-1">
										<div className="flex items-baseline gap-2">
											<span className="font-medium">{x.name}</span>
											<span className="font-mono text-[11.5px] text-muted-foreground">
												{x.symbol}
											</span>
										</div>
										<div className="text-xs text-muted-foreground">
											AUM {x.aum}
										</div>
									</div>
									<Button elevation="raised" variant="outline" size="sm">
										Manage
									</Button>
								</li>
							))}
						</ul>
					</Card>
				</div>
			</div>
		</div>
	);
}
