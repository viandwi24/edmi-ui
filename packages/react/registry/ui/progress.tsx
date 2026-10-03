import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";

function Progress({
	className,
	children,
	value,
	variant = "default",
	...props
}: ProgressPrimitive.Root.Props & { variant?: "default" | "brand" }) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			data-variant={variant}
			className={cn("flex flex-wrap gap-3", className)}
			{...props}
		>
			{children}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

// 8px track: muted fill + 1px border, indicator is --primary (✦ variant="brand" on Progress).
function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
	return (
		<ProgressPrimitive.Track
			className={cn(
				"relative flex h-2 w-full items-center overflow-hidden rounded-full border border-border bg-muted",
				className,
			)}
			data-slot="progress-track"
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	...props
}: ProgressPrimitive.Indicator.Props) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className={cn(
				"h-full rounded-full bg-primary transition-all [[data-variant=brand]_&]:bg-brand",
				className,
			)}
			{...props}
		/>
	);
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			className={cn("text-sm font-medium", className)}
			data-slot="progress-label"
			{...props}
		/>
	);
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			className={cn(
				"ml-auto font-mono text-[13px] text-muted-foreground tabular-nums",
				className,
			)}
			data-slot="progress-value"
			{...props}
		/>
	);
}

export {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
};
