"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import AnsiModule from "ansi-to-react";
import { cn } from "cn";
import type { ComponentProps, HTMLAttributes } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";

// ansi-to-react is CommonJS (`exports.default`): some bundlers hand back the module object, not the component.
const Ansi =
	(AnsiModule as unknown as { default?: typeof AnsiModule }).default ??
	AnsiModule;

interface TerminalContextType {
	output: string;
	isStreaming: boolean;
	autoScroll: boolean;
	onClear?: () => void;
}

const TerminalContext = createContext<TerminalContextType>({
	autoScroll: true,
	isStreaming: false,
	output: "",
});

// The terminal is always dark, in every theme and mode (DESIGN §5b rule 4): fixed oklch literals from
// ai.css `.ai-term`, deliberately not tokens. ANSI colours map onto the same small palette.
const TERM_BG = "bg-[oklch(0.17_0.005_286)]";
const TERM_FG = "text-[oklch(0.92_0.003_286)]";
const TERM_BORDER = "border-[oklch(0.27_0.007_286)]";
const TERM_MUTED = "text-[oklch(0.72_0.01_286)]";
const TERM_ACTION =
	"text-[oklch(0.72_0.01_286)] hover:bg-[oklch(0.25_0.007_286)] hover:text-[oklch(0.92_0.003_286)] focus-visible:outline-[oklch(0.78_0.15_155)]";

const ANSI_COLORS = [
	"[&_.ansi-green-fg]:text-[oklch(0.78_0.15_155)]",
	"[&_.ansi-bright-green-fg]:text-[oklch(0.78_0.15_155)]",
	"[&_.ansi-yellow-fg]:text-[oklch(0.83_0.13_85)]",
	"[&_.ansi-bright-yellow-fg]:text-[oklch(0.83_0.13_85)]",
	"[&_.ansi-red-fg]:text-[oklch(0.7_0.17_20)]",
	"[&_.ansi-bright-red-fg]:text-[oklch(0.7_0.17_20)]",
	"[&_.ansi-blue-fg]:text-[oklch(0.72_0.13_255)]",
	"[&_.ansi-bright-blue-fg]:text-[oklch(0.72_0.13_255)]",
	"[&_.ansi-magenta-fg]:text-[oklch(0.74_0.14_320)]",
	"[&_.ansi-bright-magenta-fg]:text-[oklch(0.74_0.14_320)]",
	"[&_.ansi-cyan-fg]:text-[oklch(0.8_0.1_200)]",
	"[&_.ansi-bright-cyan-fg]:text-[oklch(0.8_0.1_200)]",
	"[&_.ansi-black-fg]:text-[oklch(0.58_0.01_286)]",
	"[&_.ansi-bright-black-fg]:text-[oklch(0.58_0.01_286)]",
	"[&_.ansi-bold]:font-semibold",
	"[&_.ansi-dim]:opacity-60",
	"[&_.ansi-italic]:italic",
	"[&_.ansi-underline]:underline",
].join(" ");

export type TerminalHeaderProps = HTMLAttributes<HTMLDivElement>;

export const TerminalHeader = ({
	className,
	children,
	...props
}: TerminalHeaderProps) => (
	<div
		data-slot="ai-terminal-header"
		className={cn(
			"flex h-9 items-center justify-between gap-2 border-b pr-1.5 pl-3 text-[12.5px]",
			TERM_BORDER,
			TERM_MUTED,
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type TerminalTitleProps = HTMLAttributes<HTMLDivElement>;

export const TerminalTitle = ({
	className,
	children,
	...props
}: TerminalTitleProps) => (
	<div
		data-slot="ai-terminal-title"
		className={cn("flex items-center gap-2", className)}
		{...props}
	>
		<IconPlaceholder
			lucide="TerminalSquareIcon"
			tabler="IconTerminal2"
			hugeicons="ComputerTerminalIcon"
			phosphor="TerminalIcon"
			remixicon="RiTerminalBoxLine"
			className="size-3.5"
		/>
		{children ?? "Terminal"}
	</div>
);

export type TerminalStatusProps = HTMLAttributes<HTMLDivElement>;

export const TerminalStatus = ({
	className,
	children,
	...props
}: TerminalStatusProps) => {
	const { isStreaming } = useContext(TerminalContext);

	if (!isStreaming) {
		return null;
	}

	return (
		<div
			data-slot="ai-terminal-status"
			className={cn("ml-1.5 flex items-center gap-1.5", className)}
			{...props}
		>
			{children ?? (
				<>
					<span className="size-1.5 rounded-full bg-[oklch(0.78_0.15_155)]" />
					running
				</>
			)}
		</div>
	);
};

export type TerminalActionsProps = HTMLAttributes<HTMLDivElement>;

export const TerminalActions = ({
	className,
	children,
	...props
}: TerminalActionsProps) => (
	<div
		data-slot="ai-terminal-actions"
		className={cn("flex items-center gap-0.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type TerminalCopyButtonProps = ComponentProps<typeof Button> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const TerminalCopyButton = ({
	onCopy,
	onError,
	timeout = 2000,
	children,
	className,
	...props
}: TerminalCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<number>(0);
	const { output } = useContext(TerminalContext);

	const copyToClipboard = useCallback(async () => {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}

		try {
			await navigator.clipboard.writeText(output);
			setIsCopied(true);
			onCopy?.();
			timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout);
		} catch (error) {
			onError?.(error as Error);
		}
	}, [output, onCopy, onError, timeout]);

	useEffect(
		() => () => {
			window.clearTimeout(timeoutRef.current);
		},
		[],
	);

	return (
		<Button
			aria-label="Copy output"
			className={cn(TERM_ACTION, className)}
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
};

export type TerminalClearButtonProps = ComponentProps<typeof Button>;

export const TerminalClearButton = ({
	children,
	className,
	...props
}: TerminalClearButtonProps) => {
	const { onClear } = useContext(TerminalContext);

	if (!onClear) {
		return null;
	}

	return (
		<Button
			aria-label="Clear output"
			className={cn(TERM_ACTION, className)}
			onClick={onClear}
			size="icon-xs"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="Trash2Icon"
					tabler="IconTrash"
					hugeicons="Delete02Icon"
					phosphor="TrashIcon"
					remixicon="RiDeleteBinLine"
					className="size-3.5"
				/>
			)}
		</Button>
	);
};

export type TerminalContentProps = HTMLAttributes<HTMLDivElement>;

export const TerminalContent = ({
	className,
	children,
	...props
}: TerminalContentProps) => {
	const { output, isStreaming, autoScroll } = useContext(TerminalContext);
	const containerRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: new output must re-run the scroll
	useEffect(() => {
		if (autoScroll && containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [output, autoScroll]);

	return (
		<div
			data-slot="ai-terminal-content"
			className={cn(
				"max-h-96 overflow-auto px-3.5 py-2.5 font-mono text-[12.5px] leading-[1.7]",
				ANSI_COLORS,
				className,
			)}
			ref={containerRef}
			{...props}
		>
			{children ?? (
				<pre className="font-[inherit] break-words whitespace-pre-wrap">
					<Ansi useClasses>{output}</Ansi>
					{isStreaming && (
						<span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-current align-[-2px]" />
					)}
				</pre>
			)}
		</div>
	);
};

export type TerminalProps = HTMLAttributes<HTMLDivElement> & {
	output: string;
	isStreaming?: boolean;
	autoScroll?: boolean;
	onClear?: () => void;
};

export const Terminal = ({
	output,
	isStreaming = false,
	autoScroll = true,
	onClear,
	className,
	children,
	...props
}: TerminalProps) => {
	const contextValue = useMemo(
		() => ({ autoScroll, isStreaming, onClear, output }),
		[autoScroll, isStreaming, onClear, output],
	);

	return (
		<TerminalContext.Provider value={contextValue}>
			<div
				data-slot="ai-terminal"
				className={cn(
					"flex flex-col overflow-hidden rounded-[calc(var(--radius)*1.2)] border",
					TERM_BG,
					TERM_FG,
					TERM_BORDER,
					className,
				)}
				{...props}
			>
				{children ?? (
					<>
						<TerminalHeader>
							<div className="flex items-center">
								<TerminalTitle />
								<TerminalStatus />
							</div>
							<TerminalActions>
								<TerminalCopyButton />
								{onClear && <TerminalClearButton />}
							</TerminalActions>
						</TerminalHeader>
						<TerminalContent />
					</>
				)}
			</div>
		</TerminalContext.Provider>
	);
};
