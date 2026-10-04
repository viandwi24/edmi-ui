"use client";

import { cn } from "cn";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import { Separator } from "@/registry/edmi/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";

export type CheckpointProps = HTMLAttributes<HTMLDivElement> & {
	/** ✦ Mono timestamp (or any label) after the line. */
	time?: ReactNode;
};

export const Checkpoint = ({
	className,
	children,
	time,
	...props
}: CheckpointProps) => (
	<div
		data-slot="ai-checkpoint"
		className={cn(
			"flex items-center gap-2.5 overflow-hidden text-muted-foreground",
			className,
		)}
		{...props}
	>
		{children}
		<Separator className="flex-1" />
		{time && (
			<span className="shrink-0 font-mono text-[11.5px] text-muted-foreground">
				{time}
			</span>
		)}
	</div>
);

export type CheckpointIconProps = ComponentProps<"span">;

export const CheckpointIcon = ({
	className,
	children,
	...props
}: CheckpointIconProps) => (
	<span
		data-slot="ai-checkpoint-icon"
		className={cn("inline-flex shrink-0 [&_svg]:size-4", className)}
		{...props}
	>
		{children ?? (
			<IconPlaceholder
				lucide="BookmarkIcon"
				tabler="IconBookmark"
				hugeicons="BookmarkIcon"
				phosphor="BookmarkIcon"
				remixicon="RiBookmarkLine"
			/>
		)}
	</span>
);

export type CheckpointTriggerProps = ComponentProps<typeof Button> & {
	tooltip?: string;
};

export const CheckpointTrigger = ({
	children,
	variant = "ghost",
	size = "xs",
	tooltip,
	...props
}: CheckpointTriggerProps) =>
	tooltip ? (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						data-slot="ai-checkpoint-trigger"
						size={size}
						type="button"
						variant={variant}
						{...props}
					/>
				}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent align="start" side="bottom">
				{tooltip}
			</TooltipContent>
		</Tooltip>
	) : (
		<Button
			data-slot="ai-checkpoint-trigger"
			size={size}
			type="button"
			variant={variant}
			{...props}
		>
			{children}
		</Button>
	);
