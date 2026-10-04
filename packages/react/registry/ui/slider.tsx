"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// Array value: 1 = single, 2 = range, 3+ = multiple thumbs.
function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	elevation,
	...props
}: SliderPrimitive.Root.Props & {
	/** ✦ depth: raised +1 / floating +2 make the thumbs rise (never the track). */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "handle");
	const raised = level === "raised" || level === "floating";
	const _values = Array.isArray(value)
		? value
		: Array.isArray(defaultValue)
			? defaultValue
			: [min];

	return (
		<SliderPrimitive.Root
			className={cn(
				"data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
				className,
			)}
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="relative grow overflow-hidden rounded-full border border-border bg-muted select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="rounded-full bg-brand select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						// biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
						key={index}
						index={index}
						data-slot="slider-thumb"
						className={cn(
							"relative block size-[18px] shrink-0 rounded-full border border-brand-edge bg-white transition-shadow outline-none select-none after:absolute after:-inset-2 focus-visible:shadow-[0_0_0_4px_var(--ring-soft)] data-[dragging]:shadow-[0_0_0_4px_var(--ring-soft)]",
							raised &&
								"border-transparent bg-linear-to-b from-white to-[#eeede9] shadow-thumb focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)] data-[dragging]:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)]",
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
