"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";

export type ArtifactProps = ComponentProps<typeof Card>;

/** Container for generated output. Built on the ui card; `raised` ✦ gives the one-step 3D look. */
export const Artifact = ({
	className,
	raised = false,
	...props
}: ArtifactProps) => (
	<Card
		data-slot="ai-artifact"
		className={cn("w-full gap-0 py-0", className)}
		raised={raised}
		{...props}
	/>
);

export type ArtifactHeaderProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactHeader = ({
	className,
	...props
}: ArtifactHeaderProps) => (
	<div
		data-slot="ai-artifact-header"
		className={cn(
			"flex items-center justify-between gap-2.5 border-b border-border px-3.5 py-3",
			className,
		)}
		{...props}
	/>
);

export type ArtifactCloseProps = ComponentProps<typeof Button>;

/** Close button; a 1px divider separates it from the actions before it. */
export const ArtifactClose = ({
	className,
	children,
	size = "icon-sm",
	variant = "ghost",
	...props
}: ArtifactCloseProps) => (
	<Button
		className={cn(
			"relative ml-2 text-muted-foreground before:absolute before:top-1/2 before:-left-1.5 before:h-[18px] before:w-px before:-translate-y-1/2 before:bg-border hover:text-foreground",
			className,
		)}
		size={size}
		type="button"
		variant={variant}
		{...props}
	>
		{children ?? (
			<IconPlaceholder
				lucide="XIcon"
				tabler="IconX"
				hugeicons="Cancel01Icon"
				phosphor="XIcon"
				remixicon="RiCloseLine"
			/>
		)}
		<span className="sr-only">Close</span>
	</Button>
);

export type ArtifactTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactTitle = ({ className, ...props }: ArtifactTitleProps) => (
	<p
		className={cn("text-sm font-semibold text-foreground", className)}
		{...props}
	/>
);

export type ArtifactDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactDescription = ({
	className,
	...props
}: ArtifactDescriptionProps) => (
	<p className={cn("text-xs text-muted-foreground", className)} {...props} />
);

export type ArtifactActionsProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactActions = ({
	className,
	...props
}: ArtifactActionsProps) => (
	<div className={cn("flex items-center gap-1", className)} {...props} />
);

export type ArtifactActionProps = ComponentProps<typeof Button> & {
	tooltip?: string;
	label?: string;
	/** The icon element (an icon element); `children` works too. */
	icon?: ReactNode;
};

export const ArtifactAction = ({
	tooltip,
	label,
	icon,
	children,
	className,
	size = "icon-sm",
	variant = "ghost",
	...props
}: ArtifactActionProps) => {
	const button = (
		<Button
			className={cn("text-muted-foreground hover:text-foreground", className)}
			size={size}
			type="button"
			variant={variant}
			{...props}
		>
			{icon ?? children}
			<span className="sr-only">{label || tooltip}</span>
		</Button>
	);

	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger render={button} />
					<TooltipContent>
						<p>{tooltip}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return button;
};

export type ArtifactContentProps = HTMLAttributes<HTMLDivElement>;

/** Scrollable content. No padding by default (code blocks and images run edge to edge); add `p-4` for prose. */
export const ArtifactContent = ({
	className,
	...props
}: ArtifactContentProps) => (
	<div
		data-slot="ai-artifact-content"
		className={cn("flex-1 overflow-auto", className)}
		{...props}
	/>
);
