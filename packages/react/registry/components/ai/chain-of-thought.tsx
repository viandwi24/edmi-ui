"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { createContext, memo, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

interface ChainOfThoughtContextValue {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(
	null,
);

const useChainOfThought = () => {
	const context = useContext(ChainOfThoughtContext);
	if (!context) {
		throw new Error(
			"ChainOfThought components must be used within ChainOfThought",
		);
	}
	return context;
};

export type ChainOfThoughtProps = ComponentProps<"div"> & {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const ChainOfThought = memo(
	({
		className,
		open,
		defaultOpen = false,
		onOpenChange,
		children,
		...props
	}: ChainOfThoughtProps) => {
		const [isOpen, setIsOpen] = useControllableState({
			defaultProp: defaultOpen,
			onChange: onOpenChange,
			prop: open,
		});

		const chainOfThoughtContext = useMemo(
			() => ({ isOpen, setIsOpen }),
			[isOpen, setIsOpen],
		);

		return (
			<ChainOfThoughtContext.Provider value={chainOfThoughtContext}>
				<div
					data-slot="ai-chain-of-thought"
					className={cn("not-prose w-full space-y-3", className)}
					{...props}
				>
					{children}
				</div>
			</ChainOfThoughtContext.Provider>
		);
	},
);

export type ChainOfThoughtHeaderProps = ComponentProps<
	typeof CollapsibleTrigger
>;

export const ChainOfThoughtHeader = memo(
	({ className, children, ...props }: ChainOfThoughtHeaderProps) => {
		const { isOpen, setIsOpen } = useChainOfThought();

		return (
			<Collapsible onOpenChange={setIsOpen} open={isOpen}>
				<CollapsibleTrigger
					data-slot="ai-chain-of-thought-header"
					className={cn(
						"flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						className,
					)}
					{...props}
				>
					<IconPlaceholder
						lucide="BrainIcon"
						tabler="IconBrain"
						hugeicons="AiBrainIcon"
						phosphor="BrainIcon"
						remixicon="RiBrainLine"
						className="size-4"
					/>
					<span className="flex-1 text-left">
						{children ?? "Chain of thought"}
					</span>
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
						className={cn(
							"size-4 transition-transform",
							isOpen ? "rotate-180" : "rotate-0",
						)}
					/>
				</CollapsibleTrigger>
			</Collapsible>
		);
	},
);

export type ChainOfThoughtStepProps = Omit<ComponentProps<"div">, "title"> & {
	/** Any element (an `IconPlaceholder`, an svg). Defaults to a small dot. */
	icon?: ReactNode;
	label: ReactNode;
	description?: ReactNode;
	status?: "complete" | "active" | "pending";
};

// Icon colour and label colour per status (board AI 02): complete = muted icon, soft label; active = brand icon,
// foreground label; pending = faint.
const stepIconStyles = {
	active: "text-brand",
	complete: "text-muted-foreground",
	pending: "text-muted-foreground-2",
};

const stepLabelStyles = {
	active: "text-foreground",
	complete: "text-foreground-2",
	pending: "text-muted-foreground-2",
};

export const ChainOfThoughtStep = memo(
	({
		className,
		icon,
		label,
		description,
		status = "complete",
		children,
		...props
	}: ChainOfThoughtStepProps) => (
		<div
			data-slot="ai-chain-of-thought-step"
			data-status={status}
			className={cn(
				"group/step relative grid grid-cols-[22px_1fr] gap-2.5 pb-3.5 text-[13.5px] last:pb-0",
				className,
			)}
			{...props}
		>
			<span
				className={cn(
					"relative z-10 inline-flex size-[22px] items-center justify-center rounded-full bg-card [&_svg]:size-3.5",
					stepIconStyles[status],
				)}
			>
				{icon ?? <span className="size-1.5 rounded-full bg-current" />}
			</span>
			<span className="absolute top-6 -bottom-2 left-[10.5px] w-px bg-border group-last/step:hidden" />
			<div className="min-w-0 space-y-2">
				<div className={stepLabelStyles[status]}>{label}</div>
				{description && (
					<div className="-mt-1.5 text-xs text-muted-foreground">
						{description}
					</div>
				)}
				{children}
			</div>
		</div>
	),
);

export type ChainOfThoughtSearchResultsProps = ComponentProps<"div">;

export const ChainOfThoughtSearchResults = memo(
	({ className, ...props }: ChainOfThoughtSearchResultsProps) => (
		<div
			data-slot="ai-chain-of-thought-search-results"
			className={cn("flex flex-wrap items-center gap-1.5", className)}
			{...props}
		/>
	),
);

export type ChainOfThoughtSearchResultProps = ComponentProps<typeof Badge>;

export const ChainOfThoughtSearchResult = memo(
	({ className, children, ...props }: ChainOfThoughtSearchResultProps) => (
		<Badge
			data-slot="ai-chain-of-thought-search-result"
			className={cn(
				"h-5 gap-1 px-[7px] text-[11.5px] font-normal text-foreground-2",
				className,
			)}
			shape="pill"
			variant="secondary"
			{...props}
		>
			{children}
		</Badge>
	),
);

export type ChainOfThoughtContentProps = ComponentProps<
	typeof CollapsibleContent
>;

export const ChainOfThoughtContent = memo(
	({ className, children, ...props }: ChainOfThoughtContentProps) => {
		const { isOpen } = useChainOfThought();

		return (
			<Collapsible open={isOpen}>
				<CollapsibleContent
					data-slot="ai-chain-of-thought-content"
					className={cn(
						"h-(--collapsible-panel-height) overflow-hidden outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
						className,
					)}
					{...props}
				>
					<div className="pl-0.5">{children}</div>
				</CollapsibleContent>
			</Collapsible>
		);
	},
);

export type ChainOfThoughtImageProps = ComponentProps<"div"> & {
	caption?: string;
};

export const ChainOfThoughtImage = memo(
	({ className, children, caption, ...props }: ChainOfThoughtImageProps) => (
		<div
			data-slot="ai-chain-of-thought-image"
			className={cn("w-fit max-w-full space-y-1", className)}
			{...props}
		>
			<div className="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-[10px] border border-border bg-muted">
				{children}
			</div>
			{caption && <p className="text-xs text-muted-foreground">{caption}</p>}
		</div>
	),
);

ChainOfThought.displayName = "ChainOfThought";
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";
ChainOfThoughtImage.displayName = "ChainOfThoughtImage";
