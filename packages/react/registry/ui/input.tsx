import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sunk outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[invalid]:border-destructive data-[invalid]:shadow-ring-error",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
