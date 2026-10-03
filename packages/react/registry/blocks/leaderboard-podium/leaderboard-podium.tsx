import { cn } from "cn";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/edmi/ui/avatar";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";

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
	/** Mono caption under the name, e.g. `$49.2K AUM · 412 holders`. */
	meta?: string;
	image?: string;
	/** Avatar initials; defaults to the first two letters of `name`. */
	initials?: string;
	href?: string;
	/** ✦ `variant="cards"`: mono ticker under the name. */
	symbol?: string;
	/** ✦ `variant="cards"`: mono creator, top right of the card. */
	creator?: string;
	/** ✦ `variant="cards"`: signed headline percentage, e.g. `+1.12%`. */
	change?: string;
	/** ✦ `variant="cards"`: series for the sparkline. */
	spark?: number[];
	/** ✦ `variant="cards"`: weights bar with legend. */
	allocation?: PodiumAllocation[];
	/** ✦ `variant="cards"`: footer stats. */
	aum?: string;
	holders?: string | number;
};

const isDown = (s: string) => /^[-−–]/.test(s.trim());

function PodiumSpark({
	data,
	down,
	width = 150,
	height = 34,
}: {
	data: number[];
	down: boolean;
	width?: number;
	height?: number;
}) {
	if (data.length < 2) return null;
	const min = Math.min(...data);
	const span = Math.max(...data) - min || 1;
	const pad = 2;
	const points = data
		.map((v, i) => {
			const x = pad + (i / (data.length - 1)) * (width - pad * 2);
			const y = pad + (1 - (v - min) / span) * (height - pad * 2);
			return `${x.toFixed(1)},${y.toFixed(1)}`;
		})
		.join(" ");
	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			aria-hidden="true"
			className={cn(
				"max-w-[45%]",
				down ? "text-destructive-text" : "text-success-text",
			)}
		>
			<polyline
				points={points}
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

// `podium` (default): top three, #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
// `cards` ✦: three equal stat cards in rank order (leaderboard board): creator, name, headline change,
// sparkline, allocation bar and AUM / holders.
function LeaderboardPodium({
	className,
	entries,
	raised = false,
	variant = "podium",
	...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
	entries: PodiumEntry[];
	/** ✦ one-step 3D look for the cards. */
	raised?: boolean;
	/** ✦ `podium` (default) or `cards`. */
	variant?: "podium" | "cards";
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
							<Card raised={raised} className="h-full gap-0 p-6">
								<div className="flex items-center justify-between text-[13px]">
									<span className="font-medium">No. {e.rank}</span>
									{e.creator ? (
										<span className="font-mono text-xs text-muted-foreground">
											{e.creator}
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
											<PodiumSpark data={e.spark} down={down} />
										) : null}
									</div>
								) : null}
								{e.allocation?.length ? (
									<div className="mt-4">
										<div
											className="flex h-2 gap-[3px]"
											role="img"
											aria-label={e.allocation
												.map((s) => `${s.label} ${s.value}%`)
												.join(", ")}
										>
											{e.allocation.map((s, i) => (
												<span
													key={s.label}
													className="rounded-[3px]"
													style={{
														flex: s.value,
														background:
															s.color ?? `var(--chart-${(i % 5) + 1})`,
													}}
												/>
											))}
										</div>
										<ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-2">
											{e.allocation.map((s, i) => (
												<li key={s.label} className="flex items-center gap-1.5">
													<span
														className="size-2 rounded-[2px]"
														style={{
															background:
																s.color ?? `var(--chart-${(i % 5) + 1})`,
														}}
													/>
													<span className="font-mono">{s.label}</span>
													<b className="font-semibold text-foreground">
														{s.value}%
													</b>
												</li>
											))}
										</ul>
									</div>
								) : null}
								{e.aum !== undefined || e.holders !== undefined ? (
									<div className="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground">
										{e.aum !== undefined ? (
											<span>
												AUM{" "}
												<b className="font-mono font-medium text-foreground">
													{e.aum}
												</b>
											</span>
										) : null}
										{e.holders !== undefined ? (
											<span>
												Holders{" "}
												<b className="font-mono font-medium text-foreground">
													{e.holders}
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
						raised={raised}
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
