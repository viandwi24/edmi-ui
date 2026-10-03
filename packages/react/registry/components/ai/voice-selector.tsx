"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";
import { Button } from "@/registry/edmi/ui/button";
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
import { Spinner } from "@/registry/edmi/ui/spinner";

// Built on ui/command + ui/dialog (DESIGN §5b). Items: ghost play button, name + muted attributes, description, check.

interface VoiceSelectorContextValue {
	value: string | undefined;
	setValue: (value: string | undefined) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const VoiceSelectorContext = createContext<VoiceSelectorContextValue | null>(
	null,
);

export const useVoiceSelector = () => {
	const context = useContext(VoiceSelectorContext);
	if (!context) {
		throw new Error(
			"VoiceSelector components must be used within VoiceSelector",
		);
	}
	return context;
};

export type VoiceSelectorProps = Omit<
	ComponentProps<typeof Dialog>,
	"onOpenChange"
> & {
	onOpenChange?: (open: boolean) => void;
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string | undefined) => void;
};

export const VoiceSelector = ({
	value: valueProp,
	defaultValue,
	onValueChange,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	children,
	...props
}: VoiceSelectorProps) => {
	const [value, setValue] = useControllableState({
		defaultProp: defaultValue,
		onChange: onValueChange,
		prop: valueProp,
	});

	const [open, setOpen] = useControllableState({
		defaultProp: defaultOpen,
		onChange: onOpenChange,
		prop: openProp,
	});

	const voiceSelectorContext = useMemo(
		() => ({ open, setOpen, setValue, value }),
		[value, setValue, open, setOpen],
	);

	return (
		<VoiceSelectorContext.Provider value={voiceSelectorContext}>
			<Dialog onOpenChange={setOpen} open={open} {...props}>
				{children}
			</Dialog>
		</VoiceSelectorContext.Provider>
	);
};

export type VoiceSelectorTriggerProps = ComponentProps<typeof DialogTrigger>;

/** Pass the visible trigger with `render`, e.g. `render={<Button variant="outline" />}`. */
export const VoiceSelectorTrigger = (props: VoiceSelectorTriggerProps) => (
	<DialogTrigger data-slot="ai-voice-selector-trigger" {...props} />
);

export type VoiceSelectorContentProps = ComponentProps<typeof DialogContent> & {
	title?: ReactNode;
};

export const VoiceSelectorContent = ({
	className,
	children,
	title = "Voice Selector",
	...props
}: VoiceSelectorContentProps) => (
	<DialogContent
		data-slot="ai-voice-selector-content"
		aria-describedby={undefined}
		showCloseButton={false}
		className={cn(
			"top-1/3 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-md",
			className,
		)}
		{...props}
	>
		<DialogTitle className="sr-only">{title}</DialogTitle>
		<Command className="rounded-none **:data-[slot=command-input-wrapper]:h-10">
			{children}
		</Command>
	</DialogContent>
);

export type VoiceSelectorDialogProps = ComponentProps<typeof CommandDialog>;

export const VoiceSelectorDialog = (props: VoiceSelectorDialogProps) => (
	<CommandDialog {...props} />
);

export type VoiceSelectorInputProps = ComponentProps<typeof CommandInput>;

export const VoiceSelectorInput = (props: VoiceSelectorInputProps) => (
	<CommandInput placeholder="Search voices..." {...props} />
);

export type VoiceSelectorListProps = ComponentProps<typeof CommandList>;

export const VoiceSelectorList = (props: VoiceSelectorListProps) => (
	<CommandList {...props} />
);

export type VoiceSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const VoiceSelectorEmpty = (props: VoiceSelectorEmptyProps) => (
	<CommandEmpty {...props} />
);

export type VoiceSelectorGroupProps = ComponentProps<typeof CommandGroup>;

export const VoiceSelectorGroup = (props: VoiceSelectorGroupProps) => (
	<CommandGroup {...props} />
);

export type VoiceSelectorItemProps = ComponentProps<typeof CommandItem>;

/**
 * A two-line row: lay out `Preview`, then a `Details` block (name + attributes, description). The item whose
 * `value` equals the selector value shows the check; selecting sets the value and closes unless `onSelect` is used.
 */
export const VoiceSelectorItem = ({
	className,
	value,
	onSelect,
	...props
}: VoiceSelectorItemProps) => {
	const { value: selected, setValue, setOpen } = useVoiceSelector();

	const handleSelect = useCallback(
		(currentValue: string) => {
			if (onSelect) {
				onSelect(currentValue);
				return;
			}
			setValue(currentValue);
			setOpen(false);
		},
		[onSelect, setValue, setOpen],
	);

	return (
		<CommandItem
			className={cn("h-auto items-start p-2 whitespace-normal", className)}
			data-checked={value !== undefined && value === selected}
			onSelect={handleSelect}
			value={value}
			{...props}
		/>
	);
};

export type VoiceSelectorShortcutProps = ComponentProps<typeof CommandShortcut>;

export const VoiceSelectorShortcut = (props: VoiceSelectorShortcutProps) => (
	<CommandShortcut {...props} />
);

export type VoiceSelectorSeparatorProps = ComponentProps<
	typeof CommandSeparator
>;

export const VoiceSelectorSeparator = (props: VoiceSelectorSeparatorProps) => (
	<CommandSeparator {...props} />
);

export type VoiceSelectorDetailsProps = ComponentProps<"div">;

/** ✦ Column that grows between the preview button and the check. */
export const VoiceSelectorDetails = ({
	className,
	...props
}: VoiceSelectorDetailsProps) => (
	<div
		className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
		data-slot="ai-voice-selector-details"
		{...props}
	/>
);

export type VoiceSelectorHeaderProps = ComponentProps<"div">;

/** ✦ Row for the name followed by the attributes. */
export const VoiceSelectorHeader = ({
	className,
	...props
}: VoiceSelectorHeaderProps) => (
	<div
		className={cn("flex items-center gap-1.5", className)}
		data-slot="ai-voice-selector-header"
		{...props}
	/>
);

export type VoiceSelectorGenderProps = ComponentProps<"span"> & {
	value?:
		| "male"
		| "female"
		| "transgender"
		| "androgyne"
		| "non-binary"
		| "intersex"
		| (string & {});
};

/** Renders `children`, falling back to the value as text. */
export const VoiceSelectorGender = ({
	className,
	value,
	children,
	...props
}: VoiceSelectorGenderProps) => (
	<span className={cn("text-xs text-muted-foreground", className)} {...props}>
		{children ?? value}
	</span>
);

export type VoiceSelectorAccentProps = ComponentProps<"span"> & {
	/** `american`, `british`, `indian`, ...; any string works. */
	value?: string;
};

/** Renders `children`, falling back to the value as text. */
export const VoiceSelectorAccent = ({
	className,
	value,
	children,
	...props
}: VoiceSelectorAccentProps) => (
	<span className={cn("text-xs text-muted-foreground", className)} {...props}>
		{children ?? value}
	</span>
);

export type VoiceSelectorAgeProps = ComponentProps<"span">;

export const VoiceSelectorAge = ({
	className,
	...props
}: VoiceSelectorAgeProps) => (
	<span
		className={cn("text-xs text-muted-foreground tabular-nums", className)}
		{...props}
	/>
);

export type VoiceSelectorNameProps = ComponentProps<"span">;

export const VoiceSelectorName = ({
	className,
	...props
}: VoiceSelectorNameProps) => (
	<span
		className={cn("truncate text-left font-medium", className)}
		{...props}
	/>
);

export type VoiceSelectorDescriptionProps = ComponentProps<"span">;

export const VoiceSelectorDescription = ({
	className,
	...props
}: VoiceSelectorDescriptionProps) => (
	<span
		className={cn("text-[12.5px] text-muted-foreground", className)}
		{...props}
	/>
);

export type VoiceSelectorAttributesProps = ComponentProps<"div">;

export const VoiceSelectorAttributes = ({
	className,
	children,
	...props
}: VoiceSelectorAttributesProps) => (
	<div className={cn("flex items-center gap-1 text-xs", className)} {...props}>
		{children}
	</div>
);

export type VoiceSelectorBulletProps = ComponentProps<"span">;

export const VoiceSelectorBullet = ({
	className,
	...props
}: VoiceSelectorBulletProps) => (
	<span
		aria-hidden="true"
		className={cn("select-none text-muted-foreground-2", className)}
		{...props}
	>
		&middot;
	</span>
);

export type VoiceSelectorPreviewProps = Omit<
	ComponentProps<"button">,
	"children"
> & {
	playing?: boolean;
	loading?: boolean;
	onPlay?: () => void;
};

export const VoiceSelectorPreview = ({
	className,
	playing,
	loading,
	onPlay,
	onClick,
	...props
}: VoiceSelectorPreviewProps) => {
	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			onClick?.(event);
			onPlay?.();
		},
		[onClick, onPlay],
	);

	let icon = (
		<IconPlaceholder
			lucide="PlayIcon"
			tabler="IconPlayerPlay"
			hugeicons="PlayIcon"
			phosphor="PlayIcon"
			remixicon="RiPlayLine"
			className="size-3 fill-current"
		/>
	);

	if (loading) {
		icon = <Spinner className="size-3" />;
	} else if (playing) {
		icon = (
			<IconPlaceholder
				lucide="PauseIcon"
				tabler="IconPlayerPause"
				hugeicons="PauseIcon"
				phosphor="PauseIcon"
				remixicon="RiPauseLine"
				className="size-3 fill-current"
			/>
		);
	}

	return (
		<Button
			aria-label={playing ? "Pause preview" : "Play preview"}
			className={cn("mt-px", className)}
			data-slot="ai-voice-selector-preview"
			disabled={loading}
			onClick={handleClick}
			size="icon-xs"
			type="button"
			variant="ghost"
			{...props}
		>
			{icon}
		</Button>
	);
};
