"use client";

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
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";
import { Switch } from "@/registry/edmi/ui/switch";

interface EnvironmentVariablesContextType {
	showValues: boolean;
	setShowValues: (show: boolean) => void;
}

const noop = () => {};

const EnvironmentVariablesContext =
	createContext<EnvironmentVariablesContextType>({
		setShowValues: noop,
		showValues: false,
	});

export type EnvironmentVariablesProps = HTMLAttributes<HTMLDivElement> & {
	showValues?: boolean;
	defaultShowValues?: boolean;
	onShowValuesChange?: (show: boolean) => void;
};

export const EnvironmentVariables = ({
	showValues: controlledShowValues,
	defaultShowValues = false,
	onShowValuesChange,
	className,
	children,
	...props
}: EnvironmentVariablesProps) => {
	const [internalShowValues, setInternalShowValues] =
		useState(defaultShowValues);
	const showValues = controlledShowValues ?? internalShowValues;

	const setShowValues = useCallback(
		(show: boolean) => {
			setInternalShowValues(show);
			onShowValuesChange?.(show);
		},
		[onShowValuesChange],
	);

	const contextValue = useMemo(
		() => ({ setShowValues, showValues }),
		[setShowValues, showValues],
	);

	return (
		<EnvironmentVariablesContext.Provider value={contextValue}>
			<div
				data-slot="ai-environment-variables"
				className={cn(
					"overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</EnvironmentVariablesContext.Provider>
	);
};

export type EnvironmentVariablesHeaderProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesHeader = ({
	className,
	children,
	...props
}: EnvironmentVariablesHeaderProps) => (
	<div
		className={cn("flex items-center justify-between px-3.5 py-2.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type EnvironmentVariablesTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const EnvironmentVariablesTitle = ({
	className,
	children,
	...props
}: EnvironmentVariablesTitleProps) => (
	<h3 className={cn("text-[13.5px] font-semibold", className)} {...props}>
		{children ?? "Environment variables"}
	</h3>
);

export type EnvironmentVariablesToggleProps = ComponentProps<typeof Switch>;

export const EnvironmentVariablesToggle = ({
	className,
	...props
}: EnvironmentVariablesToggleProps) => {
	const { showValues, setShowValues } = useContext(EnvironmentVariablesContext);

	return (
		<div className={cn("flex items-center gap-2 text-[12.5px]", className)}>
			<span className="text-muted-foreground">
				{showValues ? (
					<IconPlaceholder
						lucide="EyeIcon"
						tabler="IconEye"
						hugeicons="EyeIcon"
						phosphor="EyeIcon"
						remixicon="RiEyeLine"
						className="size-3.5"
					/>
				) : (
					<IconPlaceholder
						lucide="EyeOffIcon"
						tabler="IconEyeClosed"
						hugeicons="ViewOffIcon"
						phosphor="EyeSlashIcon"
						remixicon="RiEyeOffLine"
						className="size-3.5"
					/>
				)}
			</span>
			<span>Show values</span>
			<Switch
				aria-label="Toggle value visibility"
				checked={showValues}
				onCheckedChange={setShowValues}
				size="sm"
				{...props}
			/>
		</div>
	);
};

export type EnvironmentVariablesContentProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesContent = ({
	className,
	children,
	...props
}: EnvironmentVariablesContentProps) => (
	<div
		className={cn(
			"grid grid-cols-[190px_auto_minmax(0,1fr)_auto] gap-x-2.5",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

interface EnvironmentVariableContextType {
	name: string;
	value: string;
}

const EnvironmentVariableContext =
	createContext<EnvironmentVariableContextType>({
		name: "",
		value: "",
	});

export type EnvironmentVariableGroupProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariableGroup = ({
	className,
	children,
	...props
}: EnvironmentVariableGroupProps) => (
	<div className={cn("flex items-center gap-2", className)} {...props}>
		{children}
	</div>
);

export type EnvironmentVariableNameProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableName = ({
	className,
	children,
	...props
}: EnvironmentVariableNameProps) => {
	const { name } = useContext(EnvironmentVariableContext);

	return (
		<span
			className={cn(
				"col-start-1 w-[190px] shrink-0 truncate font-mono text-[12.5px]",
				className,
			)}
			{...props}
		>
			{children ?? name}
		</span>
	);
};

export type EnvironmentVariableValueProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableValue = ({
	className,
	children,
	...props
}: EnvironmentVariableValueProps) => {
	const { value } = useContext(EnvironmentVariableContext);
	const { showValues } = useContext(EnvironmentVariablesContext);

	// Masked values use a fixed length so the real length never leaks.
	const displayValue = showValues ? value : "•".repeat(12);

	return (
		<span
			className={cn(
				"col-start-3 min-w-0 truncate font-mono text-[12.5px]",
				!showValues && "tracking-[2px] text-muted-foreground select-none",
				className,
			)}
			{...props}
		>
			{children ?? displayValue}
		</span>
	);
};

export type EnvironmentVariableProps = HTMLAttributes<HTMLDivElement> & {
	name: string;
	value: string;
};

export const EnvironmentVariable = ({
	name,
	value,
	className,
	children,
	...props
}: EnvironmentVariableProps) => {
	const envVarContextValue = useMemo(() => ({ name, value }), [name, value]);

	return (
		<EnvironmentVariableContext.Provider value={envVarContextValue}>
			<div
				data-slot="ai-environment-variable"
				className={cn(
					"col-span-full grid grid-cols-subgrid items-center border-t border-border-2 px-3.5 py-[9px]",
					className,
				)}
				{...props}
			>
				{children ?? (
					<>
						<EnvironmentVariableName />
						<EnvironmentVariableValue />
					</>
				)}
			</div>
		</EnvironmentVariableContext.Provider>
	);
};

export type EnvironmentVariableCopyButtonProps = ComponentProps<
	typeof Button
> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
	copyFormat?: "name" | "value" | "export";
};

export const EnvironmentVariableCopyButton = ({
	onCopy,
	onError,
	timeout = 2000,
	copyFormat = "value",
	children,
	className,
	...props
}: EnvironmentVariableCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<number>(0);
	const { name, value } = useContext(EnvironmentVariableContext);

	const getTextToCopy = useCallback((): string => {
		const formatMap = {
			export: () => `export ${name}="${value}"`,
			name: () => name,
			value: () => value,
		};
		return formatMap[copyFormat]();
	}, [name, value, copyFormat]);

	const copyToClipboard = useCallback(async () => {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}

		try {
			await navigator.clipboard.writeText(getTextToCopy());
			setIsCopied(true);
			onCopy?.();
			timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout);
		} catch (error) {
			onError?.(error as Error);
		}
	}, [getTextToCopy, onCopy, onError, timeout]);

	useEffect(
		() => () => {
			window.clearTimeout(timeoutRef.current);
		},
		[],
	);

	return (
		<Button
			aria-label={`Copy ${copyFormat}`}
			className={cn("col-start-4 shrink-0", className)}
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
					/>
				) : (
					<IconPlaceholder
						lucide="CopyIcon"
						tabler="IconCopy"
						hugeicons="Copy01Icon"
						phosphor="CopyIcon"
						remixicon="RiFileCopyLine"
					/>
				))}
		</Button>
	);
};

export type EnvironmentVariableRequiredProps = ComponentProps<typeof Badge>;

export const EnvironmentVariableRequired = ({
	className,
	children,
	...props
}: EnvironmentVariableRequiredProps) => (
	<Badge
		className={cn("col-start-2 h-[18px] text-[10.5px]", className)}
		variant="warning"
		{...props}
	>
		{children ?? "Required"}
	</Badge>
);
