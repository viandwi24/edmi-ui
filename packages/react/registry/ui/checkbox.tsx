"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// Flat by default: checked = solid --primary fill. ✦ `elevation` raised/floating: only the checked box rises (bevel).
// Indeterminate uses the same fill.
function Checkbox({
	className,
	elevation,
	...props
}: CheckboxPrimitive.Root.Props & {
	/** ✦ depth: raised +1 / floating +2 make the checked box rise. */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "control");
	const raised = level === "raised" || level === "floating";
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input bg-card text-primary-foreground transition-[box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[invalid]:border-destructive data-[invalid]:shadow-ring-error group-has-disabled/field:opacity-50",
				"data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
				raised &&
					"data-[checked]:border-transparent data-[checked]:[background-image:var(--r1-p-face)] data-[checked]:shadow-btn-raised-primary data-[indeterminate]:border-transparent data-[indeterminate]:[background-image:var(--r1-p-face)] data-[indeterminate]:shadow-btn-raised-primary",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
				render={(indicatorProps, state) => (
					<span {...indicatorProps}>
						{state.indeterminate ? (
							<IconPlaceholder
								lucide="MinusIcon"
								tabler="IconMinus"
								hugeicons="MinusSignIcon"
								phosphor="MinusIcon"
								remixicon="RiSubtractLine"
								strokeWidth={3}
							/>
						) : (
							<IconPlaceholder
								lucide="CheckIcon"
								tabler="IconCheck"
								hugeicons="Tick02Icon"
								phosphor="CheckIcon"
								remixicon="RiCheckLine"
								strokeWidth={3}
							/>
						)}
					</span>
				)}
			/>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
