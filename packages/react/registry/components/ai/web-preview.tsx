"use client";

import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import { Input } from "@/registry/edmi/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";

export interface WebPreviewContextValue {
	url: string;
	setUrl: (url: string) => void;
	consoleOpen: boolean;
	setConsoleOpen: (open: boolean) => void;
}

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null);

const useWebPreview = () => {
	const context = useContext(WebPreviewContext);
	if (!context) {
		throw new Error("WebPreview components must be used within a WebPreview");
	}
	return context;
};

export type WebPreviewProps = ComponentProps<"div"> & {
	defaultUrl?: string;
	onUrlChange?: (url: string) => void;
	/** ✦ Start with the console open. */
	defaultConsoleOpen?: boolean;
};

export const WebPreview = ({
	className,
	children,
	defaultUrl = "",
	onUrlChange,
	defaultConsoleOpen = false,
	...props
}: WebPreviewProps) => {
	const [url, setUrl] = useState(defaultUrl);
	const [consoleOpen, setConsoleOpen] = useState(defaultConsoleOpen);

	const handleUrlChange = useCallback(
		(newUrl: string) => {
			setUrl(newUrl);
			onUrlChange?.(newUrl);
		},
		[onUrlChange],
	);

	const contextValue = useMemo<WebPreviewContextValue>(
		() => ({
			consoleOpen,
			setConsoleOpen,
			setUrl: handleUrlChange,
			url,
		}),
		[consoleOpen, handleUrlChange, url],
	);

	return (
		<WebPreviewContext.Provider value={contextValue}>
			<div
				data-slot="ai-web-preview"
				className={cn(
					"flex size-full flex-col overflow-hidden rounded-xl border border-border bg-card",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</WebPreviewContext.Provider>
	);
};

export type WebPreviewNavigationProps = ComponentProps<"div">;

export const WebPreviewNavigation = ({
	className,
	children,
	...props
}: WebPreviewNavigationProps) => (
	<div
		data-slot="ai-web-preview-navigation"
		className={cn(
			"flex h-11 shrink-0 items-center gap-1 border-b border-border px-2",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type WebPreviewNavigationButtonProps = ComponentProps<typeof Button> & {
	tooltip?: string;
};

export const WebPreviewNavigationButton = ({
	onClick,
	disabled,
	tooltip,
	children,
	...props
}: WebPreviewNavigationButtonProps) => {
	const button = (
		<Button
			aria-label={tooltip}
			disabled={disabled}
			onClick={onClick}
			size="icon-sm"
			variant="ghost"
			{...props}
		>
			{children}
		</Button>
	);

	if (!tooltip) {
		return button;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger render={button} />
				<TooltipContent>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export type WebPreviewUrlProps = ComponentProps<typeof Input>;

export const WebPreviewUrl = ({
	value,
	onChange,
	onKeyDown,
	className,
	...props
}: WebPreviewUrlProps) => {
	const { url, setUrl } = useWebPreview();
	const [prevUrl, setPrevUrl] = useState(url);
	const [inputValue, setInputValue] = useState(url);

	// Sync input value with context URL when it changes externally (derived state pattern)
	if (url !== prevUrl) {
		setPrevUrl(url);
		setInputValue(url);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		onChange?.(event);
	};

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				const target = event.target as HTMLInputElement;
				setUrl(target.value);
			}
			onKeyDown?.(event);
		},
		[setUrl, onKeyDown],
	);

	return (
		<div className="relative mx-1.5 flex-1">
			<IconPlaceholder
				lucide="LockIcon"
				tabler="IconLock"
				hugeicons="SquareLock02Icon"
				phosphor="LockKeyIcon"
				remixicon="RiLockLine"
				className="pointer-events-none absolute top-1/2 left-2.5 size-3 -translate-y-1/2 text-muted-foreground"
			/>
			<Input
				data-slot="ai-web-preview-url"
				className={cn("h-[30px] pl-7 font-mono text-xs", className)}
				onChange={onChange ?? handleChange}
				onKeyDown={handleKeyDown}
				placeholder="Enter URL..."
				value={value ?? inputValue}
				{...props}
			/>
		</div>
	);
};

export type WebPreviewBodyProps = Omit<ComponentProps<"iframe">, "loading"> & {
	loading?: ReactNode;
};

export const WebPreviewBody = ({
	className,
	loading,
	src,
	...props
}: WebPreviewBodyProps) => {
	const { url } = useWebPreview();

	return (
		<div
			data-slot="ai-web-preview-body"
			className="relative min-h-0 flex-1 bg-background"
		>
			<iframe
				className={cn("size-full", className)}
				sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
				src={(src ?? url) || undefined}
				title="Preview"
				{...props}
			/>
			{loading}
		</div>
	);
};

export type WebPreviewConsoleProps = ComponentProps<"div"> & {
	logs?: {
		level: "log" | "warn" | "error";
		message: string;
		timestamp: Date;
	}[];
};

export const WebPreviewConsole = ({
	className,
	logs = [],
	children,
	...props
}: WebPreviewConsoleProps) => {
	const { consoleOpen, setConsoleOpen } = useWebPreview();

	return (
		<Collapsible
			data-slot="ai-web-preview-console"
			className={cn(
				"border-t border-border bg-card font-mono text-[11.5px] leading-[1.8]",
				className,
			)}
			onOpenChange={setConsoleOpen}
			open={consoleOpen}
			{...props}
		>
			<CollapsibleTrigger className="group/ai-console flex w-full items-center justify-between px-3 pt-2 pb-1 text-left font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
				Console
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					className="size-3.5 transition-transform duration-200 group-data-[panel-open]/ai-console:rotate-180"
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
				<div className="max-h-48 overflow-y-auto px-3 pb-2">
					{logs.length === 0 ? (
						<p className="text-muted-foreground">No console output</p>
					) : (
						logs.map((log) => (
							<div
								className={cn(
									log.level === "error" && "text-destructive-text",
									log.level === "warn" && "text-warning-text",
									log.level === "log" && "text-foreground",
								)}
								key={`${log.timestamp.getTime()}-${log.level}-${log.message}`}
							>
								<span className="text-muted-foreground">
									{log.timestamp.toLocaleTimeString([], { hour12: false })}
								</span>{" "}
								{log.level.padEnd(4, " ")} {log.message}
							</div>
						))
					)}
					{children}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};
