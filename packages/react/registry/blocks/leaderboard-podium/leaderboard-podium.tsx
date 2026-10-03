import { cn } from "cn";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/edmi/ui/avatar";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";

type PodiumEntry = {
	rank: 1 | 2 | 3;
	name: string;
	/** Mono caption under the name, e.g. `$49.2K AUM · 412 holders`. */
	meta: string;
	image?: string;
	/** Avatar initials; defaults to the first two letters of `name`. */
	initials?: string;
	href?: string;
};

// Top three: #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
function LeaderboardPodium({
	className,
	entries,
	raised = false,
	...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
	entries: PodiumEntry[];
	/** ✦ one-step 3D look for the cards. */
	raised?: boolean;
}) {
	const by = (r: number) => entries.find((e) => e.rank === r);
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
						<div className="mt-0.5 font-mono text-xs text-muted-foreground">
							{e.meta}
						</div>
					</Card>
				</li>
			))}
		</ol>
	);
}

export type { PodiumEntry };
export { LeaderboardPodium };
