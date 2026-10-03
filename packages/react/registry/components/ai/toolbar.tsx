// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { NodeToolbar, Position } from "@xyflow/react";
import { cn } from "cn";
import type { ComponentProps } from "react";

export type ToolbarProps = ComponentProps<typeof NodeToolbar>;

/** Floating actions attached to a node (solid chip: `--popover` + 1px border). Above the node by default. */
export const Toolbar = ({ className, ...props }: ToolbarProps) => (
	<NodeToolbar
		data-slot="ai-toolbar"
		className={cn(
			"flex items-center gap-0.5 rounded-[9px] border border-border bg-popover p-[3px]",
			className,
		)}
		position={Position.Top}
		{...props}
	/>
);
