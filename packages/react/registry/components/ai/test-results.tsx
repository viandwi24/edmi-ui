"use client";

import { cn } from "cn";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

type TestStatus = "passed" | "failed" | "skipped" | "running";

interface TestResultsSummary {
	passed: number;
	failed: number;
	skipped: number;
	total: number;
	duration?: number;
}

interface TestResultsContextType {
	summary?: TestResultsSummary;
}

const TestResultsContext = createContext<TestResultsContextType>({});

const formatDuration = (ms: number) => {
	if (ms < 1000) {
		return `${ms}ms`;
	}
	return `${(ms / 1000).toFixed(2)} s`;
};

const statusStyles: Record<TestStatus, string> = {
	failed: "text-destructive-text",
	passed: "text-success-text",
	running: "text-info-text",
	skipped: "text-warning-text",
};

const statusBadgeVariants: Record<
	TestStatus,
	ComponentProps<typeof Badge>["variant"]
> = {
	failed: "destructive",
	passed: "success",
	running: "info",
	skipped: "warning",
};

const statusIcons: Record<TestStatus, ReactNode> = {
	failed: (
		<svg
			aria-hidden="true"
			className="size-3.5"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.7"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="9" />
			<path d="m9 9 6 6M15 9l-6 6" />
		</svg>
	),
	passed: (
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
			className="size-3.5"
		/>
	),
	running: (
		<svg
			aria-hidden="true"
			className="size-3.5 animate-spin"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				cx="12"
				cy="12"
				r="9"
				stroke="currentColor"
				strokeOpacity=".22"
				strokeWidth="2"
			/>
			<path
				d="M21 12a9 9 0 0 0-9-9"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="2"
			/>
		</svg>
	),
	skipped: (
		<svg
			aria-hidden="true"
			className="size-3.5"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.7"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="8" />
		</svg>
	),
};

export type TestResultsHeaderProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsHeader = ({
	className,
	children,
	...props
}: TestResultsHeaderProps) => (
	<div
		data-slot="ai-test-results-header"
		className={cn(
			"flex items-center justify-between gap-2.5 px-4 py-3.5",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type TestResultsDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestResultsDuration = ({
	className,
	children,
	...props
}: TestResultsDurationProps) => {
	const { summary } = useContext(TestResultsContext);

	if (!summary?.duration) {
		return null;
	}

	return (
		<span
			className={cn("font-mono text-xs text-muted-foreground", className)}
			{...props}
		>
			{children ?? formatDuration(summary.duration)}
		</span>
	);
};

export type TestResultsSummaryProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsSummary = ({
	className,
	children,
	...props
}: TestResultsSummaryProps) => {
	const { summary } = useContext(TestResultsContext);

	if (!summary) {
		return null;
	}

	return (
		<div className={cn("flex items-center gap-2.5", className)} {...props}>
			{children ?? (
				<>
					<span className="font-semibold">Tests</span>
					<Badge className="h-5" variant="success">
						{summary.passed} passed
					</Badge>
					{summary.failed > 0 && (
						<Badge className="h-5" variant="destructive">
							{summary.failed} failed
						</Badge>
					)}
					{summary.skipped > 0 && (
						<Badge className="h-5" variant="warning">
							{summary.skipped} skipped
						</Badge>
					)}
				</>
			)}
		</div>
	);
};

export type TestResultsProps = HTMLAttributes<HTMLDivElement> & {
	summary?: TestResultsSummary;
};

export const TestResults = ({
	summary,
	className,
	children,
	...props
}: TestResultsProps) => {
	const contextValue = useMemo(() => ({ summary }), [summary]);

	return (
		<TestResultsContext.Provider value={contextValue}>
			<div
				data-slot="ai-test-results"
				className={cn(
					"overflow-hidden rounded-xl border border-border bg-card",
					className,
				)}
				{...props}
			>
				{children ??
					(summary && (
						<>
							<TestResultsHeader>
								<TestResultsSummary />
								<TestResultsDuration />
							</TestResultsHeader>
							<TestResultsProgress />
						</>
					))}
			</div>
		</TestResultsContext.Provider>
	);
};

export type TestResultsProgressProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsProgress = ({
	className,
	children,
	...props
}: TestResultsProgressProps) => {
	const { summary } = useContext(TestResultsContext);

	if (!summary) {
		return null;
	}

	const running = Math.max(
		summary.total - summary.passed - summary.failed - summary.skipped,
		0,
	);

	return (
		<div
			data-slot="ai-test-results-progress"
			className={cn("-mt-0.5 px-4 pb-3.5", className)}
			{...props}
		>
			{children ?? (
				<div
					aria-label={`${summary.passed} of ${summary.total} tests passed`}
					className="flex h-1.5 gap-0.5"
					role="img"
				>
					{summary.passed > 0 && (
						<span
							className="rounded-[3px] bg-success"
							style={{ flex: summary.passed }}
						/>
					)}
					{summary.failed > 0 && (
						<span
							className="rounded-[3px] bg-destructive"
							style={{ flex: summary.failed }}
						/>
					)}
					{summary.skipped > 0 && (
						<span
							className="rounded-[3px] bg-warning"
							style={{ flex: summary.skipped }}
						/>
					)}
					{running > 0 && (
						<span
							className="rounded-[3px] bg-muted"
							style={{ flex: running }}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export type TestResultsContentProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsContent = ({
	className,
	children,
	...props
}: TestResultsContentProps) => (
	<div
		data-slot="ai-test-results-content"
		className={cn(
			"space-y-1 border-t border-border-2 px-4 pt-1.5 pb-3",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

interface TestSuiteContextType {
	name: string;
	status: TestStatus;
}

const TestSuiteContext = createContext<TestSuiteContextType>({
	name: "",
	status: "passed",
});

export type TestSuiteProps = ComponentProps<typeof Collapsible> & {
	name: string;
	status: TestStatus;
};

export const TestSuite = ({
	name,
	status,
	className,
	children,
	...props
}: TestSuiteProps) => {
	const contextValue = useMemo(() => ({ name, status }), [name, status]);

	return (
		<TestSuiteContext.Provider value={contextValue}>
			<Collapsible data-slot="ai-test-suite" className={className} {...props}>
				{children}
			</Collapsible>
		</TestSuiteContext.Provider>
	);
};

export type TestSuiteNameProps = ComponentProps<typeof CollapsibleTrigger>;

export const TestSuiteName = ({
	className,
	children,
	...props
}: TestSuiteNameProps) => {
	const { name, status } = useContext(TestSuiteContext);

	return (
		<CollapsibleTrigger
			data-slot="ai-test-suite-name"
			className={cn(
				"group/ai-test-suite flex w-full items-center gap-2 py-1.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				className,
			)}
			{...props}
		>
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[panel-open]/ai-test-suite:rotate-180"
			/>
			<span className="font-mono text-[12.5px]">{children ?? name}</span>
			<Badge
				className="h-[18px] text-[10.5px]"
				variant={statusBadgeVariants[status]}
			>
				{status}
			</Badge>
		</CollapsibleTrigger>
	);
};

export type TestSuiteStatsProps = HTMLAttributes<HTMLDivElement> & {
	passed?: number;
	failed?: number;
	skipped?: number;
};

export const TestSuiteStats = ({
	passed = 0,
	failed = 0,
	skipped = 0,
	className,
	children,
	...props
}: TestSuiteStatsProps) => (
	<div
		className={cn("ml-auto flex items-center gap-2 text-xs", className)}
		{...props}
	>
		{children ?? (
			<>
				{passed > 0 && (
					<span className="text-success-text">{passed} passed</span>
				)}
				{failed > 0 && (
					<span className="text-destructive-text">{failed} failed</span>
				)}
				{skipped > 0 && (
					<span className="text-warning-text">{skipped} skipped</span>
				)}
			</>
		)}
	</div>
);

export type TestSuiteContentProps = ComponentProps<typeof CollapsibleContent>;

export const TestSuiteContent = ({
	className,
	children,
	...props
}: TestSuiteContentProps) => (
	<CollapsibleContent
		data-slot="ai-test-suite-content"
		className={className}
		{...props}
	>
		<div>{children}</div>
	</CollapsibleContent>
);

interface TestContextType {
	name: string;
	status: TestStatus;
	duration?: number;
}

const TestContext = createContext<TestContextType>({
	name: "",
	status: "passed",
});

export type TestNameProps = HTMLAttributes<HTMLSpanElement>;

export const TestName = ({ className, children, ...props }: TestNameProps) => {
	const { name } = useContext(TestContext);

	return (
		<span className={cn("flex-1", className)} {...props}>
			{children ?? name}
		</span>
	);
};

export type TestDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestDuration = ({
	className,
	children,
	...props
}: TestDurationProps) => {
	const { duration } = useContext(TestContext);

	if (duration === undefined) {
		return null;
	}

	return (
		<span
			className={cn(
				"ml-auto font-mono text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children ?? `${duration}ms`}
		</span>
	);
};

export type TestStatusProps = HTMLAttributes<HTMLSpanElement>;

export const TestStatus = ({
	className,
	children,
	...props
}: TestStatusProps) => {
	const { status } = useContext(TestContext);

	return (
		<span
			className={cn("inline-flex shrink-0", statusStyles[status], className)}
			{...props}
		>
			{children ?? statusIcons[status]}
		</span>
	);
};

export type TestProps = HTMLAttributes<HTMLDivElement> & {
	name: string;
	status: TestStatus;
	duration?: number;
};

export const Test = ({
	name,
	status,
	duration,
	className,
	children,
	...props
}: TestProps) => {
	const contextValue = useMemo(
		() => ({ duration, name, status }),
		[duration, name, status],
	);

	return (
		<TestContext.Provider value={contextValue}>
			<div
				data-slot="ai-test"
				data-status={status}
				className={cn(
					"flex flex-wrap items-center gap-x-2 py-[5px] text-[12.5px]",
					className,
				)}
				{...props}
			>
				{children ?? (
					<>
						<TestStatus />
						<TestName />
						{duration !== undefined && <TestDuration />}
					</>
				)}
			</div>
		</TestContext.Provider>
	);
};

export type TestErrorProps = HTMLAttributes<HTMLDivElement>;

export const TestError = ({
	className,
	children,
	...props
}: TestErrorProps) => (
	<div
		data-slot="ai-test-error"
		className={cn(
			"mt-1 mb-1.5 ml-[22px] basis-full rounded-md bg-destructive-soft px-3 py-2.5 font-mono text-xs leading-[1.6] text-destructive-text",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type TestErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

export const TestErrorMessage = ({
	className,
	children,
	...props
}: TestErrorMessageProps) => (
	<p className={cn("m-0", className)} {...props}>
		{children}
	</p>
);

export type TestErrorStackProps = HTMLAttributes<HTMLPreElement>;

export const TestErrorStack = ({
	className,
	children,
	...props
}: TestErrorStackProps) => (
	<pre
		className={cn("mt-2 overflow-auto font-mono text-xs", className)}
		{...props}
	>
		{children}
	</pre>
);
