import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
import { MinusIcon, CheckIcon } from "@phosphor-icons/react";

// Flat by default: checked = solid --primary fill. ✦ `raised` adds the gradient + top highlight.
// Indeterminate uses the same fill.
function Checkbox({
	className,
	raised = false,
	...props
}: CheckboxPrimitive.Root.Props & {
	/** ✦ one-step 3D look for the checked state. */
	raised?: boolean;
}) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input bg-card text-primary-foreground shadow-sunk transition-[box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[invalid]:border-destructive data-[invalid]:shadow-ring-error group-has-disabled/field:opacity-50",
				"data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
				raised &&
					"data-[checked]:border-primary-edge data-[checked]:bg-linear-to-b data-[checked]:from-primary-hi data-[checked]:to-primary data-[checked]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[checked]:[background-origin:border-box] data-[indeterminate]:border-primary-edge data-[indeterminate]:bg-linear-to-b data-[indeterminate]:from-primary-hi data-[indeterminate]:to-primary data-[indeterminate]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[indeterminate]:[background-origin:border-box] data-[checked]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)] data-[indeterminate]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)]",
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
							<MinusIcon strokeWidth={3} />
						) : (
							<CheckIcon strokeWidth={3} />
						)}
					</span>
				)}
			/>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
