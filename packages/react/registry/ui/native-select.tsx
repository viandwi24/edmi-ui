import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
	size?: "sm" | "default";
	/** ✦ one-step 3D look. */
	raised?: boolean;
};

function NativeSelect({
	className,
	size = "default",
	raised = false,
	...props
}: NativeSelectProps) {
	return (
		<div
			className={cn(
				"group/native-select relative w-fit has-[select:disabled]:opacity-50",
				className,
			)}
			data-slot="native-select-wrapper"
			data-size={size}
		>
			<select
				data-slot="native-select"
				data-size={size}
				className={cn(
					"h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-card pr-8 pl-3 text-sm text-foreground outline-none select-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[size=sm]:h-8 data-[size=sm]:rounded-[7px]",
					raised && "border-b-lip shadow-[0_2px_0_var(--lip)]",
				)}
				{...props}
			/>
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	);
}

function NativeSelectOption({
	className,
	...props
}: React.ComponentProps<"option">) {
	return (
		<option
			data-slot="native-select-option"
			className={cn("bg-[Canvas] text-[CanvasText]", className)}
			{...props}
		/>
	);
}

function NativeSelectOptGroup({
	className,
	...props
}: React.ComponentProps<"optgroup">) {
	return (
		<optgroup
			data-slot="native-select-optgroup"
			className={cn("bg-[Canvas] text-[CanvasText]", className)}
			{...props}
		/>
	);
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
