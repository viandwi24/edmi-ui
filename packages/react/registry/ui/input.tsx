"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
const fieldElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken focus-visible:bg-card",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

function Input({
	className,
	type,
	elevation,
	...props
}: React.ComponentProps<"input"> & {
	/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "field");
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[invalid]:border-destructive data-[invalid]:shadow-ring-error",
				fieldElevation[level],
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
