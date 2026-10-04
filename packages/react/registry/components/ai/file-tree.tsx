"use client";

import { cn } from "cn";
import type { HTMLAttributes, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

interface FileTreeContextType {
	expandedPaths: Set<string>;
	togglePath: (path: string) => void;
	selectedPath?: string;
	onSelect?: (path: string) => void;
}

const noop = () => {};

const FileTreeContext = createContext<FileTreeContextType>({
	expandedPaths: new Set(),
	togglePath: noop,
});

// One row: 28px, 13px sans, selected = --accent fill + weight 500 (board AI 05).
const ROW =
	"flex h-7 w-full items-center gap-[7px] rounded-md px-2 text-left text-[13px] whitespace-nowrap transition-colors hover:bg-muted data-[selected]:bg-accent data-[selected]:font-medium";

export type FileTreeProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
	expanded?: Set<string>;
	defaultExpanded?: Set<string>;
	selectedPath?: string;
	onSelect?: (path: string) => void;
	onExpandedChange?: (expanded: Set<string>) => void;
};

export const FileTree = ({
	expanded: controlledExpanded,
	defaultExpanded = new Set(),
	selectedPath,
	onSelect,
	onExpandedChange,
	className,
	children,
	...props
}: FileTreeProps) => {
	const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
	const expandedPaths = controlledExpanded ?? internalExpanded;

	const togglePath = useCallback(
		(path: string) => {
			const newExpanded = new Set(expandedPaths);
			if (newExpanded.has(path)) {
				newExpanded.delete(path);
			} else {
				newExpanded.add(path);
			}
			setInternalExpanded(newExpanded);
			onExpandedChange?.(newExpanded);
		},
		[expandedPaths, onExpandedChange],
	);

	const contextValue = useMemo(
		() => ({ expandedPaths, onSelect, selectedPath, togglePath }),
		[expandedPaths, onSelect, selectedPath, togglePath],
	);

	return (
		<FileTreeContext.Provider value={contextValue}>
			<div
				data-slot="ai-file-tree"
				className={cn(
					"rounded-xl border border-border bg-card p-2 text-[13px] text-card-foreground",
					className,
				)}
				role="tree"
				{...props}
			>
				{children}
			</div>
		</FileTreeContext.Provider>
	);
};

export type FileTreeIconProps = HTMLAttributes<HTMLSpanElement>;

export const FileTreeIcon = ({
	className,
	children,
	...props
}: FileTreeIconProps) => (
	<span
		className={cn("inline-flex shrink-0 text-muted-foreground", className)}
		{...props}
	>
		{children}
	</span>
);

export type FileTreeNameProps = HTMLAttributes<HTMLSpanElement>;

export const FileTreeName = ({
	className,
	children,
	...props
}: FileTreeNameProps) => (
	<span className={cn("truncate", className)} {...props}>
		{children}
	</span>
);

interface FileTreeFolderContextType {
	path: string;
	name: string;
	isExpanded: boolean;
}

const FileTreeFolderContext = createContext<FileTreeFolderContextType>({
	isExpanded: false,
	name: "",
	path: "",
});

export type FileTreeFolderProps = HTMLAttributes<HTMLDivElement> & {
	path: string;
	name: string;
};

export const FileTreeFolder = ({
	path,
	name,
	className,
	children,
	...props
}: FileTreeFolderProps) => {
	const { expandedPaths, togglePath, selectedPath, onSelect } =
		useContext(FileTreeContext);
	const isExpanded = expandedPaths.has(path);
	const isSelected = selectedPath === path;

	const handleOpenChange = useCallback(() => {
		togglePath(path);
	}, [togglePath, path]);

	// Clicking the label selects the folder and toggles it, like the chevron.
	const handleSelect = useCallback(() => {
		onSelect?.(path);
		togglePath(path);
	}, [onSelect, togglePath, path]);

	const folderContextValue = useMemo(
		() => ({ isExpanded, name, path }),
		[isExpanded, name, path],
	);

	return (
		<FileTreeFolderContext.Provider value={folderContextValue}>
			<Collapsible onOpenChange={handleOpenChange} open={isExpanded}>
				<div
					aria-expanded={isExpanded}
					className={className}
					role="treeitem"
					tabIndex={-1}
					{...props}
				>
					<div className={ROW} data-selected={isSelected ? "" : undefined}>
						<CollapsibleTrigger
							aria-label={isExpanded ? `Collapse ${name}` : `Expand ${name}`}
							className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0 text-muted-foreground"
						>
							<IconPlaceholder
								lucide="ChevronRightIcon"
								tabler="IconChevronRight"
								hugeicons="ArrowRight01Icon"
								phosphor="CaretRightIcon"
								remixicon="RiArrowRightSLine"
								className={cn(
									"size-3.5 transition-transform",
									isExpanded && "rotate-90",
								)}
							/>
						</CollapsibleTrigger>
						<button
							className="flex min-w-0 flex-1 cursor-pointer items-center gap-[7px] border-none bg-transparent p-0 text-left"
							onClick={handleSelect}
							type="button"
						>
							<FileTreeIcon className="text-chart-3">
								{isExpanded ? (
									<IconPlaceholder
										lucide="FolderOpenIcon"
										tabler="IconFolderOpen"
										hugeicons="FolderOpenIcon"
										phosphor="FolderOpenIcon"
										remixicon="RiFolderOpenLine"
										className="size-4"
									/>
								) : (
									<IconPlaceholder
										lucide="FolderIcon"
										tabler="IconFolder"
										hugeicons="Folder01Icon"
										phosphor="FolderIcon"
										remixicon="RiFolderLine"
										className="size-4"
									/>
								)}
							</FileTreeIcon>
							<FileTreeName>{name}</FileTreeName>
						</button>
					</div>
					<CollapsibleContent>
						<div className="pl-4">{children}</div>
					</CollapsibleContent>
				</div>
			</Collapsible>
		</FileTreeFolderContext.Provider>
	);
};

interface FileTreeFileContextType {
	path: string;
	name: string;
}

const FileTreeFileContext = createContext<FileTreeFileContextType>({
	name: "",
	path: "",
});

export type FileTreeFileProps = HTMLAttributes<HTMLDivElement> & {
	path: string;
	name: string;
	icon?: ReactNode;
};

export const FileTreeFile = ({
	path,
	name,
	icon,
	className,
	children,
	...props
}: FileTreeFileProps) => {
	const { selectedPath, onSelect } = useContext(FileTreeContext);
	const isSelected = selectedPath === path;

	const handleClick = useCallback(() => {
		onSelect?.(path);
	}, [onSelect, path]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				onSelect?.(path);
			}
		},
		[onSelect, path],
	);

	const fileContextValue = useMemo(() => ({ name, path }), [name, path]);

	return (
		<FileTreeFileContext.Provider value={fileContextValue}>
			<div
				aria-selected={isSelected}
				className={cn(ROW, "cursor-pointer", className)}
				data-selected={isSelected ? "" : undefined}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				role="treeitem"
				tabIndex={0}
				{...props}
			>
				{children ?? (
					<>
						{/* Spacer so files line up with folder names */}
						<span className="w-3.5 shrink-0" />
						<FileTreeIcon>
							{icon ?? (
								<IconPlaceholder
									lucide="FileCodeIcon"
									tabler="IconFileCode"
									hugeicons="File01Icon"
									phosphor="FileCodeIcon"
									remixicon="RiFileCodeLine"
									className="size-4"
								/>
							)}
						</FileTreeIcon>
						<FileTreeName>{name}</FileTreeName>
					</>
				)}
			</div>
		</FileTreeFileContext.Provider>
	);
};

export type FileTreeActionsProps = HTMLAttributes<HTMLDivElement>;

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const FileTreeActions = ({
	className,
	children,
	...props
}: FileTreeActionsProps) => (
	// biome-ignore lint/a11y/useSemanticElements: a plain group that only stops propagation
	<div
		className={cn("ml-auto flex items-center gap-1", className)}
		onClick={stopPropagation}
		onKeyDown={stopPropagation}
		role="group"
		{...props}
	>
		{children}
	</div>
);
