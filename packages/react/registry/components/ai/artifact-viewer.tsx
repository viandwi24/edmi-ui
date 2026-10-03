import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";

export type ArtifactViewerProps = ComponentProps<typeof Card>;

/** Side panel that shows one artifact. */
export const ArtifactViewer = ({
	className,
	...props
}: ArtifactViewerProps) => (
	<Card
		data-slot="ai-artifact-viewer"
		className={cn("gap-0 py-0 text-card-foreground", className)}
		{...props}
	/>
);

export type ArtifactViewerHeaderProps = ComponentProps<"div">;

export const ArtifactViewerHeader = ({
	className,
	...props
}: ArtifactViewerHeaderProps) => (
	<div
		data-slot="ai-artifact-viewer-header"
		className={cn(
			"flex h-[46px] shrink-0 items-center gap-1 border-b border-border pr-2 pl-4",
			className,
		)}
		{...props}
	/>
);

export type ArtifactViewerTitleProps = ComponentProps<"span"> & {
	/** Format shown after the title in mono (`PDF`). */
	format?: ReactNode;
};

export const ArtifactViewerTitle = ({
	className,
	children,
	format,
	...props
}: ArtifactViewerTitleProps) => (
	<span
		data-slot="ai-artifact-viewer-title"
		className={cn("min-w-0 flex-1 truncate text-sm", className)}
		{...props}
	>
		{children}
		{format && (
			<span className="font-mono text-muted-foreground"> · {format}</span>
		)}
	</span>
);

export type ArtifactViewerActionProps = ComponentProps<typeof Button> & {
	/** Tooltip and accessible name. */
	label: string;
};

export const ArtifactViewerAction = ({
	label,
	children,
	...props
}: ArtifactViewerActionProps) => (
	<Tooltip>
		<TooltipTrigger
			render={
				<Button
					aria-label={label}
					size="icon-sm"
					type="button"
					variant="ghost"
					{...props}
				/>
			}
		>
			{children}
		</TooltipTrigger>
		<TooltipContent>{label}</TooltipContent>
	</Tooltip>
);

type PresetProps = Omit<ArtifactViewerActionProps, "label" | "children"> & {
	label?: string;
};

export const ArtifactViewerOpenIn = ({
	label = "Open in",
	...props
}: PresetProps) => (
	<ArtifactViewerAction label={label} {...props}>
		<IconPlaceholder
			lucide="ArrowUpRightIcon"
			tabler="IconArrowUpRight"
			hugeicons="ArrowUpRight01Icon"
			phosphor="ArrowUpRightIcon"
			remixicon="RiArrowRightUpLine"
			className="size-4"
		/>
	</ArtifactViewerAction>
);

export const ArtifactViewerDownload = ({
	label = "Download",
	...props
}: PresetProps) => (
	<ArtifactViewerAction label={label} {...props}>
		<IconPlaceholder
			lucide="DownloadIcon"
			tabler="IconDownload"
			hugeicons="DownloadIcon"
			phosphor="DownloadIcon"
			remixicon="RiDownloadLine"
			className="size-4"
		/>
	</ArtifactViewerAction>
);

export const ArtifactViewerExpand = ({
	label = "Expand",
	...props
}: PresetProps) => (
	<ArtifactViewerAction label={label} {...props}>
		<IconPlaceholder
			lucide="MaximizeIcon"
			tabler="IconMaximize"
			hugeicons="MaximizeScreenIcon"
			phosphor="ArrowsOutSimpleIcon"
			remixicon="RiFullscreenLine"
			className="size-4"
		/>
	</ArtifactViewerAction>
);

export const ArtifactViewerClose = ({
	label = "Close",
	...props
}: PresetProps) => (
	<ArtifactViewerAction label={label} {...props}>
		<IconPlaceholder
			lucide="XIcon"
			tabler="IconX"
			hugeicons="Cancel01Icon"
			phosphor="XIcon"
			remixicon="RiCloseLine"
			className="size-4"
		/>
	</ArtifactViewerAction>
);

export type ArtifactViewerContentProps = ComponentProps<"div">;

/** Scroll area on `--muted`; documents sit on it as paper. */
export const ArtifactViewerContent = ({
	className,
	...props
}: ArtifactViewerContentProps) => (
	<div
		data-slot="ai-artifact-viewer-content"
		className={cn("min-h-0 flex-1 overflow-auto bg-muted p-4", className)}
		{...props}
	/>
);

export type ArtifactViewerPaperProps = ComponentProps<"div">;

/** A white page, in light and dark mode alike (DESIGN 5b rule 5). */
export const ArtifactViewerPaper = ({
	className,
	...props
}: ArtifactViewerPaperProps) => (
	<div
		data-slot="ai-artifact-viewer-paper"
		className={cn(
			"w-full rounded-[calc(var(--radius)*0.6)] border border-border bg-white px-10 py-[34px] text-[#1f1f1d]",
			className,
		)}
		{...props}
	/>
);
