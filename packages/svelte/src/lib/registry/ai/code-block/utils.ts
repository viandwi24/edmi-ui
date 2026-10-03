// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { BundledLanguage, HighlighterGeneric, ThemedToken } from "shiki";
import { createCssVariablesTheme, createHighlighter } from "shiki";

// Shiki's `css-variables` theme emits `var(--shiki-token-*)`; the container maps those onto chart
// tokens, so highlighting follows mode, base and theme (DESIGN 5b).
export const THEME_NAME = "edmi-css-variables";
const edmiTheme = createCssVariablesTheme({
	name: THEME_NAME,
	variablePrefix: "--shiki-",
	fontStyle: true,
});

// Shiki font styles are bitflags: 1 = italic, 2 = bold, 4 = underline.
export const isItalic = (fontStyle: number | undefined) =>
	Boolean(fontStyle && fontStyle & 1);
export const isBold = (fontStyle: number | undefined) =>
	Boolean(fontStyle && fontStyle & 2);
export const isUnderline = (fontStyle: number | undefined) =>
	Boolean(fontStyle && fontStyle & 4);

export interface TokenizedCode {
	tokens: ThemedToken[][];
	fg: string;
	bg: string;
}

const highlighterCache = new Map<
	string,
	Promise<HighlighterGeneric<BundledLanguage, string>>
>();
const tokensCache = new Map<string, TokenizedCode>();
const subscribers = new Map<string, Set<(result: TokenizedCode) => void>>();

const getKey = (code: string, language: BundledLanguage) => {
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

/** Plain tokens for immediate display while highlighting loads. */
export const createRawTokens = (code: string): TokenizedCode => ({
	bg: "transparent",
	fg: "inherit",
	tokens: code
		.split("\n")
		.map((line) =>
			line === "" ? [] : [{ color: "inherit", content: line } as ThemedToken],
		),
});

/** Tokenizes `code`; returns the cached result synchronously or `null` and calls `callback` once ready. */
export function highlightCode(
	code: string,
	language: BundledLanguage,
	callback?: (result: TokenizedCode) => void,
): TokenizedCode | null {
	const key = getKey(code, language);
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
			const lang = highlighter.getLoadedLanguages().includes(language)
				? language
				: "text";
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
			for (const sub of subscribers.get(key) ?? []) {
				sub(tokenized);
			}
			subscribers.delete(key);
		})
		.catch((error) => {
			console.error("Failed to highlight code:", error);
			subscribers.delete(key);
		});

	return null;
}
