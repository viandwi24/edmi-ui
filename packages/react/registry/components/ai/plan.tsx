"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Shimmer } from "@/registry/edmi/components/ai/shimmer";
import { Button } from "@/registry/edmi/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/edmi/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

interface PlanContextValue {
	isStreaming: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const usePlan = () => {
	const context = useContext(PlanContext);
	if (!context) {
		throw new Error("Plan components must be used within Plan");
	}
	return context;
};

export type PlanProps = Omit<ComponentProps<typeof Collapsible>, "render"> & {
	isStreaming?: boolean;
	/** ✦ one-step 3D look on the card. */
	raised?: boolean;
};

export const Plan = ({
	className,
	isStreaming = false,
	raised = false,
	children,
	...props
}: PlanProps) => {
	const contextValue = useMemo(() => ({ isStreaming }), [isStreaming]);

	return (
		<PlanContext.Provider value={contextValue}>
			<Collapsible
				data-slot="ai-plan"
				render={
					<Card
						className={cn("gap-0 py-0 [--card-spacing:16px]", className)}
						raised={raised}
					/>
				}
				{...props}
			>
				{children}
			</Collapsible>
		</PlanContext.Provider>
	);
};

export type PlanHeaderProps = ComponentProps<typeof CardHeader>;

export const PlanHeader = ({ className, ...props }: PlanHeaderProps) => (
	<CardHeader
		className={cn("flex items-start justify-between gap-2.5 py-3.5", className)}
		data-slot="ai-plan-header"
		{...props}
	/>
);

export type PlanTitleProps = Omit<
	ComponentProps<typeof CardTitle>,
	"children"
> & {
	children: string;
};

export const PlanTitle = ({
	className,
	children,
	...props
}: PlanTitleProps) => {
	const { isStreaming } = usePlan();

	return (
		<CardTitle
			className={cn("text-[15px]", className)}
			data-slot="ai-plan-title"
			{...props}
		>
			{isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
		</CardTitle>
	);
};

export type PlanDescriptionProps = Omit<
	ComponentProps<typeof CardDescription>,
	"children"
> & {
	children: string;
};

export const PlanDescription = ({
	className,
	children,
	...props
}: PlanDescriptionProps) => {
	const { isStreaming } = usePlan();

	return (
		<CardDescription
			className={cn("text-xs text-balance", className)}
			data-slot="ai-plan-description"
			{...props}
		>
			{isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
		</CardDescription>
	);
};

export type PlanActionProps = ComponentProps<typeof CardAction>;

export const PlanAction = (props: PlanActionProps) => (
	<CardAction data-slot="ai-plan-action" {...props} />
);

export type PlanContentProps = ComponentProps<typeof CardContent>;

export const PlanContent = ({ className, ...props }: PlanContentProps) => (
	<CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
		<CardContent
			className={cn(
				"pb-3.5 text-[13.5px] leading-[1.7] text-foreground-2",
				className,
			)}
			data-slot="ai-plan-content"
			{...props}
		/>
	</CollapsibleContent>
);

export type PlanFooterProps = ComponentProps<typeof CardFooter>;

export const PlanFooter = ({ className, ...props }: PlanFooterProps) => (
	<CardFooter
		className={cn("px-4 py-2.5", className)}
		data-slot="ai-plan-footer"
		{...props}
	/>
);

export type PlanTriggerProps = ComponentProps<typeof CollapsibleTrigger>;

export const PlanTrigger = ({ className, ...props }: PlanTriggerProps) => (
	<CollapsibleTrigger
		data-slot="ai-plan-trigger"
		render={
			<Button
				className={cn("size-8", className)}
				size="icon-sm"
				variant="ghost"
			/>
		}
		{...props}
	>
		<IconPlaceholder
			lucide="ChevronsUpDownIcon"
			tabler="IconSelector"
			hugeicons="UnfoldMoreIcon"
			phosphor="CaretUpDownIcon"
			remixicon="RiArrowUpDownLine"
			className="size-4"
		/>
		<span className="sr-only">Toggle plan</span>
	</CollapsibleTrigger>
);
