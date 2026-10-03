import { cn } from "cn";
import type * as React from "react";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";

const isDown = (s: string) => /^[-−–]/.test(s.trim());

type MeterZone = {
	/** Upper bound of the zone, 0..1. */
	upTo: number;
	/** Any CSS color, e.g. `var(--chart-1)`. */
	color: string;
};

const defaultZones: MeterZone[] = [
	{ upTo: 0.5, color: "var(--chart-1)" },
	{ upTo: 0.8, color: "var(--chart-3)" },
	{ upTo: 1, color: "var(--chart-5)" },
];

// Segmented meter: `steps` flat bars, filled up to `value` (0..1), the rest dimmed.
function StatMeter({
	className,
	value,
	steps = 30,
	zones = defaultZones,
	...props
}: Omit<React.ComponentProps<"div">, "children"> & {
	value: number;
	steps?: number;
	zones?: MeterZone[];
}) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: <meter> cannot be styled as segments
		<div
			data-slot="stat-meter"
			role="meter"
			aria-valuemin={0}
			aria-valuemax={1}
			aria-valuenow={value}
			className={cn("flex gap-0.5", className)}
			{...props}
		>
			{Array.from({ length: steps }, (_, i) => {
				const at = (i + 1) / steps;
				const zone = zones.find((z) => at <= z.upTo) ?? zones[zones.length - 1];
				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static list
						key={i}
						className={cn("h-[7px] flex-1", at > value && "opacity-30")}
						style={{ background: zone?.color }}
					/>
				);
			})}
		</div>
	);
}

// KPI tile: label, mono value, delta badge (+ optional meter). Delta direction comes from its sign.
function StatTile({
	className,
	label,
	value,
	delta,
	deltaLabel,
	trend,
	meter,
	children,
	...props
}: Omit<React.ComponentProps<typeof Card>, "children" | "size"> & {
	label: React.ReactNode;
	value: React.ReactNode;
	delta?: string;
	deltaLabel?: React.ReactNode;
	/** Overrides the sign-based direction of `delta`. */
	trend?: "up" | "down";
	/** Segmented meter under the value. */
	meter?: React.ComponentProps<typeof StatMeter>;
	children?: React.ReactNode;
}) {
	const down = trend ? trend === "down" : delta ? isDown(delta) : false;
	return (
		<Card
			data-slot="stat-tile"
			className={cn("w-60 gap-0 px-5 py-[18px]", className)}
			{...props}
		>
			<div className="text-[13px] text-muted-foreground">{label}</div>
			<div className="mt-1.5 font-mono text-[28px] leading-tight tracking-[-0.5px]">
				{value}
			</div>
			{meter ? (
				<StatMeter {...meter} className={cn("mt-2.5", meter.className)} />
			) : null}
			{delta ? (
				<div className="mt-2.5 flex items-center gap-2">
					<Badge
						variant={down ? "destructive" : "brand"}
						shape="number"
						className="px-[7px]"
					>
						{delta}
					</Badge>
					{deltaLabel ? (
						<span className="text-xs text-muted-foreground">{deltaLabel}</span>
					) : null}
				</div>
			) : null}
			{children}
		</Card>
	);
}

// Row of numbers in one card; cells are divided by 1px borders.
function StatStrip({ className, ...props }: React.ComponentProps<typeof Card>) {
	return (
		<Card
			data-slot="stat-strip"
			className={cn("flex-row gap-0 overflow-x-auto p-0", className)}
			{...props}
		/>
	);
}

function StatStripItem({
	className,
	value,
	label,
	...props
}: Omit<React.ComponentProps<"div">, "children"> & {
	value: React.ReactNode;
	label: React.ReactNode;
}) {
	return (
		<div
			data-slot="stat-strip-item"
			className={cn(
				"min-w-[140px] flex-1 border-border px-[22px] py-4 not-first:border-l",
				className,
			)}
			{...props}
		>
			<div className="font-mono text-2xl">{value}</div>
			<div className="mt-1 text-xs text-muted-foreground">{label}</div>
		</div>
	);
}

export type { MeterZone };
export { StatMeter, StatStrip, StatStripItem, StatTile };
