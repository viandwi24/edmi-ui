"use client";

import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	type ArtifactKind,
	ArtifactKindIcon,
} from "@/registry/edmi/components/ai/artifact-card";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import { Progress } from "@/registry/edmi/ui/progress";
import { Separator } from "@/registry/edmi/ui/separator";

export type SessionPanelProps = ComponentProps<typeof Card>;

/** Chat side panel: Progress, Outputs and what was used in this session. */
export const SessionPanel = ({ className, ...props }: SessionPanelProps) => (
	<Card
		data-slot="ai-session-panel"
		className={cn("w-full max-w-[380px] gap-0 px-4 py-3.5", className)}
		{...props}
	/>
);

export type SessionPanelDividerProps = ComponentProps<typeof Separator>;

export const SessionPanelDivider = ({
	className,
	...props
}: SessionPanelDividerProps) => (
	<Separator className={cn("my-3", className)} {...props} />
);

export type SessionProgressProps = ComponentProps<typeof Collapsible> & {
	title?: ReactNode;
	/** 0 to 100: shows a progress bar above the content. */
	value?: number;
	onClose?: () => void;
};

/** Collapsible "Progress" section with the panel close button. */
export const SessionProgress = ({
	title = "Progress",
	value,
	onClose,
	className,
	children,
	...props
}: SessionProgressProps) => (
	<Collapsible
		data-slot="ai-session-progress"
		className={cn("w-full", className)}
		{...props}
	>
		<div className="flex items-center justify-between">
			<CollapsibleTrigger className="group/trigger flex items-center gap-1 text-sm outline-none focus-visible:underline">
				{title}
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
					className="size-3.5 text-muted-foreground transition-transform group-data-[panel-open]/trigger:rotate-90"
				/>
			</CollapsibleTrigger>
			{onClose && (
				<Button
					aria-label="Close"
					onClick={onClose}
					size="icon-xs"
					type="button"
					variant="ghost"
				>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
						className="size-3.5"
					/>
				</Button>
			)}
		</div>
		<CollapsibleContent className="pt-3 text-[13px] text-muted-foreground">
			{value !== undefined && <Progress value={value} className="mb-3" />}
			{children}
		</CollapsibleContent>
	</Collapsible>
);

export type SessionSectionProps = Omit<ComponentProps<"section">, "title"> & {
	title: ReactNode;
};

export const SessionSection = ({
	title,
	className,
	children,
	...props
}: SessionSectionProps) => (
	<section
		data-slot="ai-session-section"
		className={cn("flex flex-col", className)}
		{...props}
	>
		<h3 className="mb-2.5 text-sm font-normal">{title}</h3>
		{children}
	</section>
);

export type SessionOutputPreviewProps = ComponentProps<"div">;

/** Large preview of the main output (render the document, slide or image inside). */
export const SessionOutputPreview = ({
	className,
	...props
}: SessionOutputPreviewProps) => (
	<div
		data-slot="ai-session-output-preview"
		className={cn(
			"h-[150px] overflow-hidden rounded-[var(--radius)] border border-border bg-muted",
			className,
		)}
		{...props}
	/>
);

export type SessionOutputTitleProps = ComponentProps<"div"> & {
	/** Small line under the title (`Artifact`). */
	meta?: ReactNode;
};

export const SessionOutputTitle = ({
	meta,
	className,
	children,
	...props
}: SessionOutputTitleProps) => (
	<div
		data-slot="ai-session-output-title"
		className={cn("mt-2", className)}
		{...props}
	>
		<div className="text-sm">{children}</div>
		{meta && (
			<div className="font-mono text-[12.5px] text-muted-foreground">
				{meta}
			</div>
		)}
	</div>
);

export type SessionFileProps = Omit<ComponentProps<"button">, "children"> & {
	name: ReactNode;
	/** Format badge on the right (`PDF`, `MD`). */
	format?: ReactNode;
	kind?: ArtifactKind;
};

export const SessionFile = ({
	name,
	format,
	kind = "document",
	className,
	...props
}: SessionFileProps) => (
	<button
		data-slot="ai-session-file"
		type="button"
		className={cn(
			"flex w-full items-center gap-2.5 rounded-md py-[7px] text-left text-sm outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
			className,
		)}
		{...props}
	>
		<span className="text-muted-foreground">
			<ArtifactKindIcon kind={kind} className="size-4" />
		</span>
		<span className="min-w-0 flex-1 truncate">{name}</span>
		{format && (
			<span className="font-mono text-[11.5px] text-muted-foreground">
				{format}
			</span>
		)}
	</button>
);

export type SessionSourceFavicon = {
	label: string;
	/** Favicon image; initials on `color` when omitted. */
	src?: string;
	/** Brand color of the initials tile (data, not themed). */
	color?: string;
};

export type SessionSourceProps = Omit<ComponentProps<"div">, "children"> & {
	icon: ReactNode;
	label: ReactNode;
	favicons?: SessionSourceFavicon[];
	/** Count after the favicons (`+4`). */
	more?: number;
	/** Detail line after the label (memory: `Read · Career, Tech`). */
	children?: ReactNode;
};

/** One row of "Used in this session": web search, memory, tools. */
export const SessionSource = ({
	icon,
	label,
	favicons,
	more,
	className,
	children,
	...props
}: SessionSourceProps) => (
	<div
		data-slot="ai-session-source"
		className={cn("flex items-center gap-2.5 py-[7px] text-sm", className)}
		{...props}
	>
		<span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
		<span className={cn(!children && "flex-1")}>{label}</span>
		{children && (
			<span className="min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground">
				{children}
			</span>
		)}
		{favicons && favicons.length > 0 && (
			<span className="flex items-center">
				{favicons.map((f) =>
					f.src ? (
						<img
							key={f.label}
							alt={f.label}
							src={f.src}
							className="-ml-[3px] size-4 rounded-[4px] border border-card object-cover"
						/>
					) : (
						<span
							key={f.label}
							className="-ml-[3px] inline-flex size-4 items-center justify-center rounded-[4px] border border-card bg-muted-foreground text-[8px] font-bold text-white"
							style={f.color ? { background: f.color } : undefined}
						>
							{f.label.slice(0, 2).toUpperCase()}
						</span>
					),
				)}
			</span>
		)}
		{more ? (
			<span className="text-[12.5px] text-muted-foreground">+{more}</span>
		) : null}
	</div>
);
