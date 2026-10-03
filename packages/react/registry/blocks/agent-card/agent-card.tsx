import { cn } from "cn";
import type * as React from "react";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";

// Four tones of the board identicon: columns repeat muted-2 / muted / foreground-2 / empty.
const TONES = [
	"bg-muted-foreground-2",
	"bg-muted-foreground",
	"bg-foreground-2",
	"bg-transparent",
];

function hash(seed: string) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

type AgentIdenticonProps = React.ComponentProps<"div"> & {
	/** Deterministic seed (agent name or address). */
	seed: string;
	/** Edge length in px. */
	size?: number;
};

/** 5x5 token-colored identicon, deterministic per `seed`. */
function AgentIdenticon({
	seed,
	size = 44,
	className,
	style,
	...props
}: AgentIdenticonProps) {
	let h = hash(seed);
	const cells = Array.from({ length: 25 }, (_, i) => {
		if (i % 5 === 0) h = hash(`${seed}:${i}:${h}`);
		return TONES[(h >>> ((i % 5) * 2)) & 3];
	});
	return (
		<div
			data-slot="agent-identicon"
			aria-hidden="true"
			className={cn(
				"grid shrink-0 grid-cols-5 overflow-hidden rounded-xl border border-border bg-muted",
				className,
			)}
			style={{ width: size, height: size, ...style }}
			{...props}
		>
			{cells.map((tone, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static grid
				<span key={i} className={tone} />
			))}
		</div>
	);
}

type AgentCardStat = { label: string; value: React.ReactNode };

type AgentCardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
	name: string;
	/** Mono sub line, usually a shortened address. */
	address?: string;
	/** Secondary badge next to the name (e.g. "AI"). */
	tag?: string;
	/** Shows the brand "Autopilot" badge. */
	autopilot?: boolean;
	stats?: AgentCardStat[];
	/** Identicon seed; defaults to `name`. */
	seed?: string;
};

function AgentCard({
	className,
	name,
	address,
	tag,
	autopilot,
	stats,
	seed,
	...props
}: AgentCardProps) {
	return (
		<Card
			data-slot="agent-card"
			className={cn("gap-0 p-5", className)}
			{...props}
		>
			<div className="flex items-center gap-3.5">
				<AgentIdenticon seed={seed ?? name} />
				<div className="min-w-0">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-base font-semibold">{name}</span>
						{tag ? <Badge variant="secondary">{tag}</Badge> : null}
						{autopilot ? (
							<Badge variant="brand">
								<span className="size-1.5 rounded-full bg-current" />
								Autopilot
							</Badge>
						) : null}
					</div>
					{address ? (
						<div className="mt-1 font-mono text-xs text-muted-foreground">
							{address}
						</div>
					) : null}
				</div>
			</div>
			{stats?.length ? (
				<div className="mt-4 flex justify-between border-t border-border pt-3.5">
					{stats.map((s) => (
						<div key={s.label}>
							<div className="text-xs text-muted-foreground">{s.label}</div>
							<div className="mt-1 font-mono text-[19px]">{s.value}</div>
						</div>
					))}
				</div>
			) : null}
		</Card>
	);
}

export type { AgentCardStat };
export { AgentCard, AgentIdenticon };
