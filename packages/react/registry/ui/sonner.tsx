"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

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
					<IconPlaceholder
						lucide="CircleCheckIcon"
						tabler="IconCircleCheck"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
						className="size-4 text-success-text"
					/>
				),
				info: (
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="AlertCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
						className="size-4 text-info-text"
					/>
				),
				warning: (
					<IconPlaceholder
						lucide="TriangleAlertIcon"
						tabler="IconAlertTriangle"
						hugeicons="Alert02Icon"
						phosphor="WarningIcon"
						remixicon="RiErrorWarningLine"
						className="size-4 text-warning-text"
					/>
				),
				error: (
					<IconPlaceholder
						lucide="OctagonXIcon"
						tabler="IconAlertOctagon"
						hugeicons="MultiplicationSignCircleIcon"
						phosphor="XCircleIcon"
						remixicon="RiCloseCircleLine"
						className="size-4 text-destructive-text"
					/>
				),
				loading: (
					<IconPlaceholder
						lucide="Loader2Icon"
						tabler="IconLoader"
						hugeicons="Loading03Icon"
						phosphor="SpinnerIcon"
						remixicon="RiLoaderLine"
						className="size-4 animate-spin"
					/>
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
