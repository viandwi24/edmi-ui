// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import { getContext, setContext } from "svelte";

export type OpenInContext = { readonly query: string };

const KEY = Symbol("open-in-context");

/** `context` is a getter object so a changing `query` prop stays reactive. */
export function setOpenInContext(context: OpenInContext) {
	setContext(KEY, context);
}

export function getOpenInContext(): OpenInContext {
	const context = getContext<OpenInContext>(KEY);
	if (!context) {
		throw new Error("OpenIn components must be used within an OpenIn provider");
	}
	return context;
}
