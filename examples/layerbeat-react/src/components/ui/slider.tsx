import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

// Array value: 1 = single, 2 = range, 3+ = multiple thumbs.
function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	raised = false,
	...props
}: SliderPrimitive.Root.Props & {
	/** ✦ one-step 3D look for the thumbs. */
	raised?: boolean;
}) {
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
								"border-b-brand-lip bg-linear-to-b from-white to-[#f1f0ec] shadow-[0_2px_0_var(--brand-lip)] [background-origin:border-box] focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_2px_0_var(--brand-lip)] data-[dragging]:shadow-[0_0_0_4px_var(--ring-soft),0_2px_0_var(--brand-lip)]",
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
