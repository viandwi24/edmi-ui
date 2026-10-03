import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react";

// Soft fill + tinted 40% border per type (DESIGN §4.12); default stays a solid popover chip.
// Sonner's own selectors are more specific than utilities, hence the important modifier.
const Toaster = ({
	raised = false,
	...props
}: ToasterProps & {
	/** ✦ one-step 3D look for every toast (`border-b-lip` + 3px lip). */
	raised?: boolean;
}) => {
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
					toast: raised
						? "cn-toast border-b-lip! shadow-[0_3px_0_var(--lip)]! text-[13.5px] font-sans"
						: "cn-toast shadow-none! text-[13.5px] font-sans",
					title: "font-medium",
					description: "text-muted-foreground!",
					success: "bg-success-soft! border-success/40!",
					info: "bg-info-soft! border-info/40!",
					warning: "bg-warning-soft! border-warning/40!",
					error: "bg-destructive-soft! border-destructive/40!",
				},
			}}
			{...props}
		/>
	);
};

// ✦ Re-exported so apps import `toast` and `Toaster` from one place.
export { Toaster, toast };
