import { getContext, setContext } from "svelte";

export interface WebPreviewContext {
	url: string;
	consoleOpen: boolean;
}

const KEY = Symbol("ai-web-preview");

export function setWebPreviewContext(ctx: WebPreviewContext) {
	setContext(KEY, ctx);
}

export function useWebPreviewContext(): WebPreviewContext {
	const ctx = getContext<WebPreviewContext | undefined>(KEY);
	if (!ctx)
		throw new Error("WebPreview components must be used within WebPreview");
	return ctx;
}
