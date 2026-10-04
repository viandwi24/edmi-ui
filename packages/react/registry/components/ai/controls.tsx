"use client";

import { Controls as ControlsPrimitive } from "@xyflow/react";
import { cn } from "cn";
import type { ComponentProps } from "react";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

/** Zoom in, zoom out, fit view and lock, stacked in one bordered card group. */
export const Controls = ({ className, ...props }: ControlsProps) => (
	<ControlsPrimitive
		data-slot="ai-controls"
		className={cn(
			"overflow-hidden rounded-[calc(var(--radius)*0.9)] border border-border bg-card shadow-none!",
			"[&>button]:size-[30px]! [&>button]:rounded-none! [&>button]:border-0! [&>button]:border-b! [&>button]:border-border! [&>button]:bg-transparent! [&>button]:text-foreground-2! [&>button]:last:border-b-0! [&>button]:hover:bg-accent!",
			"[&>button>svg]:size-[15px]! [&>button>svg]:max-h-none! [&>button>svg]:max-w-none!",
			className,
		)}
		{...props}
	/>
);
