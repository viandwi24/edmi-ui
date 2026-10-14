import { cn } from "cn";
import type * as React from "react";
import { AllocationBar } from "@/registry/edmi/components/allocation-bar";
import { Sparkline } from "@/registry/edmi/components/index-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/edmi/ui/avatar";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";
import type { Elevation } from "@/registry/edmi/ui/elevation";

type PodiumAllocation = {
	label: string;
	/** Weight in percent (bars are proportional). */
	value: number;
	/** Any CSS color; defaults cycle `--chart-1…5`. */
	color?: string;
};

type PodiumEntry = {
	rank: 1 | 2 | 3;
	name: string;
	/** Mono caption under the name, e.g. `$49.2K · 412 members`. */
	meta?: string;
	image?: string;
	/** Avatar initials; defaults to the first two letters of `name`. */
	initials?: string;
	href?: string;
	/** ✦ `variant="cards"`: mono ticker under the name. */
	symbol?: string;
	/** ✦ `variant="cards"`: mono owner, top right of the card. */
	owner?: string;
	/** ✦ `variant="cards"`: signed headline percentage, e.g. `+1.12%`. */
	change?: string;
	/** ✦ `variant="cards"`: series for the sparkline. */
	spark?: number[];
	/** ✦ `variant="cards"`: weights bar with legend. */
	allocation?: PodiumAllocation[];
	/** ✦ `variant="cards"`: footer stat, labelled by `valueLabel`. */
	value?: string;
	/** ✦ `variant="cards"`: footer stat, labelled by `countLabel`. */
	count?: string | number;
};

const isDown = (s: string) => /^[-−–]/.test(s.trim());

// `podium` (default): top three, #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
// `cards` ✦: three equal stat cards in rank order (leaderboard board): owner, name, headline change,
// sparkline, allocation bar and value / count stats.
function LeaderboardPodium({
	className,
	entries,
	elevation,
	variant = "podium",
	valueLabel = "Value",
	countLabel = "Count",
	...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
	entries: PodiumEntry[];
	/** ✦ depth of the cards (forwarded to each Card). */
	elevation?: Elevation;
	/** ✦ `podium` (default) or `cards`. */
	variant?: "podium" | "cards";
	/** ✦ `cards`: label of the footer `value` stat. */
	valueLabel?: React.ReactNode;
	/** ✦ `cards`: label of the footer `count` stat. */
	countLabel?: React.ReactNode;
}) {
	const by = (r: number) => entries.find((e) => e.rank === r);
	if (variant === "cards") {
		const sorted = [by(1), by(2), by(3)].filter((e): e is PodiumEntry => !!e);
		return (
			<ol
				data-slot="leaderboard-podium"
				data-variant="cards"
				className={cn("grid gap-4 lg:grid-cols-3", className)}
				{...props}
			>
				{sorted.map((e) => {
					const down = e.change ? isDown(e.change) : false;
					return (
						<li key={e.rank}>
							<Card elevation={elevation} className="h-full gap-0 p-6">
								<div className="flex items-center justify-between text-[13px]">
									<span className="font-medium">No. {e.rank}</span>
									{e.owner ? (
										<span className="font-mono text-xs text-muted-foreground">
											{e.owner}
										</span>
									) : null}
								</div>
								<div className="mt-3 flex items-center gap-3">
									<Avatar className="size-11 rounded-xl after:rounded-xl">
										{e.image ? (
											<AvatarImage
												src={e.image}
												alt=""
												className="rounded-xl"
											/>
										) : null}
										<AvatarFallback className="rounded-xl bg-muted font-mono text-sm text-foreground-2">
											{(e.initials ?? e.name.slice(0, 2)).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										{e.href ? (
											<a
												href={e.href}
												className="text-lg font-medium hover:underline"
											>
												{e.name}
											</a>
										) : (
											<div className="text-lg font-medium">{e.name}</div>
										)}
										{e.symbol ? (
											<div className="font-mono text-xs text-muted-foreground">
												{e.symbol}
											</div>
										) : null}
									</div>
								</div>
								{e.change ? (
									<div className="mt-4 flex items-end justify-between gap-3">
										<span
											className={cn(
												"text-[30px] leading-none tracking-[-0.8px]",
												down ? "text-destructive-text" : "text-brand-text",
											)}
										>
											{e.change}
										</span>
										{e.spark ? (
											<Sparkline
												data={e.spark}
												tone={down ? "down" : "up"}
												width={150}
												height={34}
												className="max-w-[45%]"
											/>
										) : null}
									</div>
								) : null}
								{e.allocation?.length ? (
									<AllocationBar
										segments={e.allocation}
										size="sm"
										className="mt-4"
									/>
								) : null}
								{e.value !== undefined || e.count !== undefined ? (
									<div className="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground">
										{e.value !== undefined ? (
											<span>
												{valueLabel}{" "}
												<b className="font-mono font-medium text-foreground">
													{e.value}
												</b>
											</span>
										) : null}
										{e.count !== undefined ? (
											<span>
												{countLabel}{" "}
												<b className="font-mono font-medium text-foreground">
													{e.count}
												</b>
											</span>
										) : null}
									</div>
								) : null}
							</Card>
						</li>
					);
				})}
			</ol>
		);
	}
	const ordered = [by(2), by(1), by(3)].filter((e): e is PodiumEntry => !!e);
	return (
		<ol
			data-slot="leaderboard-podium"
			className={cn("flex items-start gap-3", className)}
			{...props}
		>
			{ordered.map((e) => (
				<li key={e.rank} className={cn("w-[200px]", e.rank !== 1 && "mt-6")}>
					<Card
						size="sm"
						elevation={elevation}
						className="items-center gap-0 p-[18px] text-center"
					>
						<Badge
							shape="number"
							variant={e.rank === 1 ? "warning" : "secondary"}
							className="rounded-full"
						>
							#{e.rank}
						</Badge>
						<Avatar className="mt-3 size-11">
							{e.image ? <AvatarImage src={e.image} alt="" /> : null}
							<AvatarFallback className="bg-linear-to-br from-info to-brand text-sm text-white">
								{(e.initials ?? e.name.slice(0, 2)).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						{e.href ? (
							<a href={e.href} className="mt-2.5 font-semibold hover:underline">
								{e.name}
							</a>
						) : (
							<div className="mt-2.5 font-semibold">{e.name}</div>
						)}
						{e.meta ? (
							<div className="mt-0.5 font-mono text-xs text-muted-foreground">
								{e.meta}
							</div>
						) : null}
					</Card>
				</li>
			))}
		</ol>
	);
}

export type { PodiumAllocation, PodiumEntry };
export { LeaderboardPodium };
