"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps } from "react";
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
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";
import { Button } from "@/registry/edmi/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

// Regex patterns for parsing stack traces
const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/;
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/;
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/;
const AT_PREFIX_REGEX = /^at\s+/;

interface StackFrame {
	raw: string;
	functionName: string | null;
	filePath: string | null;
	lineNumber: number | null;
	columnNumber: number | null;
	isInternal: boolean;
}

interface ParsedStackTrace {
	errorType: string | null;
	errorMessage: string;
	frames: StackFrame[];
	raw: string;
}

interface StackTraceContextValue {
	trace: ParsedStackTrace;
	raw: string;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
}

const StackTraceContext = createContext<StackTraceContextValue | null>(null);

const useStackTrace = () => {
	const context = useContext(StackTraceContext);
	if (!context) {
		throw new Error("StackTrace components must be used within StackTrace");
	}
	return context;
};

const isInternalPath = (filePath: string) =>
	filePath.includes("node_modules") ||
	filePath.startsWith("node:") ||
	filePath.includes("internal/");

const parseStackFrame = (line: string): StackFrame => {
	const trimmed = line.trim();

	// Pattern: at functionName (filePath:line:column)
	const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX);
	if (withParensMatch) {
		const [, functionName, filePath, lineNum, colNum] = withParensMatch;
		return {
			columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
			filePath: filePath ?? null,
			functionName: functionName ?? null,
			isInternal: isInternalPath(filePath),
			lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
			raw: trimmed,
		};
	}

	// Pattern: at filePath:line:column (no function name)
	const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX);
	if (withoutFnMatch) {
		const [, filePath, lineNum, colNum] = withoutFnMatch;
		return {
			columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
			filePath: filePath ?? null,
			functionName: null,
			isInternal: isInternalPath(filePath ?? ""),
			lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
			raw: trimmed,
		};
	}

	// Fallback: unparseable line
	return {
		columnNumber: null,
		filePath: null,
		functionName: null,
		isInternal: trimmed.includes("node_modules") || trimmed.includes("node:"),
		lineNumber: null,
		raw: trimmed,
	};
};

const parseStackTrace = (trace: string): ParsedStackTrace => {
	const lines = trace.split("\n").filter((line) => line.trim());

	if (lines.length === 0) {
		return {
			errorMessage: trace,
			errorType: null,
			frames: [],
			raw: trace,
		};
	}

	const firstLine = lines[0].trim();
	let errorType: string | null = null;
	let errorMessage = firstLine;

	// Try to extract error type from "ErrorType: message" format
	const errorMatch = firstLine.match(ERROR_TYPE_REGEX);
	if (errorMatch) {
		const [, type, msg] = errorMatch;
		errorType = type;
		errorMessage = msg || "";
	}

	// Parse stack frames (lines starting with "at")
	const frames = lines
		.slice(1)
		.filter((line) => line.trim().startsWith("at "))
		.map(parseStackFrame);

	return {
		errorMessage,
		errorType,
		frames,
		raw: trace,
	};
};

export type StackTraceProps = Omit<
	ComponentProps<typeof Collapsible>,
	"open" | "defaultOpen" | "onOpenChange"
> & {
	trace: string;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
};

export const StackTrace = memo(
	({
		trace,
		className,
		open,
		defaultOpen = false,
		onOpenChange,
		onFilePathClick,
		children,
		...props
	}: StackTraceProps) => {
		const [isOpen, setIsOpen] = useControllableState({
			defaultProp: defaultOpen,
			onChange: onOpenChange,
			prop: open,
		});

		const parsedTrace = useMemo(() => parseStackTrace(trace), [trace]);

		const contextValue = useMemo(
			() => ({
				isOpen,
				onFilePathClick,
				raw: trace,
				setIsOpen,
				trace: parsedTrace,
			}),
			[parsedTrace, trace, isOpen, setIsOpen, onFilePathClick],
		);

		return (
			<StackTraceContext.Provider value={contextValue}>
				<Collapsible
					data-slot="ai-stack-trace"
					className={cn(
						"not-prose w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card font-mono text-sm",
						className,
					)}
					onOpenChange={setIsOpen}
					open={isOpen}
					{...props}
				>
					{children}
				</Collapsible>
			</StackTraceContext.Provider>
		);
	},
);

export type StackTraceHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const StackTraceHeader = memo(
	({ className, children, ...props }: StackTraceHeaderProps) => (
		<CollapsibleTrigger
			data-slot="ai-stack-trace-header"
			className={cn(
				"flex w-full cursor-pointer items-start gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
				className,
			)}
			nativeButton={false}
			render={<div />}
			{...props}
		>
			{children}
		</CollapsibleTrigger>
	),
);

export type StackTraceErrorProps = ComponentProps<"div">;

export const StackTraceError = memo(
	({ className, children, ...props }: StackTraceErrorProps) => (
		<div
			data-slot="ai-stack-trace-error"
			className={cn(
				"flex flex-1 items-start gap-2.5 overflow-hidden",
				className,
			)}
			{...props}
		>
			<svg
				aria-hidden="true"
				className="mt-px size-[15px] shrink-0 text-destructive-text"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
				viewBox="0 0 24 24"
			>
				<rect height="13" rx="5" width="10" x="7" y="7" />
				<path d="M12 7V4M7 12H3M21 12h-4M7 17l-3 2M17 17l3 2M7 9 4 6M17 9l3-3" />
			</svg>
			<div className="min-w-0 flex-1">{children}</div>
		</div>
	),
);

export type StackTraceErrorTypeProps = ComponentProps<"span">;

export const StackTraceErrorType = memo(
	({ className, children, ...props }: StackTraceErrorTypeProps) => {
		const { trace } = useStackTrace();

		return (
			<span
				className={cn(
					"block font-mono text-[12.5px] font-semibold text-destructive-text",
					className,
				)}
				{...props}
			>
				{children ?? trace.errorType}
			</span>
		);
	},
);

export type StackTraceErrorMessageProps = ComponentProps<"span">;

export const StackTraceErrorMessage = memo(
	({ className, children, ...props }: StackTraceErrorMessageProps) => {
		const { trace } = useStackTrace();

		return (
			<span
				className={cn(
					"mt-0.5 block font-sans text-[13px] break-words text-foreground",
					className,
				)}
				{...props}
			>
				{children ?? trace.errorMessage}
			</span>
		);
	},
);

export type StackTraceActionsProps = ComponentProps<"div">;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === "Enter" || e.key === " ") {
		e.stopPropagation();
	}
};

export const StackTraceActions = memo(
	({ className, children, ...props }: StackTraceActionsProps) => (
		// biome-ignore lint/a11y/useSemanticElements: stops the header toggle; a fieldset would change layout
		<div
			data-slot="ai-stack-trace-actions"
			className={cn("flex shrink-0 items-center gap-0.5", className)}
			onClick={handleActionsClick}
			onKeyDown={handleActionsKeyDown}
			role="group"
			{...props}
		>
			{children}
		</div>
	),
);

export type StackTraceCopyButtonProps = ComponentProps<typeof Button> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const StackTraceCopyButton = memo(
	({
		onCopy,
		onError,
		timeout = 2000,
		className,
		children,
		...props
	}: StackTraceCopyButtonProps) => {
		const [isCopied, setIsCopied] = useState(false);
		const timeoutRef = useRef<number>(0);
		const { raw } = useStackTrace();

		const copyToClipboard = useCallback(async () => {
			if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
				onError?.(new Error("Clipboard API not available"));
				return;
			}

			try {
				await navigator.clipboard.writeText(raw);
				setIsCopied(true);
				onCopy?.();
				timeoutRef.current = window.setTimeout(
					() => setIsCopied(false),
					timeout,
				);
			} catch (error) {
				onError?.(error as Error);
			}
		}, [raw, onCopy, onError, timeout]);

		useEffect(
			() => () => {
				window.clearTimeout(timeoutRef.current);
			},
			[],
		);

		return (
			<Button
				aria-label="Copy stack trace"
				className={className}
				onClick={copyToClipboard}
				size="icon-xs"
				variant="ghost"
				{...props}
			>
				{children ??
					(isCopied ? (
						<IconPlaceholder
							lucide="CheckIcon"
							tabler="IconCheck"
							hugeicons="Tick02Icon"
							phosphor="CheckIcon"
							remixicon="RiCheckLine"
							className="size-3.5"
						/>
					) : (
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
							className="size-3.5"
						/>
					))}
			</Button>
		);
	},
);

export type StackTraceExpandButtonProps = ComponentProps<"div">;

export const StackTraceExpandButton = memo(
	({ className, ...props }: StackTraceExpandButtonProps) => {
		const { isOpen } = useStackTrace();

		return (
			<div
				data-slot="ai-stack-trace-expand"
				className={cn("flex size-6 items-center justify-center", className)}
				{...props}
			>
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					className={cn(
						"size-3.5 text-muted-foreground transition-transform",
						isOpen ? "rotate-180" : "rotate-0",
					)}
				/>
			</div>
		);
	},
);

export type StackTraceContentProps = ComponentProps<
	typeof CollapsibleContent
> & {
	maxHeight?: number;
};

export const StackTraceContent = memo(
	({
		className,
		maxHeight = 400,
		children,
		style,
		...props
	}: StackTraceContentProps) => (
		<CollapsibleContent
			data-slot="ai-stack-trace-content"
			className={cn("overflow-auto border-t border-border", className)}
			style={{ maxHeight, ...style }}
			{...props}
		>
			{children}
		</CollapsibleContent>
	),
);

export type StackTraceFramesProps = ComponentProps<"div"> & {
	showInternalFrames?: boolean;
};

interface FilePathButtonProps {
	frame: StackFrame;
	onFilePathClick?: (
		filePath: string,
		lineNumber?: number,
		columnNumber?: number,
	) => void;
}

const FilePathButton = memo(
	({ frame, onFilePathClick }: FilePathButtonProps) => {
		const handleClick = useCallback(() => {
			if (frame.filePath) {
				onFilePathClick?.(
					frame.filePath,
					frame.lineNumber ?? undefined,
					frame.columnNumber ?? undefined,
				);
			}
		}, [frame, onFilePathClick]);

		return (
			<button
				className={cn(
					"text-muted-foreground",
					!frame.isInternal && "underline underline-offset-[3px]",
					onFilePathClick && "cursor-pointer hover:text-foreground",
				)}
				disabled={!onFilePathClick}
				onClick={handleClick}
				type="button"
			>
				{frame.filePath}
				{frame.lineNumber !== null && `:${frame.lineNumber}`}
				{frame.columnNumber !== null && `:${frame.columnNumber}`}
			</button>
		);
	},
);

FilePathButton.displayName = "FilePathButton";

export const StackTraceFrames = memo(
	({
		className,
		showInternalFrames = true,
		...props
	}: StackTraceFramesProps) => {
		const { trace, onFilePathClick } = useStackTrace();

		const framesToShow = showInternalFrames
			? trace.frames
			: trace.frames.filter((f) => !f.isInternal);

		return (
			<div
				data-slot="ai-stack-trace-frames"
				className={cn("px-3.5 py-3", className)}
				{...props}
			>
				{framesToShow.map((frame) => (
					<div
						className={cn(
							"flex items-center gap-2 text-xs leading-[1.9]",
							frame.isInternal && "opacity-50",
						)}
						key={frame.raw}
					>
						<span className="text-muted-foreground">at</span>
						{frame.functionName && (
							<span className="text-foreground">{frame.functionName}</span>
						)}
						{frame.filePath && (
							<FilePathButton frame={frame} onFilePathClick={onFilePathClick} />
						)}
						{!(frame.filePath || frame.functionName) && (
							<span>{frame.raw.replace(AT_PREFIX_REGEX, "")}</span>
						)}
					</div>
				))}
				{framesToShow.length === 0 && (
					<div className="text-xs text-muted-foreground">No stack frames</div>
				)}
			</div>
		);
	},
);

StackTrace.displayName = "StackTrace";
StackTraceHeader.displayName = "StackTraceHeader";
StackTraceError.displayName = "StackTraceError";
StackTraceErrorType.displayName = "StackTraceErrorType";
StackTraceErrorMessage.displayName = "StackTraceErrorMessage";
StackTraceActions.displayName = "StackTraceActions";
StackTraceCopyButton.displayName = "StackTraceCopyButton";
StackTraceExpandButton.displayName = "StackTraceExpandButton";
StackTraceContent.displayName = "StackTraceContent";
StackTraceFrames.displayName = "StackTraceFrames";
