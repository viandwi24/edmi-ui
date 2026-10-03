"use client";

import type { LanguageModelUsage } from "ai";
// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";
import { getUsage } from "tokenlens";
import { Button } from "@/registry/edmi/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/edmi/ui/hover-card";
import { Progress } from "@/registry/edmi/ui/progress";

const PERCENT_MAX = 100;
const ICON_RADIUS = 10;
const ICON_VIEWBOX = 24;
const ICON_CENTER = 12;
const ICON_STROKE_WIDTH = 2;

type ModelId = string;

interface ContextSchema {
	usedTokens: number;
	maxTokens: number;
	usage?: LanguageModelUsage;
	modelId?: ModelId;
}

const ContextContext = createContext<ContextSchema | null>(null);

const useContextValue = () => {
	const context = useContext(ContextContext);

	if (!context) {
		throw new Error("Context components must be used within Context");
	}

	return context;
};

export type ContextProps = ComponentProps<typeof HoverCard> & ContextSchema;

export const Context = ({
	usedTokens,
	maxTokens,
	usage,
	modelId,
	...props
}: ContextProps) => {
	const contextValue = useMemo(
		() => ({ maxTokens, modelId, usage, usedTokens }),
		[maxTokens, modelId, usage, usedTokens],
	);

	return (
		<ContextContext.Provider value={contextValue}>
			<HoverCard {...props} />
		</ContextContext.Provider>
	);
};

const ContextIcon = () => {
	const { usedTokens, maxTokens } = useContextValue();
	const circumference = 2 * Math.PI * ICON_RADIUS;
	const usedPercent = Math.min(usedTokens / maxTokens, 1);
	const dashOffset = circumference * (1 - usedPercent);

	return (
		<svg
			aria-label="Model context usage"
			height="22"
			role="img"
			viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`}
			width="22"
		>
			<title>Model context usage</title>
			<circle
				cx={ICON_CENTER}
				cy={ICON_CENTER}
				fill="none"
				r={ICON_RADIUS}
				className="stroke-border"
				strokeWidth={ICON_STROKE_WIDTH}
			/>
			<circle
				cx={ICON_CENTER}
				cy={ICON_CENTER}
				fill="none"
				r={ICON_RADIUS}
				className="stroke-brand"
				strokeDasharray={`${circumference} ${circumference}`}
				strokeDashoffset={dashOffset}
				strokeLinecap="round"
				strokeWidth={ICON_STROKE_WIDTH}
				style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
			/>
		</svg>
	);
};

export type ContextTriggerProps = ComponentProps<typeof Button>;

export const ContextTrigger = ({ children, ...props }: ContextTriggerProps) => {
	const { usedTokens, maxTokens } = useContextValue();
	const usedPercent = usedTokens / maxTokens;
	const renderedPercent = new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 1,
		style: "percent",
	}).format(usedPercent);

	return (
		<HoverCardTrigger
			delay={0}
			closeDelay={0}
			render={
				children ? (
					(children as React.ReactElement<Record<string, unknown>>)
				) : (
					<Button type="button" variant="ghost" {...props} />
				)
			}
		>
			{children ? undefined : (
				<>
					<ContextIcon />
					<span
						className={cn(
							"font-mono text-xs font-medium",
							usedPercent >= 0.9 ? "text-warning-text" : "text-foreground",
						)}
					>
						{renderedPercent}
					</span>
				</>
			)}
		</HoverCardTrigger>
	);
};

export type ContextContentProps = ComponentProps<typeof HoverCardContent>;

export const ContextContent = ({
	className,
	...props
}: ContextContentProps) => (
	<HoverCardContent
		className={cn(
			"min-w-60 divide-y divide-border overflow-hidden p-0",
			className,
		)}
		{...props}
	/>
);

export type ContextContentHeaderProps = ComponentProps<"div">;

export const ContextContentHeader = ({
	children,
	className,
	...props
}: ContextContentHeaderProps) => {
	const { usedTokens, maxTokens } = useContextValue();
	const usedPercent = usedTokens / maxTokens;
	const displayPct = new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 1,
		style: "percent",
	}).format(usedPercent);
	const used = new Intl.NumberFormat("en-US", {
		notation: "compact",
	}).format(usedTokens);
	const total = new Intl.NumberFormat("en-US", {
		notation: "compact",
	}).format(maxTokens);

	return (
		<div className={cn("w-full space-y-2 p-3", className)} {...props}>
			{children ?? (
				<>
					<div className="flex items-center justify-between gap-3 text-xs">
						<p className="font-semibold">{displayPct}</p>
						<p className="font-mono text-muted-foreground">
							{used} / {total}
						</p>
					</div>
					<div className="space-y-2">
						<Progress variant="brand" value={usedPercent * PERCENT_MAX} />
					</div>
				</>
			)}
		</div>
	);
};

export type ContextContentBodyProps = ComponentProps<"div">;

export const ContextContentBody = ({
	children,
	className,
	...props
}: ContextContentBodyProps) => (
	<div className={cn("w-full space-y-1.5 p-3", className)} {...props}>
		{children}
	</div>
);

export type ContextContentFooterProps = ComponentProps<"div">;

export const ContextContentFooter = ({
	children,
	className,
	...props
}: ContextContentFooterProps) => {
	const { modelId, usage } = useContextValue();
	const costUSD = modelId
		? getUsage({
				modelId,
				usage: {
					input: usage?.inputTokens ?? 0,
					output: usage?.outputTokens ?? 0,
				},
			}).costUSD?.totalUSD
		: undefined;
	const totalCost = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	}).format(costUSD ?? 0);

	return (
		<div
			className={cn(
				"flex w-full items-center justify-between gap-3 bg-muted p-3 text-xs",
				className,
			)}
			{...props}
		>
			{children ?? (
				<>
					<span className="text-muted-foreground">Total cost</span>
					<span className="font-mono font-semibold">{totalCost}</span>
				</>
			)}
		</div>
	);
};

const TokensWithCost = ({
	tokens,
	costText,
}: {
	tokens?: number;
	costText?: string;
}) => (
	<span className="font-mono">
		{tokens === undefined
			? "—"
			: new Intl.NumberFormat("en-US", {
					notation: "compact",
				}).format(tokens)}
		{costText ? (
			<span className="ml-2 text-muted-foreground">• {costText}</span>
		) : null}
	</span>
);

export type ContextInputUsageProps = ComponentProps<"div">;

export const ContextInputUsage = ({
	className,
	children,
	...props
}: ContextInputUsageProps) => {
	const { usage, modelId } = useContextValue();
	const inputTokens = usage?.inputTokens ?? 0;

	if (children) {
		return children;
	}

	if (!inputTokens) {
		return null;
	}

	const inputCost = modelId
		? getUsage({
				modelId,
				usage: { input: inputTokens, output: 0 },
			}).costUSD?.totalUSD
		: undefined;
	const inputCostText = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	}).format(inputCost ?? 0);

	return (
		<div
			className={cn("flex items-center justify-between text-xs", className)}
			{...props}
		>
			<span className="text-muted-foreground">Input</span>
			<TokensWithCost costText={inputCostText} tokens={inputTokens} />
		</div>
	);
};

export type ContextOutputUsageProps = ComponentProps<"div">;

export const ContextOutputUsage = ({
	className,
	children,
	...props
}: ContextOutputUsageProps) => {
	const { usage, modelId } = useContextValue();
	const outputTokens = usage?.outputTokens ?? 0;

	if (children) {
		return children;
	}

	if (!outputTokens) {
		return null;
	}

	const outputCost = modelId
		? getUsage({
				modelId,
				usage: { input: 0, output: outputTokens },
			}).costUSD?.totalUSD
		: undefined;
	const outputCostText = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	}).format(outputCost ?? 0);

	return (
		<div
			className={cn("flex items-center justify-between text-xs", className)}
			{...props}
		>
			<span className="text-muted-foreground">Output</span>
			<TokensWithCost costText={outputCostText} tokens={outputTokens} />
		</div>
	);
};

export type ContextReasoningUsageProps = ComponentProps<"div">;

export const ContextReasoningUsage = ({
	className,
	children,
	...props
}: ContextReasoningUsageProps) => {
	const { usage, modelId } = useContextValue();
	const reasoningTokens = usage?.outputTokenDetails?.reasoningTokens ?? 0;

	if (children) {
		return children;
	}

	if (!reasoningTokens) {
		return null;
	}

	const reasoningCost = modelId
		? getUsage({
				modelId,
				usage: { reasoningTokens },
			}).costUSD?.totalUSD
		: undefined;
	const reasoningCostText = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	}).format(reasoningCost ?? 0);

	return (
		<div
			className={cn("flex items-center justify-between text-xs", className)}
			{...props}
		>
			<span className="text-muted-foreground">Reasoning</span>
			<TokensWithCost costText={reasoningCostText} tokens={reasoningTokens} />
		</div>
	);
};

export type ContextCacheUsageProps = ComponentProps<"div">;

export const ContextCacheUsage = ({
	className,
	children,
	...props
}: ContextCacheUsageProps) => {
	const { usage, modelId } = useContextValue();
	const cacheTokens = usage?.inputTokenDetails?.cacheReadTokens ?? 0;

	if (children) {
		return children;
	}

	if (!cacheTokens) {
		return null;
	}

	const cacheCost = modelId
		? getUsage({
				modelId,
				usage: { cacheReads: cacheTokens, input: 0, output: 0 },
			}).costUSD?.totalUSD
		: undefined;
	const cacheCostText = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	}).format(cacheCost ?? 0);

	return (
		<div
			className={cn("flex items-center justify-between text-xs", className)}
			{...props}
		>
			<span className="text-muted-foreground">Cache</span>
			<TokensWithCost costText={cacheCostText} tokens={cacheTokens} />
		</div>
	);
};
