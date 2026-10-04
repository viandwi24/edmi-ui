"use client";

import { cn } from "cn";
import type { ComponentProps, CSSProperties, HTMLAttributes } from "react";
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
import type {
	BundledLanguage,
	HighlighterGeneric,
	ThemedToken,
	ThemeRegistration,
} from "shiki";
import { createCssVariablesTheme, createHighlighter } from "shiki";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/edmi/ui/select";

// The canonical code block of the kit (DESIGN §5b): body on --card, header on --muted,
// highlight colours come from chart tokens so they follow mode, base and theme.
// Shiki's `css-variables` theme emits `var(--shiki-token-*)`; the container maps those onto tokens.

const SHIKI_TOKEN_VARS = cn(
	"[--shiki-foreground:var(--foreground)] [--shiki-background:transparent]",
	"[--shiki-token-keyword:var(--chart-2)] [--shiki-token-string:var(--success-text)]",
	"[--shiki-token-string-expression:var(--success-text)] [--shiki-token-constant:var(--chart-3)]",
	"[--shiki-token-function:var(--chart-4)] [--shiki-token-comment:var(--muted-foreground)]",
	"[--shiki-token-parameter:var(--foreground)] [--shiki-token-punctuation:var(--foreground)]",
	"[--shiki-token-link:var(--info-text)]",
);

const THEME_NAME = "edmi-css-variables";
const edmiTheme: ThemeRegistration = createCssVariablesTheme({
	name: THEME_NAME,
	variablePrefix: "--shiki-",
	fontStyle: true,
});

// Shiki font styles are bitflags: 1 = italic, 2 = bold, 4 = underline.
const isItalic = (fontStyle: number | undefined) => fontStyle && fontStyle & 1;
const isBold = (fontStyle: number | undefined) => fontStyle && fontStyle & 2;
const isUnderline = (fontStyle: number | undefined) =>
	fontStyle && fontStyle & 4;

interface KeyedToken {
	token: ThemedToken;
	key: string;
}
interface KeyedLine {
	tokens: KeyedToken[];
	key: string;
}

const addKeysToTokens = (lines: ThemedToken[][]): KeyedLine[] =>
	lines.map((line, lineIdx) => ({
		key: `line-${lineIdx}`,
		tokens: line.map((token, tokenIdx) => ({
			key: `line-${lineIdx}-${tokenIdx}`,
			token,
		})),
	}));

const TokenSpan = ({ token }: { token: ThemedToken }) => (
	<span
		style={
			{
				color: token.color,
				fontStyle: isItalic(token.fontStyle) ? "italic" : undefined,
				fontWeight: isBold(token.fontStyle) ? "bold" : undefined,
				textDecoration: isUnderline(token.fontStyle) ? "underline" : undefined,
				...token.htmlStyle,
			} as CSSProperties
		}
	>
		{token.content}
	</span>
);

// Line numbers use CSS counters: 38px gutter, number right-aligned 14px from the code (board AI 05).
const LINE_NUMBER_CLASSES = cn(
	"block",
	"before:inline-block before:w-[38px] before:pr-3.5 before:text-right",
	"before:content-[counter(line)] before:[counter-increment:line]",
	"before:font-mono before:text-muted-foreground-2 before:select-none",
);

const LineSpan = ({
	keyedLine,
	showLineNumbers,
}: {
	keyedLine: KeyedLine;
	showLineNumbers: boolean;
}) => (
	<span className={showLineNumbers ? LINE_NUMBER_CLASSES : "block"}>
		{keyedLine.tokens.length === 0
			? "\n"
			: keyedLine.tokens.map(({ token, key }) => (
					<TokenSpan key={key} token={token} />
				))}
	</span>
);

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
	code: string;
	language: BundledLanguage;
	showLineNumbers?: boolean;
};

interface TokenizedCode {
	tokens: ThemedToken[][];
	fg: string;
	bg: string;
}

interface CodeBlockContextType {
	code: string;
}

const CodeBlockContext = createContext<CodeBlockContextType>({ code: "" });

// Highlighter cache (singleton per language), token cache and async subscribers.
const highlighterCache = new Map<
	string,
	Promise<HighlighterGeneric<BundledLanguage, string>>
>();
const tokensCache = new Map<string, TokenizedCode>();
const subscribers = new Map<string, Set<(result: TokenizedCode) => void>>();

const getTokensCacheKey = (code: string, language: BundledLanguage) => {
	const start = code.slice(0, 100);
	const end = code.length > 100 ? code.slice(-100) : "";
	return `${language}:${code.length}:${start}:${end}`;
};

const getHighlighter = (language: BundledLanguage) => {
	const cached = highlighterCache.get(language);
	if (cached) {
		return cached;
	}
	const promise = createHighlighter({
		langs: [language],
		themes: [edmiTheme],
	}) as Promise<HighlighterGeneric<BundledLanguage, string>>;
	highlighterCache.set(language, promise);
	return promise;
};

// Plain tokens for immediate display while highlighting loads.
const createRawTokens = (code: string): TokenizedCode => ({
	bg: "transparent",
	fg: "inherit",
	tokens: code.split("\n").map((line) =>
		line === ""
			? []
			: [
					{
						color: "inherit",
						content: line,
					} as ThemedToken,
				],
	),
});

/** Tokenizes `code`; returns the cached result synchronously or `null` and calls `callback` once ready. */
export const highlightCode = (
	code: string,
	language: BundledLanguage,
	callback?: (result: TokenizedCode) => void,
): TokenizedCode | null => {
	const key = getTokensCacheKey(code, language);
	const cached = tokensCache.get(key);
	if (cached) {
		return cached;
	}

	if (callback) {
		if (!subscribers.has(key)) {
			subscribers.set(key, new Set());
		}
		subscribers.get(key)?.add(callback);
	}

	getHighlighter(language)
		.then((highlighter) => {
			const loaded = highlighter.getLoadedLanguages();
			const lang = loaded.includes(language) ? language : "text";
			const result = highlighter.codeToTokens(code, {
				lang,
				theme: THEME_NAME,
			});
			const tokenized: TokenizedCode = {
				bg: result.bg ?? "transparent",
				fg: result.fg ?? "inherit",
				tokens: result.tokens,
			};
			tokensCache.set(key, tokenized);
			const subs = subscribers.get(key);
			if (subs) {
				for (const sub of subs) {
					sub(tokenized);
				}
				subscribers.delete(key);
			}
		})
		.catch((error) => {
			console.error("Failed to highlight code:", error);
			subscribers.delete(key);
		});

	return null;
};

const CodeBlockBody = memo(
	({
		tokenized,
		showLineNumbers,
		className,
	}: {
		tokenized: TokenizedCode;
		showLineNumbers: boolean;
		className?: string;
	}) => {
		const keyedLines = useMemo(
			() => addKeysToTokens(tokenized.tokens),
			[tokenized.tokens],
		);

		return (
			<pre
				className={cn(
					"m-0 py-2.5 font-mono text-[12.5px] leading-[1.7]",
					showLineNumbers ? "pr-4" : "px-4",
					className,
				)}
			>
				<code
					className={cn(
						"font-mono",
						showLineNumbers &&
							"[counter-increment:line_0] [counter-reset:line]",
					)}
				>
					{keyedLines.map((keyedLine) => (
						<LineSpan
							key={keyedLine.key}
							keyedLine={keyedLine}
							showLineNumbers={showLineNumbers}
						/>
					))}
				</code>
			</pre>
		);
	},
	(prev, next) =>
		prev.tokenized === next.tokenized &&
		prev.showLineNumbers === next.showLineNumbers &&
		prev.className === next.className,
);

CodeBlockBody.displayName = "CodeBlockBody";

export const CodeBlockContainer = ({
	className,
	language,
	style,
	...props
}: HTMLAttributes<HTMLDivElement> & { language: string }) => (
	<div
		data-slot="ai-code-block"
		className={cn(
			"group relative w-full overflow-hidden rounded-xl border border-border bg-card text-foreground",
			SHIKI_TOKEN_VARS,
			className,
		)}
		data-language={language}
		style={{
			containIntrinsicSize: "auto 200px",
			contentVisibility: "auto",
			...style,
		}}
		{...props}
	/>
);

export const CodeBlockHeader = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		data-slot="ai-code-block-header"
		className={cn(
			"flex h-[38px] items-center justify-between gap-2 border-b border-border bg-muted pr-1.5 pl-3 text-[12.5px] text-muted-foreground",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export const CodeBlockTitle = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex items-center gap-2", className)} {...props}>
		{children}
	</div>
);

export const CodeBlockFilename = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) => (
	<span className={cn("font-mono text-xs", className)} {...props}>
		{children}
	</span>
);

export const CodeBlockActions = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex items-center gap-1", className)} {...props}>
		{children}
	</div>
);

export const CodeBlockContent = ({
	code,
	language,
	showLineNumbers = false,
}: {
	code: string;
	language: BundledLanguage;
	showLineNumbers?: boolean;
}) => {
	const rawTokens = useMemo(() => createRawTokens(code), [code]);
	const syncTokens = useMemo(
		() => highlightCode(code, language) ?? rawTokens,
		[code, language, rawTokens],
	);

	const [asyncTokens, setAsyncTokens] = useState<TokenizedCode | null>(null);
	const asyncKeyRef = useRef({ code, language });

	// Invalidate stale async tokens synchronously during render.
	if (
		asyncKeyRef.current.code !== code ||
		asyncKeyRef.current.language !== language
	) {
		asyncKeyRef.current = { code, language };
		setAsyncTokens(null);
	}

	useEffect(() => {
		let cancelled = false;
		highlightCode(code, language, (result) => {
			if (!cancelled) {
				setAsyncTokens(result);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [code, language]);

	const tokenized = asyncTokens ?? syncTokens;

	return (
		<div className="relative overflow-auto">
			<CodeBlockBody showLineNumbers={showLineNumbers} tokenized={tokenized} />
		</div>
	);
};

export const CodeBlock = ({
	code,
	language,
	showLineNumbers = false,
	className,
	children,
	...props
}: CodeBlockProps) => {
	const contextValue = useMemo(() => ({ code }), [code]);

	return (
		<CodeBlockContext.Provider value={contextValue}>
			<CodeBlockContainer className={className} language={language} {...props}>
				{children}
				<CodeBlockContent
					code={code}
					language={language}
					showLineNumbers={showLineNumbers}
				/>
			</CodeBlockContainer>
		</CodeBlockContext.Provider>
	);
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const CodeBlockCopyButton = ({
	onCopy,
	onError,
	timeout = 2000,
	children,
	className,
	...props
}: CodeBlockCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<number>(0);
	const { code } = useContext(CodeBlockContext);

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
		<Button
			aria-label="Copy code"
			className={cn("shrink-0", className)}
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

export type CodeBlockLanguageSelectorProps = ComponentProps<typeof Select>;

export const CodeBlockLanguageSelector = (
	props: CodeBlockLanguageSelectorProps,
) => <Select {...props} />;

export type CodeBlockLanguageSelectorTriggerProps = ComponentProps<
	typeof SelectTrigger
>;

/** Ghost trigger (board: a ghost xs button with a chevron). */
export const CodeBlockLanguageSelectorTrigger = ({
	className,
	...props
}: CodeBlockLanguageSelectorTriggerProps) => (
	<SelectTrigger
		className={cn(
			"h-6 gap-1 rounded-md border-transparent data-[size=sm]:h-6 data-[size=sm]:rounded-md bg-transparent px-2 text-xs font-normal text-foreground shadow-none hover:bg-accent",
			className,
		)}
		size="sm"
		{...props}
	/>
);

export type CodeBlockLanguageSelectorValueProps = ComponentProps<
	typeof SelectValue
>;

export const CodeBlockLanguageSelectorValue = (
	props: CodeBlockLanguageSelectorValueProps,
) => <SelectValue {...props} />;

export type CodeBlockLanguageSelectorContentProps = ComponentProps<
	typeof SelectContent
>;

export const CodeBlockLanguageSelectorContent = ({
	align = "end",
	...props
}: CodeBlockLanguageSelectorContentProps) => (
	<SelectContent align={align} {...props} />
);

export type CodeBlockLanguageSelectorItemProps = ComponentProps<
	typeof SelectItem
>;

export const CodeBlockLanguageSelectorItem = (
	props: CodeBlockLanguageSelectorItemProps,
) => <SelectItem {...props} />;
