// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { ConnectionLineComponent } from "@xyflow/react";

const HALF = 0.5;

/** Line drawn while dragging from a handle: ring-colored bezier with an end dot. */
export const Connection: ConnectionLineComponent = ({
	fromX,
	fromY,
	toX,
	toY,
}) => (
	<g>
		<path
			className="animated"
			d={`M${fromX},${fromY} C ${fromX + (toX - fromX) * HALF},${fromY} ${fromX + (toX - fromX) * HALF},${toY} ${toX},${toY}`}
			fill="none"
			stroke="var(--ring)"
			strokeLinecap="round"
			strokeWidth={1.6}
		/>
		<circle
			cx={fromX}
			cy={fromY}
			fill="var(--card)"
			r={4.5}
			stroke="var(--ring)"
			strokeWidth={1.6}
		/>
		<circle cx={toX} cy={toY} fill="var(--ring)" r={3} />
	</g>
);
