import { cn } from "cn";
import type * as React from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";

const isDown = (s: string) => /^[-−–]/.test(s.trim());

// Tiny trend line. `tone` defaults to the direction of the series (last vs first).
function Sparkline({
	className,
	data,
	tone,
	width = 88,
	height = 28,
	...props
}: Omit<React.ComponentProps<"svg">, "children" | "width" | "height"> & {
	data: number[];
	tone?: "up" | "down";
	width?: number;
	height?: number;
}) {
	if (data.length < 2) return null;
	const min = Math.min(...data);
	const max = Math.max(...data);
	const span = max - min || 1;
	const pad = 2;
	const points = data
		.map((v, i) => {
			const x = pad + (i / (data.length - 1)) * (width - pad * 2);
			const y = pad + (1 - (v - min) / span) * (height - pad * 2);
			return `${x.toFixed(1)},${y.toFixed(1)}`;
		})
		.join(" ");
	const down = tone ? tone === "down" : (data.at(-1) ?? 0) < (data[0] ?? 0);
	return (
		<svg
			data-slot="sparkline"
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			aria-hidden="true"
			className={cn(
				"inline-block",
				down ? "text-destructive-text" : "text-success-text",
				className,
			)}
			{...props}
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

type IndexRowData = {
	name: string;
	symbol: string;
	/** One avatar per constituent token: image URL or a short label. */
	tokens: { label: string; image?: string }[];
	tags?: string[];
	creator: string;
	price: string;
	/** Signed percentage, e.g. `+1.12%`. */
	change: string;
	aum: string;
	holders: string | number;
	/** Series for the 30d sparkline. */
	spark?: number[];
	href?: string;
};

// Header row matching the IndexRow columns. Place it in `<TableHeader>`.
function IndexRowHeader({
	className,
	rank = false,
	...props
}: React.ComponentProps<typeof TableRow> & {
	/** ✦ Leading empty cell for the `rank` column of IndexRow. */
	rank?: boolean;
}) {
	return (
		<TableRow className={className} {...props}>
			{rank ? <TableHead className="w-10" /> : null}
			<TableHead>Index</TableHead>
			<TableHead>Creator</TableHead>
			<TableHead className="text-right">Price</TableHead>
			<TableHead className="text-right">7d</TableHead>
			<TableHead className="text-right">AUM</TableHead>
			<TableHead className="text-right">Holders</TableHead>
			<TableHead className="text-right">30d</TableHead>
		</TableRow>
	);
}

// One market row: avatar stack, name + ticker + tags, mono numbers, delta, sparkline. Use inside `<TableBody>`.
function IndexRow({
	className,
	index,
	rank,
	delta = "text",
	...props
}: Omit<React.ComponentProps<typeof TableRow>, "children"> & {
	index: IndexRowData;
	/** ✦ Leading mono rank column (pair with `<IndexRowHeader rank />`). */
	rank?: number | string;
	/** ✦ `text` (default) or `pill`: soft tinted pill for the 7d delta. */
	delta?: "text" | "pill";
}) {
	const down = isDown(index.change);
	return (
		<TableRow data-slot="index-row" className={className} {...props}>
			{rank !== undefined ? (
				<TableCell className="w-10 pr-0 font-mono text-[13px] text-muted-foreground">
					{rank}
				</TableCell>
			) : null}
			<TableCell>
				<div className="flex items-center gap-3">
					<AvatarGroup>
						{index.tokens.map((t) => (
							<Avatar key={t.label} className="size-7">
								{t.image ? <AvatarImage src={t.image} alt="" /> : null}
								<AvatarFallback className="text-[10px]">
									{t.label}
								</AvatarFallback>
							</Avatar>
						))}
					</AvatarGroup>
					<div>
						<div className="flex items-center gap-2">
							{index.href ? (
								<a href={index.href} className="font-semibold hover:underline">
									{index.name}
								</a>
							) : (
								<span className="font-semibold">{index.name}</span>
							)}
							<span className="font-mono text-[11.5px] text-muted-foreground">
								{index.symbol}
							</span>
						</div>
						{index.tags?.length ? (
							<div className="mt-1 flex items-center gap-1">
								{index.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="h-5 text-[11px]"
									>
										{tag}
									</Badge>
								))}
							</div>
						) : null}
					</div>
				</div>
			</TableCell>
			<TableCell className="font-mono text-xs text-muted-foreground">
				{index.creator}
			</TableCell>
			<TableCell className="text-right font-mono text-[12.5px] font-semibold">
				{index.price}
			</TableCell>
			<TableCell
				className={cn(
					"text-right font-mono text-[12.5px]",
					delta === "text" &&
						(down ? "text-destructive-text" : "text-success-text"),
				)}
			>
				{delta === "pill" ? (
					<span
						className={cn(
							"inline-block rounded-md px-2 py-[3px] text-xs",
							down
								? "bg-destructive-soft text-destructive-text"
								: "bg-brand-soft text-brand-text",
						)}
					>
						{index.change}
					</span>
				) : (
					index.change
				)}
			</TableCell>
			<TableCell className="text-right font-mono text-[12.5px]">
				{index.aum}
			</TableCell>
			<TableCell className="text-right font-mono text-[12.5px]">
				{index.holders}
			</TableCell>
			<TableCell className="text-right">
				{index.spark ? (
					<Sparkline data={index.spark} tone={down ? "down" : "up"} />
				) : null}
			</TableCell>
		</TableRow>
	);
}

export type { IndexRowData };
export { IndexRow, IndexRowHeader, Sparkline };
