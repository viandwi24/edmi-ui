import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export interface FileTreeContext {
	expandedPaths: Ref<Set<string>>;
	togglePath: (path: string) => void;
	selectedPath: Ref<string | undefined>;
	select: (path: string) => void;
}

export const FileTreeKey: InjectionKey<FileTreeContext> = Symbol("FileTree");

export function useFileTreeContext() {
	const ctx = inject(FileTreeKey);
	if (!ctx) throw new Error("FileTree parts must be used within <FileTree />");
	return ctx;
}

// One row: 28px, 13px sans, selected = --accent fill + weight 500 (board AI 05).
export const FILE_TREE_ROW =
	"flex h-7 w-full items-center gap-[7px] rounded-md px-2 text-left text-[13px] whitespace-nowrap transition-colors hover:bg-muted data-[selected]:bg-accent data-[selected]:font-medium";
