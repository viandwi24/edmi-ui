import type { ReactFlowProps } from "@xyflow/react";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { cn } from "cn";
import type { CSSProperties, ReactNode } from "react";

import "@xyflow/react/dist/style.css";

export type CanvasProps = ReactFlowProps & {
	children?: ReactNode;
};

const deleteKeyCode = ["Backspace", "Delete"];

/** xyflow reads these variables; mapping them to Edmi tokens keeps every mode and theme in sync. */
const tokenVars = {
	"--xy-edge-stroke-default": "var(--muted-foreground)",
	"--xy-edge-stroke-selected-default": "var(--foreground)",
	"--xy-edge-stroke-width-default": "1.6",
	"--xy-connectionline-stroke-default": "var(--ring)",
	"--xy-connectionline-stroke-width-default": "1.6",
	"--xy-background-color-default": "var(--background)",
	"--xy-selection-background-color-default": "var(--ring-soft)",
	"--xy-selection-border-default": "1px solid var(--ring)",
	"--xy-attribution-background-color-default": "var(--card)",
} as CSSProperties;

/** Workflow surface: dotted `--input` dots on `--background`, pan and zoom, fit view on load. */
export const Canvas = ({
	children,
	className,
	style,
	...props
}: CanvasProps) => (
	<ReactFlow
		data-slot="ai-canvas"
		className={cn("bg-background", className)}
		deleteKeyCode={deleteKeyCode}
		fitView
		panOnDrag={false}
		panOnScroll
		selectionOnDrag={true}
		style={{ ...tokenVars, ...style }}
		zoomOnDoubleClick={false}
		{...props}
	>
		<Background
			color="var(--input)"
			gap={18}
			size={1}
			variant={BackgroundVariant.Dots}
		/>
		{children}
	</ReactFlow>
);
