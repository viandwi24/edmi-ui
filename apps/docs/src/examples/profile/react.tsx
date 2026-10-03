import { AgentIdenticon } from "@edmi-react/blocks/agent-card/agent-card";
import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { Sparkline } from "@edmi-react/blocks/index-row/index-row";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Progress } from "@edmi-react/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-react/ui/table";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { created, nav, positions, profile } from "./data";

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

function Name({ name, symbol }: { name: string; symbol: string }) {
	return (
		<div className="flex items-baseline gap-2">
			<span className="font-medium">{name}</span>
			<span className="font-mono text-[11.5px] text-muted-foreground">
				{symbol}
			</span>
		</div>
	);
}

export default function ProfileExample() {
	const progress =
		((profile.xp - profile.levelStartXp) /
			(profile.nextLevelXp - profile.levelStartXp)) *
		100;
	return (
		<div className="min-h-svh bg-background text-foreground">
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
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-5">
						<AgentIdenticon
							seed={profile.address}
							size={96}
							className="rounded-2xl"
						/>
						<div>
							<h1 className="font-mono text-[40px] leading-tight font-normal tracking-[-1px]">
								{profile.short}
							</h1>
							<div className="mt-1 flex items-center gap-2 font-mono text-[13px] text-foreground-2">
								{profile.address}
								<Button
									variant="ghost"
									size="icon-xs"
									aria-label="Copy address"
								>
									<IconPlaceholder
										lucide="CopyIcon"
										tabler="IconCopy"
										hugeicons="Copy01Icon"
										phosphor="CopyIcon"
										remixicon="RiFileCopyLine"
									/>
								</Button>
							</div>
							<div className="mt-1 text-[13px] text-muted-foreground">
								{profile.followers} followers · {profile.following} following
							</div>
						</div>
					</div>
					<Button raised variant="outline">
						Edit profile
					</Button>
				</div>

				<div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
					<Card raised className="gap-3 px-6">
						<div className="flex items-end justify-between">
							<span className="text-[13px] text-muted-foreground">Level</span>
							<span className="text-[34px] leading-none font-light">
								{profile.level}
							</span>
						</div>
						<Progress
							value={progress}
							variant="brand"
							aria-label="Level progress"
						/>
						<div className="text-[13px] text-muted-foreground">
							{profile.xp} XP · next level at {profile.nextLevelXp}
						</div>
					</Card>
					<Card raised className="gap-3 px-6">
						<span className="text-[13px] text-muted-foreground">Badges</span>
						<div className="flex flex-wrap gap-2">
							{profile.badges.map((b) => (
								<Badge key={b} variant="secondary">
									{b}
								</Badge>
							))}
						</div>
					</Card>
				</div>

				<Card raised className="gap-4 px-6">
					<h2 className="text-xl font-normal tracking-[-0.3px]">
						Indexes created
					</h2>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Index</TableHead>
								<TableHead className="text-right">Share price</TableHead>
								<TableHead className="text-right">7d</TableHead>
								<TableHead className="text-right">AUM</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{created.map((c) => (
								<TableRow key={c.symbol}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Tokens tokens={c.tokens} />
											<Name name={c.name} symbol={c.symbol} />
										</div>
									</TableCell>
									<TableCell className="text-right font-mono text-[13px]">
										{c.price}
									</TableCell>
									<TableCell className="text-right">
										<Badge variant="success" shape="number">
											{c.change}
										</Badge>
									</TableCell>
									<TableCell className="text-right font-mono text-[13px]">
										{c.aum}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>

				<Card raised className="gap-4 px-6">
					<h2 className="text-xl font-normal tracking-[-0.3px]">Positions</h2>
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
												<Name name={p.name} symbol={p.symbol} />
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
			</div>
		</div>
	);
}
