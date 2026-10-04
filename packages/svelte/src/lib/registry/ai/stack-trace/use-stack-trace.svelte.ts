import { getContext, setContext } from "svelte";

export interface StackFrame {
	raw: string;
	functionName: string | null;
	filePath: string | null;
	lineNumber: number | null;
	columnNumber: number | null;
	isInternal: boolean;
}

export interface ParsedStackTrace {
	errorType: string | null;
	errorMessage: string;
	frames: StackFrame[];
	raw: string;
}

export interface StackTraceContext {
	readonly trace: ParsedStackTrace;
	readonly raw: string;
	open: boolean;
	onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
}

const KEY = Symbol("ai-stack-trace");

export function setStackTraceContext(ctx: StackTraceContext) {
	setContext(KEY, ctx);
}

export function useStackTraceContext(): StackTraceContext {
	const ctx = getContext<StackTraceContext | undefined>(KEY);
	if (!ctx)
		throw new Error("StackTrace components must be used within StackTrace");
	return ctx;
}

const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/;
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/;
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/;
export const AT_PREFIX_REGEX = /^at\s+/;

function parseStackFrame(line: string): StackFrame {
	const trimmed = line.trim();

	// Pattern: at functionName (filePath:line:column)
	const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX);
	if (withParensMatch) {
		const [, functionName, filePath, lineNum, colNum] = withParensMatch;
		const isInternal =
			filePath.includes("node_modules") ||
			filePath.startsWith("node:") ||
			filePath.includes("internal/");
		return {
			raw: trimmed,
			functionName: functionName ?? null,
			filePath: filePath ?? null,
			lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
			columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
			isInternal,
		};
	}

	// Pattern: at filePath:line:column (no function name)
	const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX);
	if (withoutFnMatch) {
		const [, filePath, lineNum, colNum] = withoutFnMatch;
		const isInternal =
			(filePath?.includes("node_modules") ?? false) ||
			(filePath?.startsWith("node:") ?? false) ||
			(filePath?.includes("internal/") ?? false);
		return {
			raw: trimmed,
			functionName: null,
			filePath: filePath ?? null,
			lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
			columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
			isInternal,
		};
	}

	// Fallback: unparseable line
	return {
		raw: trimmed,
		functionName: null,
		filePath: null,
		lineNumber: null,
		columnNumber: null,
		isInternal: trimmed.includes("node_modules") || trimmed.includes("node:"),
	};
}

export function parseStackTrace(trace: string): ParsedStackTrace {
	const lines = trace.split("\n").filter((line) => line.trim());

	if (lines.length === 0) {
		return {
			errorType: null,
			errorMessage: trace,
			frames: [],
			raw: trace,
		};
	}

	const firstLine = lines[0].trim();
	let errorType: string | null = null;
	let errorMessage = firstLine;

	// Try to extract error type from "ErrorType: message" format
	const errorMatch = firstLine.match(ERROR_TYPE_REGEX);
	if (errorMatch) {
		errorType = errorMatch[1];
		errorMessage = errorMatch[2] || "";
	}

	// Parse stack frames (lines starting with "at")
	const frames = lines
		.slice(1)
		.filter((line) => line.trim().startsWith("at "))
		.map(parseStackFrame);

	return {
		errorType,
		errorMessage,
		frames,
		raw: trace,
	};
}
