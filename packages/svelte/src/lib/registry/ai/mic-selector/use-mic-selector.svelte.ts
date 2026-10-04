import { getContext, setContext } from "svelte";

/** Getter object so consumers stay reactive when the props change. */
export interface MicSelectorContext {
	readonly devices: MediaDeviceInfo[];
	readonly value: string | undefined;
	setValue: (value: string | undefined) => void;
	setOpen: (open: boolean) => void;
	readonly width: number;
	setWidth: (width: number) => void;
}

const KEY = Symbol("ai-mic-selector");

export function setMicSelectorContext(value: MicSelectorContext) {
	return setContext(KEY, value);
}

export function useMicSelector(componentName: string): MicSelectorContext {
	const context = getContext<MicSelectorContext | undefined>(KEY);
	if (!context) {
		throw new Error(`${componentName} must be used within MicSelector`);
	}
	return context;
}
