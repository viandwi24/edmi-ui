"use client";

import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import { mermaid } from "@streamdown/mermaid";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Streamdown } from "streamdown";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Shimmer } from "@/registry/edmi/components/ai/shimmer";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

interface ReasoningContextValue {
	isStreaming: boolean;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	duration: number | undefined;
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

export const useReasoning = () => {
	const context = useContext(ReasoningContext);
	if (!context) {
		throw new Error("Reasoning components must be used within Reasoning");
	}
	return context;
};

export type ReasoningProps = Omit<
	ComponentProps<typeof Collapsible>,
	"open" | "defaultOpen" | "onOpenChange"
> & {
	isStreaming?: boolean;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	duration?: number;
};

const AUTO_CLOSE_DELAY = 1000;
const MS_IN_S = 1000;

export const Reasoning = memo(
	({
		className,
		isStreaming = false,
		open,
		defaultOpen,
		onOpenChange,
		duration: durationProp,
		children,
		...props
	}: ReasoningProps) => {
		const resolvedDefaultOpen = defaultOpen ?? isStreaming;
		// Track if defaultOpen was explicitly set to false (to prevent auto-open)
		const isExplicitlyClosed = defaultOpen === false;

		const [isOpen, setIsOpen] = useControllableState<boolean>({
			defaultProp: resolvedDefaultOpen,
			onChange: onOpenChange,
			prop: open,
		});
		const [duration, setDuration] = useControllableState<number | undefined>({
			defaultProp: undefined,
			prop: durationProp,
		});

		const hasEverStreamedRef = useRef(isStreaming);
		const [hasAutoClosed, setHasAutoClosed] = useState(false);
		const startTimeRef = useRef<number | null>(null);

		// Track when streaming starts and compute duration
		useEffect(() => {
			if (isStreaming) {
				hasEverStreamedRef.current = true;
				if (startTimeRef.current === null) {
					startTimeRef.current = Date.now();
				}
			} else if (startTimeRef.current !== null) {
				setDuration(Math.ceil((Date.now() - startTimeRef.current) / MS_IN_S));
				startTimeRef.current = null;
			}
		}, [isStreaming, setDuration]);

		// Auto-open when streaming starts (unless explicitly closed)
		useEffect(() => {
			if (isStreaming && !isOpen && !isExplicitlyClosed) {
				setIsOpen(true);
			}
		}, [isStreaming, isOpen, setIsOpen, isExplicitlyClosed]);

		// Auto-close when streaming ends (once only, and only if it ever streamed)
		useEffect(() => {
			if (
				hasEverStreamedRef.current &&
				!isStreaming &&
				isOpen &&
				!hasAutoClosed
			) {
				const timer = setTimeout(() => {
					setIsOpen(false);
					setHasAutoClosed(true);
				}, AUTO_CLOSE_DELAY);

				return () => clearTimeout(timer);
			}
		}, [isStreaming, isOpen, setIsOpen, hasAutoClosed]);

		const handleOpenChange = useCallback(
			(newOpen: boolean) => {
				setIsOpen(newOpen);
			},
			[setIsOpen],
		);

		const contextValue = useMemo(
			() => ({ duration, isOpen, isStreaming, setIsOpen }),
			[duration, isOpen, isStreaming, setIsOpen],
		);

		return (
			<ReasoningContext.Provider value={contextValue}>
				<Collapsible
					data-slot="ai-reasoning"
					className={cn("not-prose", className)}
					onOpenChange={handleOpenChange}
					open={isOpen}
					{...props}
				>
					{children}
				</Collapsible>
			</ReasoningContext.Provider>
		);
	},
);

export type ReasoningTriggerProps = ComponentProps<
	typeof CollapsibleTrigger
> & {
	getThinkingMessage?: (isStreaming: boolean, duration?: number) => ReactNode;
};

const defaultGetThinkingMessage = (isStreaming: boolean, duration?: number) => {
	if (isStreaming || duration === 0) {
		return (
			<Shimmer as="span" duration={1}>
				Thinking…
			</Shimmer>
		);
	}
	if (duration === undefined) {
		return <span>Thought for a few seconds</span>;
	}
	return <span>Thought for {duration} seconds</span>;
};

export const ReasoningTrigger = memo(
	({
		className,
		children,
		getThinkingMessage = defaultGetThinkingMessage,
		...props
	}: ReasoningTriggerProps) => {
		const { isStreaming, isOpen, duration } = useReasoning();

		return (
			<CollapsibleTrigger
				data-slot="ai-reasoning-trigger"
				className={cn(
					"flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
					className,
				)}
				{...props}
			>
				{children ?? (
					<>
						<IconPlaceholder
							lucide="BrainIcon"
							tabler="IconBrain"
							hugeicons="AiBrainIcon"
							phosphor="BrainIcon"
							remixicon="RiBrainLine"
							className="size-4"
						/>
						{getThinkingMessage(isStreaming, duration)}
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							className={cn(
								"ml-auto size-4 transition-transform",
								isOpen ? "rotate-180" : "rotate-0",
							)}
						/>
					</>
				)}
			</CollapsibleTrigger>
		);
	},
);

export type ReasoningContentProps = Omit<
	ComponentProps<typeof CollapsibleContent>,
	"children"
> & {
	children: string;
};

const streamdownPlugins = { cjk, code, math, mermaid };

export const ReasoningContent = memo(
	({ className, children, ...props }: ReasoningContentProps) => (
		<CollapsibleContent
			data-slot="ai-reasoning-content"
			className={cn(
				"h-(--collapsible-panel-height) overflow-hidden outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
				className,
			)}
			{...props}
		>
			<div className="mt-2.5 ml-[7px] border-l-2 border-border pl-[23px] text-[13.5px] leading-[1.6] text-muted-foreground">
				<Streamdown
					className="[&_p]:my-0 [&_p+*]:mt-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
					plugins={streamdownPlugins}
				>
					{children}
				</Streamdown>
			</div>
		</CollapsibleContent>
	),
);

Reasoning.displayName = "Reasoning";
ReasoningTrigger.displayName = "ReasoningTrigger";
ReasoningContent.displayName = "ReasoningContent";
