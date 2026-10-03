// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { getContext, setContext } from "svelte";

/** Getter object keeps the context reactive. */
export interface FileTreeContextValue {
	readonly expandedPaths: Set<string>;
	readonly selectedPath: string | undefined;
	togglePath: (path: string) => void;
	select: (path: string) => void;
}

const KEY = Symbol("ai-file-tree");

export function setFileTreeContext(value: FileTreeContextValue) {
	return setContext(KEY, value);
}

export function useFileTreeContext(): FileTreeContextValue {
	const ctx = getContext<FileTreeContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error("FileTree parts must be used within <FileTree>");
	}
	return ctx;
}

// One row: 28px, 13px sans, selected = --accent fill + weight 500 (board AI 05).
export const FILE_TREE_ROW =
	"flex h-7 w-full items-center gap-[7px] rounded-md px-2 text-left text-[13px] whitespace-nowrap transition-colors hover:bg-muted data-[selected]:bg-accent data-[selected]:font-medium";
