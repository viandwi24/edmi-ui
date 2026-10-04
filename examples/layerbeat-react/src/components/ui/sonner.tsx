"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";
import { type Elevation, useElevation } from "@/components/ui/elevation";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react";

// ✦ depth (v4): floating is the natural level of a toast (overlay role in layered mode).
const toastElevation = {
	sunken: "shadow-none!",
	flat: "shadow-none!",
	raised: "border-transparent! shadow-raised!",
	floating: "border-transparent! shadow-floating!",
};

// Soft fill + tinted 40% border per type (DESIGN §4.12); default stays a solid popover chip.
// Sonner's own selectors are more specific than utilities, hence the important modifier.
const Toaster = ({
	elevation,
	...props
}: ToasterProps & {
	/** ✦ depth for every toast: flat 0, raised +1 (bevel), floating +2 (bevel + drop). */
	elevation?: Elevation;
}) => {
	const level = useElevation(elevation, "overlay");
	// next-themes is optional in a Vite app: without a ThemeProvider useTheme() returns "system".
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			icons={{
				success: (
					<CheckCircleIcon className="size-4 text-success-text" />
				),
				info: (
					<InfoIcon className="size-4 text-info-text" />
				),
				warning: (
					<WarningIcon className="size-4 text-warning-text" />
				),
				error: (
					<XCircleIcon className="size-4 text-destructive-text" />
				),
				loading: (
					<SpinnerIcon className="size-4 animate-spin" />
				),
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius-xl)",
					"--width": "360px",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: `cn-toast ${toastElevation[level]} text-[13.5px] font-sans`,
					title: "font-medium",
					description: "text-muted-foreground!",
					success:
						"bg-success-soft! border-[color-mix(in_srgb,var(--success)_40%,var(--popover))]!",
					info: "bg-info-soft! border-[color-mix(in_srgb,var(--info)_40%,var(--popover))]!",
					warning:
						"bg-warning-soft! border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))]!",
					error:
						"bg-destructive-soft! border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))]!",
				},
			}}
			{...props}
		/>
	);
};

// ✦ Re-exported so apps import `toast` and `Toaster` from one place.
export { Toaster, toast };
