"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/registry/edmi/ui/command";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/registry/edmi/ui/dialog";

// Built on ui/command + ui/dialog (DESIGN §5b): the palette body is the Edmi Command, the popup the Edmi Dialog.

export type ModelSelectorProps = ComponentProps<typeof Dialog>;

export const ModelSelector = (props: ModelSelectorProps) => (
	<Dialog {...props} />
);

export type ModelSelectorTriggerProps = ComponentProps<typeof DialogTrigger>;

/** Pass the visible trigger with `render`, e.g. `render={<Button variant="outline" />}`. */
export const ModelSelectorTrigger = (props: ModelSelectorTriggerProps) => (
	<DialogTrigger data-slot="ai-model-selector-trigger" {...props} />
);

export type ModelSelectorContentProps = ComponentProps<typeof DialogContent> & {
	title?: ReactNode;
};

export const ModelSelectorContent = ({
	className,
	children,
	title = "Model Selector",
	...props
}: ModelSelectorContentProps) => (
	<DialogContent
		data-slot="ai-model-selector-content"
		aria-describedby={undefined}
		showCloseButton={false}
		className={cn(
			"top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md",
			className,
		)}
		{...props}
	>
		<DialogTitle className="sr-only">{title}</DialogTitle>
		<Command className="rounded-none">{children}</Command>
	</DialogContent>
);

export type ModelSelectorDialogProps = ComponentProps<typeof CommandDialog>;

export const ModelSelectorDialog = (props: ModelSelectorDialogProps) => (
	<CommandDialog {...props} />
);

export type ModelSelectorInputProps = ComponentProps<typeof CommandInput>;

export const ModelSelectorInput = ({
	className,
	...props
}: ModelSelectorInputProps) => (
	<CommandInput className={cn("h-auto py-3.5", className)} {...props} />
);

export type ModelSelectorListProps = ComponentProps<typeof CommandList>;

export const ModelSelectorList = (props: ModelSelectorListProps) => (
	<CommandList {...props} />
);

export type ModelSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const ModelSelectorEmpty = (props: ModelSelectorEmptyProps) => (
	<CommandEmpty {...props} />
);

export type ModelSelectorGroupProps = ComponentProps<typeof CommandGroup>;

export const ModelSelectorGroup = (props: ModelSelectorGroupProps) => (
	<CommandGroup {...props} />
);

export type ModelSelectorItemProps = ComponentProps<typeof CommandItem>;

export const ModelSelectorItem = (props: ModelSelectorItemProps) => (
	<CommandItem {...props} />
);

export type ModelSelectorShortcutProps = ComponentProps<typeof CommandShortcut>;

export const ModelSelectorShortcut = (props: ModelSelectorShortcutProps) => (
	<CommandShortcut {...props} />
);

export type ModelSelectorSeparatorProps = ComponentProps<
	typeof CommandSeparator
>;

export const ModelSelectorSeparator = (props: ModelSelectorSeparatorProps) => (
	<CommandSeparator {...props} />
);

export type ModelSelectorLogoProps = Omit<
	ComponentProps<"img">,
	"src" | "alt"
> & {
	/** A models.dev provider id (`anthropic`, `openai`, `google`, …); any string works. */
	provider:
		| "anthropic"
		| "openai"
		| "google"
		| "xai"
		| "mistral"
		| "groq"
		| "deepseek"
		| "perplexity"
		| "meta"
		| (string & {});
};

export const ModelSelectorLogo = ({
	provider,
	className,
	...props
}: ModelSelectorLogoProps) => (
	<img
		{...props}
		alt={`${provider} logo`}
		className={cn("size-3.5 dark:invert", className)}
		height={14}
		src={`https://models.dev/logos/${provider}.svg`}
		width={14}
	/>
);

export type ModelSelectorLogoGroupProps = ComponentProps<"div">;

/** Overlapping logos, each on a solid --card disc with a 1px --border ring. */
export const ModelSelectorLogoGroup = ({
	className,
	...props
}: ModelSelectorLogoGroupProps) => (
	<div
		className={cn(
			"flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:border [&>img]:border-border [&>img]:bg-card [&>img]:p-px",
			className,
		)}
		{...props}
	/>
);

export type ModelSelectorNameProps = ComponentProps<"span">;

export const ModelSelectorName = ({
	className,
	...props
}: ModelSelectorNameProps) => (
	<span className={cn("flex-1 truncate text-left", className)} {...props} />
);
