import type { EdgeProps } from "@xyflow/react";
import { BaseEdge, getBezierPath } from "@xyflow/react";

/** Conditional or error path: dotted, muted. */
const Temporary = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
}: EdgeProps) => {
	const [edgePath] = getBezierPath({
		sourcePosition,
		sourceX,
		sourceY,
		targetPosition,
		targetX,
		targetY,
	});

	return (
		<BaseEdge
			id={id}
			path={edgePath}
			style={{
				stroke: "var(--muted-foreground-2)",
				strokeDasharray: "2 5",
				strokeLinecap: "round",
			}}
		/>
	);
};

/** Active data flow: brand dashes that move toward the target. */
const Animated = ({
	id,
	markerEnd,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style,
}: EdgeProps) => {
	const [edgePath] = getBezierPath({
		sourcePosition,
		sourceX,
		sourceY,
		targetPosition,
		targetX,
		targetY,
	});

	return (
		<BaseEdge
			id={id}
			markerEnd={markerEnd}
			path={edgePath}
			style={{
				stroke: "var(--brand)",
				strokeDasharray: "6 5",
				strokeLinecap: "round",
				animation: "dashdraw 0.6s linear infinite",
				...style,
			}}
		/>
	);
};

export const Edge = {
	Animated,
	Temporary,
};
