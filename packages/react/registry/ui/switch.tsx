"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// On uses --brand so live settings read as active at a glance. Sizes: default 40x24, sm 32x18.
function Switch({
	className,
	size = "default",
	elevation,
	...props
}: SwitchPrimitive.Root.Props & {
	size?: "sm" | "default";
	/** ✦ depth: raised +1 / floating +2 make the thumb rise (never the track). */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "handle");
	const raised = level === "raised" || level === "floating";
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(
				"peer group/switch relative inline-flex shrink-0 items-center rounded-full bg-input shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12),0_0_0_3px_var(--ring-soft)] aria-invalid:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12),0_0_0_3px_var(--destructive-soft)] aria-invalid:outline aria-invalid:outline-1 aria-invalid:-outline-offset-1 aria-invalid:outline-destructive data-[invalid]:outline data-[invalid]:outline-1 data-[invalid]:-outline-offset-1 data-[invalid]:outline-destructive data-[checked]:bg-brand data-[size=default]:h-6 data-[size=default]:w-10 data-[size=sm]:h-[18px] data-[size=sm]:w-8 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"pointer-events-none ml-[3px] block rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.1)] transition-transform group-data-[size=default]/switch:size-[18px] group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-[checked]:translate-x-4 group-data-[size=sm]/switch:data-[checked]:translate-x-3.5",
					raised && "bg-linear-to-b from-white to-[#eeede9] shadow-thumb",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
