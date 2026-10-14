import { cn } from "cn";
import type * as React from "react";

type AllocationSegment = {
	label: string;
	/** Weight in percent (any positive number; bars are proportional). */
	value: number;
	/** Any CSS color; defaults cycle `--chart-1…5`. */
	color?: string;
};

// Weights bar with a legend of label + mono percentage.
function AllocationBar({
	className,
	segments,
	showLegend = true,
	size = "default",
	...props
}: Omit<React.ComponentProps<"div">, "children"> & {
	segments: AllocationSegment[];
	showLegend?: boolean;
	/** ✦ `sm`: slimmer bar and a compact mono legend (cards). */
	size?: "default" | "sm";
}) {
	const sm = size === "sm";
	const colored = segments.map((s, i) => ({
		...s,
		color: s.color ?? `var(--chart-${(i % 5) + 1})`,
	}));
	return (
		<div
			data-slot="allocation-bar"
			className={cn("w-full", className)}
			{...props}
		>
			<div
				className="flex gap-[3px]"
				role="img"
				aria-label={colored.map((s) => `${s.label} ${s.value}%`).join(", ")}
			>
				{colored.map((s) => (
					<span
						key={s.label}
						className={sm ? "h-2 rounded-[3px]" : "h-2.5 rounded-full"}
						style={{ flex: s.value, background: s.color }}
					/>
				))}
			</div>
			{showLegend ? (
				<ul
					className={cn(
						"flex flex-wrap items-center gap-x-4 gap-y-1.5",
						sm ? "mt-3 text-xs text-foreground-2" : "mt-2.5 text-[12.5px]",
					)}
				>
					{colored.map((s) => (
						<li
							key={s.label}
							className={cn("flex items-center gap-1.5", sm && "font-mono")}
						>
							<span
								className={
									sm ? "size-2 rounded-[2px]" : "size-[9px] rounded-[3px]"
								}
								style={{ background: s.color }}
							/>
							{s.label}
							<b
								className={cn(
									"font-mono",
									sm ? "font-semibold text-foreground" : "font-medium",
								)}
							>
								{s.value}%
							</b>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

export type { AllocationSegment };
export { AllocationBar };
