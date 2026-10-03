import { getContext, setContext } from "svelte";

const KEY = Symbol("edmi-combobox");

export type ComboboxContext = {
	/** Clears the selection (and the typed text) of the nearest Combobox root. */
	clear: () => void;
};

export function setComboboxContext(ctx: ComboboxContext) {
	return setContext(KEY, ctx);
}

export function getComboboxContext() {
	return getContext<ComboboxContext | undefined>(KEY);
}
