"use client";

import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Shimmer } from "@/registry/edmi/components/ai/shimmer";
import { Button } from "@/registry/edmi/ui/button";
import { ButtonGroup } from "@/registry/edmi/ui/button-group";
import { Card } from "@/registry/edmi/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

export type ArtifactKind =
	| "archive"
	| "document"
	| "code"
	| "image"
	| "slides"
	| "file";

type ArtifactCardContextValue = { state: "ready" | "generating" };
const ArtifactCardContext = createContext<ArtifactCardContextValue>({
	state: "ready",
});

export type ArtifactCardProps = ComponentProps<typeof Card> & {
	/** `generating`: the title shimmers and the actions are hidden. */
	state?: "ready" | "generating";
};

export const ArtifactCard = ({
	className,
	state = "ready",
	children,
	...props
}: ArtifactCardProps) => (
	<ArtifactCardContext.Provider value={{ state }}>
		<Card
			data-slot="ai-artifact-card"
			data-state={state}
			className={cn(
				"w-full flex-row items-center gap-3.5 px-3.5 py-3 text-card-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</Card>
	</ArtifactCardContext.Provider>
);

/** Icon for a kind of file; shared with the Session Panel file rows. */
export const ArtifactKindIcon = ({
	kind = "document",
	className = "size-5",
}: {
	kind?: ArtifactKind;
	className?: string;
}) => {
	switch (kind) {
		case "archive":
			return (
				<IconPlaceholder
					lucide="ArchiveIcon"
					tabler="IconArchive"
					hugeicons="Archive02Icon"
					phosphor="ArchiveIcon"
					remixicon="RiArchiveLine"
					className={className}
				/>
			);
		case "code":
			return (
				<IconPlaceholder
					lucide="FileCodeIcon"
					tabler="IconFileCode"
					hugeicons="File01Icon"
					phosphor="FileCodeIcon"
					remixicon="RiFileCodeLine"
					className={className}
				/>
			);
		case "image":
			return (
				<IconPlaceholder
					lucide="ImageIcon"
					tabler="IconPhoto"
					hugeicons="Image01Icon"
					phosphor="ImageIcon"
					remixicon="RiImageLine"
					className={className}
				/>
			);
		case "slides":
			return (
				<IconPlaceholder
					lucide="AppWindowIcon"
					tabler="IconAppWindow"
					hugeicons="BrowserIcon"
					phosphor="AppWindowIcon"
					remixicon="RiWindowLine"
					className={className}
				/>
			);
		case "file":
			return (
				<IconPlaceholder
					lucide="FileIcon"
					tabler="IconFile"
					hugeicons="File01Icon"
					phosphor="FileIcon"
					remixicon="RiFileLine"
					className={className}
				/>
			);
		default:
			return (
				<IconPlaceholder
					lucide="FileTextIcon"
					tabler="IconFileDescription"
					hugeicons="File01Icon"
					phosphor="FileTextIcon"
					remixicon="RiFileTextLine"
					className={className}
				/>
			);
	}
};

export type ArtifactCardIconProps = ComponentProps<"span"> & {
	kind?: ArtifactKind;
};

/** Icon tile for files without a thumbnail. */
export const ArtifactCardIcon = ({
	kind = "document",
	className,
	children,
	...props
}: ArtifactCardIconProps) => (
	<span
		data-slot="ai-artifact-card-icon"
		className={cn(
			"inline-flex h-14 w-[52px] shrink-0 items-center justify-center rounded-[calc(var(--radius)*0.9)] border border-border bg-muted text-muted-foreground",
			className,
		)}
		{...props}
	>
		{children ?? <ArtifactKindIcon kind={kind} />}
	</span>
);

// Paper is always light (DESIGN 5b rule 5): literal page colors, not themed tokens.
const PAPER_LINES = [92, 85, 78, 71, 64, 87, 80, 73];

export type ArtifactCardThumbnailProps = ComponentProps<"span"> & {
	/** `paper`: cropped top of page 1 (always light). `slide`: dark slide. */
	variant?: "paper" | "slide";
};

/** Cropped thumbnail (top of the first page): an inset tile the size of the icon tile, clipped to its radius. */
export const ArtifactCardThumbnail = ({
	variant = "paper",
	className,
	children,
	...props
}: ArtifactCardThumbnailProps) => (
	<span
		data-slot="ai-artifact-card-thumbnail"
		data-variant={variant}
		className={cn(
			"block h-14 w-[52px] shrink-0 overflow-hidden rounded-[calc(var(--radius)*0.9)] border border-border",
			className,
		)}
		{...props}
	>
		<span
			className={cn(
				"box-border block size-full overflow-hidden px-[6px] py-[7px]",
				variant === "paper" ? "bg-white" : "bg-[#14213d]",
			)}
		>
			{children ??
				(variant === "paper" ? (
					<>
						<span className="block h-0.5 w-[40%] rounded-[2px] bg-[#d9d8d2]" />
						<span className="mt-[3px] block h-1 w-[88%] rounded-[2px] bg-[#1f1f1d]" />
						<span className="mt-[3px] block h-1 w-[63%] rounded-[2px] bg-[#1f1f1d]" />
						{PAPER_LINES.map((w) => (
							<span
								key={w}
								className="mt-[3px] block h-0.5 rounded-[2px] bg-[#d9d8d2]"
								style={{ width: `${w}%` }}
							/>
						))}
					</>
				) : (
					<>
						<span className="block h-0.5 w-[40%] rounded-[2px] bg-[#e39a3c]" />
						<span className="mt-3 block h-1 w-[80%] rounded-[2px] bg-white" />
						<span className="mt-[3px] block h-1 w-[56%] rounded-[2px] bg-white" />
					</>
				))}
		</span>
	</span>
);

export type ArtifactCardBodyProps = ComponentProps<"div">;

export const ArtifactCardBody = ({
	className,
	...props
}: ArtifactCardBodyProps) => (
	<div
		data-slot="ai-artifact-card-body"
		className={cn("min-w-0 flex-1", className)}
		{...props}
	/>
);

export type ArtifactCardTitleProps = ComponentProps<"div">;

export const ArtifactCardTitle = ({
	className,
	children,
	...props
}: ArtifactCardTitleProps) => {
	const { state } = useContext(ArtifactCardContext);
	return (
		<div
			data-slot="ai-artifact-card-title"
			className={cn("truncate text-[14.5px] font-medium", className)}
			{...props}
		>
			{state === "generating" && typeof children === "string" ? (
				<Shimmer as="span">{children}</Shimmer>
			) : (
				children
			)}
		</div>
	);
};

export type ArtifactCardMetaProps = ComponentProps<"div">;

/** Meta line: kind and format (`Document · PDF`), or a status while generating. */
export const ArtifactCardMeta = ({
	className,
	...props
}: ArtifactCardMetaProps) => (
	<div
		data-slot="ai-artifact-card-meta"
		className={cn(
			"mt-[3px] font-mono text-[12.5px] text-muted-foreground",
			className,
		)}
		{...props}
	/>
);

export type ArtifactCardActionsProps = ComponentProps<typeof ButtonGroup> & {
	/** Label of the primary half of the split button. */
	label?: ReactNode;
	onDownload?: () => void;
	/** `DropdownMenuItem`s for the chevron half (copy link, open, ...). No chevron without them. */
	children?: ReactNode;
};

/** Split Download button; hidden while the card is generating. */
export const ArtifactCardActions = ({
	label = "Download",
	onDownload,
	children,
	className,
	...props
}: ArtifactCardActionsProps) => {
	const { state } = useContext(ArtifactCardContext);
	if (state === "generating") return null;
	return (
		<ButtonGroup
			data-slot="ai-artifact-card-actions"
			className={cn("shrink-0", className)}
			{...props}
		>
			<Button variant="secondary" size="sm" type="button" onClick={onDownload}>
				{label}
			</Button>
			{children && (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="secondary"
								size="icon-sm"
								type="button"
								aria-label="More download options"
							/>
						}
					>
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							className="size-3.5"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">{children}</DropdownMenuContent>
				</DropdownMenu>
			)}
		</ButtonGroup>
	);
};
