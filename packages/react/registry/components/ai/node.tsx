import { Handle, Position } from "@xyflow/react";
import { cn } from "cn";
import type { ComponentProps } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/edmi/ui/card";

const handleClass =
	"!size-2.5 !min-h-0 !min-w-0 !rounded-full !border-2 !border-muted-foreground !bg-card";

export type NodeProps = ComponentProps<typeof Card> & {
	handles: {
		target: boolean;
		source: boolean;
	};
	/** Ring state. Inside xyflow the `selected` class on the node wrapper does the same. */
	selected?: boolean;
};

/** Workflow step built on Card: target handle on the left, source handle on the right. Flat by default, `raised` ✦ for the one-step 3D card. */
export const Node = ({
	handles,
	selected,
	className,
	children,
	...props
}: NodeProps) => (
	<Card
		data-slot="ai-node"
		data-selected={selected ? "" : undefined}
		className={cn(
			"relative size-full h-auto w-60 gap-0 overflow-visible rounded-[calc(var(--radius)*1.2)] py-0",
			"data-[selected]:border-ring data-[selected]:shadow-ring [.selected_&]:border-ring [.selected_&]:shadow-ring",
			className,
		)}
		{...props}
	>
		{handles.target && (
			<Handle className={handleClass} position={Position.Left} type="target" />
		)}
		{handles.source && (
			<Handle className={handleClass} position={Position.Right} type="source" />
		)}
		{children}
	</Card>
);

export type NodeHeaderProps = ComponentProps<typeof CardHeader>;

export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
	<CardHeader
		data-slot="ai-node-header"
		className={cn(
			"gap-0.5 rounded-t-[inherit] border-b border-border-2 px-3 py-2.5 [.border-b]:pb-2.5",
			className,
		)}
		{...props}
	/>
);

export type NodeTitleProps = ComponentProps<typeof CardTitle>;

export const NodeTitle = ({ className, ...props }: NodeTitleProps) => (
	<CardTitle
		data-slot="ai-node-title"
		className={cn("text-[13.5px] font-semibold", className)}
		{...props}
	/>
);

export type NodeDescriptionProps = ComponentProps<typeof CardDescription>;

export const NodeDescription = ({
	className,
	...props
}: NodeDescriptionProps) => (
	<CardDescription
		data-slot="ai-node-description"
		className={cn("text-xs", className)}
		{...props}
	/>
);

export type NodeActionProps = ComponentProps<typeof CardAction>;

export const NodeAction = (props: NodeActionProps) => (
	<CardAction data-slot="ai-node-action" {...props} />
);

export type NodeContentProps = ComponentProps<typeof CardContent>;

export const NodeContent = ({ className, ...props }: NodeContentProps) => (
	<CardContent
		data-slot="ai-node-content"
		className={cn("px-3 py-2.5 text-[12.5px]", className)}
		{...props}
	/>
);

export type NodeFooterProps = ComponentProps<typeof CardFooter>;

export const NodeFooter = ({ className, ...props }: NodeFooterProps) => (
	<CardFooter
		data-slot="ai-node-footer"
		className={cn(
			"rounded-b-[inherit] border-t border-border-2 bg-transparent px-3 py-2 text-[11.5px] text-muted-foreground",
			className,
		)}
		{...props}
	/>
);
