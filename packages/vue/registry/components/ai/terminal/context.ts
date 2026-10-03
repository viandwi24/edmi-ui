// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ComputedRef, InjectionKey } from "vue";
import { inject } from "vue";

export interface TerminalContextValue {
	output: ComputedRef<string>;
	isStreaming: ComputedRef<boolean>;
	autoScroll: ComputedRef<boolean>;
	hasClear: ComputedRef<boolean>;
	onClear: () => void;
}

export const TerminalKey: InjectionKey<TerminalContextValue> =
	Symbol("Terminal");

export function useTerminalContext(
	componentName: string,
): TerminalContextValue {
	const context = inject(TerminalKey);

	if (!context) {
		throw new Error(`${componentName} must be used within Terminal`);
	}

	return context;
}

// The terminal is always dark, in every theme and mode (DESIGN §5b rule 4): fixed oklch literals from
// ai.css `.ai-term`, deliberately not tokens.
export const TERM_ACTION =
	"text-[oklch(0.72_0.01_286)] hover:bg-[oklch(0.25_0.007_286)] hover:text-[oklch(0.92_0.003_286)] focus-visible:outline-[oklch(0.78_0.15_155)]";
