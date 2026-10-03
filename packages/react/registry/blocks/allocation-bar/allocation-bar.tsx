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
	...props
}: Omit<React.ComponentProps<"div">, "children"> & {
	segments: AllocationSegment[];
	showLegend?: boolean;
}) {
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
						className="h-2.5 rounded-full"
						style={{ flex: s.value, background: s.color }}
					/>
				))}
			</div>
			{showLegend ? (
				<ul className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px]">
					{colored.map((s) => (
						<li key={s.label} className="flex items-center gap-1.5">
							<span
								className="size-[9px] rounded-[3px]"
								style={{ background: s.color }}
							/>
							{s.label}
							<b className="font-mono font-medium">{s.value}%</b>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

export type { AllocationSegment };
export { AllocationBar };
