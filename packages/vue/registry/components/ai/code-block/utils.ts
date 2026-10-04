import type { BundledLanguage, HighlighterGeneric, ThemedToken } from "shiki";
import { createCssVariablesTheme, createHighlighter } from "shiki";

// Shiki's `css-variables` theme emits `var(--shiki-token-*)`; CodeBlockContainer maps those onto
// chart tokens, so highlighting follows mode, base and theme (DESIGN 5b).
export const THEME_NAME = "edmi-css-variables";
const edmiTheme = createCssVariablesTheme({
	name: THEME_NAME,
	variablePrefix: "--shiki-",
	fontStyle: true,
});

// Shiki font styles are bitflags: 1 = italic, 2 = bold, 4 = underline.
export const isItalic = (fontStyle: number | undefined) =>
	fontStyle && fontStyle & 1;
export const isBold = (fontStyle: number | undefined) =>
	fontStyle && fontStyle & 2;
export function isUnderline(fontStyle: number | undefined) {
	return fontStyle && fontStyle & 4;
}

export interface TokenizedCode {
	tokens: ThemedToken[][];
	fg: string;
	bg: string;
}

// Highlighter cache (singleton per language), token cache and async subscribers.
const highlighterCache = new Map<
	string,
	Promise<HighlighterGeneric<BundledLanguage, string>>
>();
const tokensCache = new Map<string, TokenizedCode>();
const subscribers = new Map<string, Set<(result: TokenizedCode) => void>>();

function getTokensCacheKey(code: string, language: BundledLanguage) {
	const start = code.slice(0, 100);
	const end = code.length > 100 ? code.slice(-100) : "";
	return `${language}:${code.length}:${start}:${end}`;
}

function getHighlighter(language: BundledLanguage) {
	const cached = highlighterCache.get(language);
	if (cached) {
		return cached;
	}
	const promise = createHighlighter({
		themes: [edmiTheme],
		langs: [language],
	}) as Promise<HighlighterGeneric<BundledLanguage, string>>;
	highlighterCache.set(language, promise);
	return promise;
}

// Plain tokens for immediate display while highlighting loads.
export function createRawTokens(code: string): TokenizedCode {
	return {
		tokens: code.split("\n").map((line) =>
			line === ""
				? []
				: [
						{
							content: line,
							color: "inherit",
						} as ThemedToken,
					],
		),
		fg: "inherit",
		bg: "transparent",
	};
}

/** Tokenizes `code`; returns the cached result synchronously or `null` and calls `callback` once ready. */
export function highlightCode(
	code: string,
	language: BundledLanguage,
	callback?: (result: TokenizedCode) => void,
): TokenizedCode | null {
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
				tokens: result.tokens,
				fg: result.fg ?? "inherit",
				bg: result.bg ?? "transparent",
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
}
