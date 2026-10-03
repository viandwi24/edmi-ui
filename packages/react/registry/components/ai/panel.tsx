// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { Panel as PanelPrimitive } from "@xyflow/react";
import { cn } from "cn";
import type { ComponentProps } from "react";

export type PanelProps = ComponentProps<typeof PanelPrimitive>;

/** Any UI pinned to a canvas corner (legend, filters, run buttons). Workflow only, not the ui inset panel. */
export const Panel = ({ className, ...props }: PanelProps) => (
	<PanelPrimitive
		data-slot="ai-panel"
		className={cn(
			"m-4 overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card p-1",
			className,
		)}
		{...props}
	/>
);
