import { cn } from "cn";
import type * as React from "react";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-[7px] bg-accent", className)}
			{...props}
		/>
	);
}

export { Skeleton };
