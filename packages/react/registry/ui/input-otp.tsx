"use client";

import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
const fieldElevation = {
	sunken:
		"rounded-none border-0 border-l border-border bg-transparent shadow-none first:border-l-0 data-[active=true]:rounded-md data-[active=true]:border-transparent data-[active=true]:shadow-[0_0_0_3px_var(--ring-soft),inset_0_0_0_1px_var(--ring)]",
	flat: "",
	raised:
		"rounded-none border-0 border-l border-border bg-transparent shadow-none first:border-l-0 data-[active=true]:rounded-md data-[active=true]:border-transparent data-[active=true]:shadow-[0_0_0_3px_var(--ring-soft),inset_0_0_0_1px_var(--ring)]",
	floating:
		"rounded-none border-0 border-l border-border bg-transparent shadow-none first:border-l-0 data-[active=true]:rounded-md data-[active=true]:border-transparent data-[active=true]:shadow-[0_0_0_3px_var(--ring-soft),inset_0_0_0_1px_var(--ring)]",
};

const InputOTPElevationContext = React.createContext<Elevation | undefined>(
	undefined,
);

function InputOTP({
	className,
	containerClassName,
	elevation,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
	/** ✦ depth for every slot: sunken -1, flat 0, raised +1, floating +2. */
	elevation?: Elevation;
}) {
	return (
		<InputOTPElevationContext.Provider value={elevation}>
			<OTPInput
				data-slot="input-otp"
				containerClassName={cn(
					"flex items-center gap-2 has-disabled:opacity-50",
					containerClassName,
				)}
				spellCheck={false}
				className={cn("disabled:cursor-not-allowed", className)}
				{...props}
			/>
		</InputOTPElevationContext.Provider>
	);
}

// ✦ depth (v6): at sunken/raised/floating the group is one plate; slots turn transparent with 1px separators
const groupElevation = {
	sunken: "rounded-lg border border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised:
		"rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised",
	floating:
		"rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating",
};

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	const group = React.useContext(InputOTPElevationContext);
	const level = useElevation(group, "field");
	return (
		<div
			data-slot="input-otp-group"
			className={cn(
				"flex items-center gap-1.5",
				level !== "flat" && "inline-flex gap-0",
				groupElevation[level],
				className,
			)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	elevation,
	...props
}: React.ComponentProps<"div"> & {
	index: number;
	/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
	elevation?: Elevation;
}) {
	const group = React.useContext(InputOTPElevationContext);
	const level = useElevation(elevation ?? group, "field");
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				"relative flex size-10 items-center justify-center rounded-md border border-input bg-card font-mono text-sm text-foreground outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:shadow-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:shadow-ring-error",
				fieldElevation[level],
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-pulse bg-foreground duration-1000" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: stock markup; div keeps layout predictable
		<div
			data-slot="input-otp-separator"
			className="flex items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
			role="separator"
			{...props}
		>
			<IconPlaceholder
				lucide="MinusIcon"
				tabler="IconMinus"
				hugeicons="MinusSignIcon"
				phosphor="MinusIcon"
				remixicon="RiSubtractLine"
			/>
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
