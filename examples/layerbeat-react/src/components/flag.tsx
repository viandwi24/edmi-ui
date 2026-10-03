import type { Flag as FlagData } from "@/data/layerbeat";

// Tiny striped flag (3 bands) used in location cards and the summary.
export function Flag({
	flag,
	className,
}: {
	flag: FlagData;
	className?: string;
}) {
	const [a, b, c] = flag.colors;
	const bands =
		flag.dir === "h"
			? `linear-gradient(to bottom, ${a} 33.3%, ${b} 33.3% 66.6%, ${c} 66.6%)`
			: `linear-gradient(to right, ${a} 33.3%, ${b} 33.3% 66.6%, ${c} 66.6%)`;
	return (
		<span
			aria-hidden
			className={`inline-block h-3.5 w-5 shrink-0 rounded-[2px] ${className ?? ""}`}
			style={{ background: bands }}
		/>
	);
}
