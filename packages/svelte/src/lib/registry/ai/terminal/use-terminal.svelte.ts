// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { getContext, setContext } from "svelte";

export interface TerminalContext {
	readonly output: string;
	readonly isStreaming: boolean;
	readonly autoScroll: boolean;
	readonly onClear: (() => void) | undefined;
}

const KEY = Symbol("ai-terminal");

export function setTerminalContext(ctx: TerminalContext) {
	setContext(KEY, ctx);
}

export function useTerminalContext(): TerminalContext {
	const ctx = getContext<TerminalContext | undefined>(KEY);
	if (!ctx) throw new Error("Terminal components must be used within Terminal");
	return ctx;
}

// The terminal is always dark, in every theme and mode (DESIGN §5b rule 4): fixed oklch literals from
// ai.css `.ai-term`, deliberately not tokens.
export const TERM_ACTION =
	"text-[oklch(0.72_0.01_286)] hover:bg-[oklch(0.25_0.007_286)] hover:text-[oklch(0.92_0.003_286)] focus-visible:outline-[oklch(0.78_0.15_155)]";
