"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
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
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@/registry/edmi/ui/input-group";

interface SnippetContextType {
	code: string;
}

const SnippetContext = createContext<SnippetContextType>({
	code: "",
});

export type SnippetProps = ComponentProps<typeof InputGroup> & {
	code: string;
};

export const Snippet = ({
	code,
	className,
	children,
	...props
}: SnippetProps) => {
	const contextValue = useMemo(() => ({ code }), [code]);

	return (
		<SnippetContext.Provider value={contextValue}>
			<InputGroup
				data-slot="ai-snippet"
				className={cn("font-mono", className)}
				{...props}
			>
				{children}
			</InputGroup>
		</SnippetContext.Provider>
	);
};

export type SnippetAddonProps = ComponentProps<typeof InputGroupAddon>;

export const SnippetAddon = (props: SnippetAddonProps) => (
	<InputGroupAddon {...props} />
);

export type SnippetTextProps = ComponentProps<typeof InputGroupText>;

export const SnippetText = ({ className, ...props }: SnippetTextProps) => (
	<InputGroupText
		className={cn("pl-2 font-mono text-xs font-normal", className)}
		{...props}
	/>
);

export type SnippetInputProps = Omit<
	ComponentProps<typeof InputGroupInput>,
	"readOnly" | "value"
>;

export const SnippetInput = ({ className, ...props }: SnippetInputProps) => {
	const { code } = useContext(SnippetContext);

	return (
		<InputGroupInput
			className={cn(
				"font-mono text-xs text-ellipsis text-foreground",
				className,
			)}
			readOnly
			value={code}
			{...props}
		/>
	);
};

export type SnippetCopyButtonProps = ComponentProps<typeof InputGroupButton> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const SnippetCopyButton = ({
	onCopy,
	onError,
	timeout = 2000,
	children,
	className,
	...props
}: SnippetCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<number>(0);
	const { code } = useContext(SnippetContext);

	const copyToClipboard = useCallback(async () => {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}

		try {
			if (!isCopied) {
				await navigator.clipboard.writeText(code);
				setIsCopied(true);
				onCopy?.();
				timeoutRef.current = window.setTimeout(
					() => setIsCopied(false),
					timeout,
				);
			}
		} catch (error) {
			onError?.(error as Error);
		}
	}, [code, onCopy, onError, timeout, isCopied]);

	useEffect(
		() => () => {
			window.clearTimeout(timeoutRef.current);
		},
		[],
	);

	return (
		<InputGroupButton
			aria-label="Copy"
			className={cn("mr-1", className)}
			onClick={copyToClipboard}
			size="icon-xs"
			title="Copy"
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
		</InputGroupButton>
	);
};
