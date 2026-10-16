import type { Rect } from "../data";

/** Decorative pixel art drawn from the rect lists in data.ts. */
export function Pixels({
	w,
	h,
	rects,
	className,
}: {
	w: number;
	h: number;
	rects: Rect[];
	className?: string;
}) {
	return (
		<svg
			viewBox={`0 0 ${w} ${h}`}
			shapeRendering="crispEdges"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
			className={className}
		>
			{rects.map((r, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static decorative rects
				<rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.c} />
			))}
		</svg>
	);
}

/** Task status: spinning ring while running, green dot when done. */
export function Status({ status }: { status: "running" | "done" }) {
	if (status === "done")
		return (
			<span
				className="size-1.5 rounded-full bg-success"
				role="img"
				aria-label="Done"
			/>
		);
	return (
		<svg
			viewBox="0 0 16 16"
			className="size-3.5 animate-spin text-muted-foreground"
			role="img"
			aria-label="Running"
		>
			<circle
				cx="8"
				cy="8"
				r="6"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeOpacity="0.3"
			/>
			<path
				d="M8 2a6 6 0 0 1 6 6"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
