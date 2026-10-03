"use client";

import type { ChatStatus } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	PromptInput,
	PromptInputBody,
	PromptInputSubmit,
	PromptInputTextarea,
} from "@/registry/edmi/components/ai/prompt-input";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

export type ChatComposerOption = { id: string; label: string };

export type ChatComposerProps = Omit<
	ComponentProps<typeof PromptInput>,
	"children"
> & {
	placeholder?: string;
	status?: ChatStatus;
	onStop?: () => void;
	/** Plus button in the footer; hide the button by omitting it. */
	onAttach?: () => void;
	/** Mic button in the footer (speech input). Omit to hide it. */
	onSpeech?: () => void;
	/** Small print centered in the footer. */
	disclaimer?: ReactNode;
	models?: ChatComposerOption[];
	/** Controlled model id; use `defaultModel` for uncontrolled. */
	model?: string;
	defaultModel?: string;
	onModelChange?: (id: string) => void;
	efforts?: ChatComposerOption[];
	effort?: string;
	defaultEffort?: string;
	onEffortChange?: (id: string) => void;
	modes?: ChatComposerOption[];
	mode?: string;
	defaultMode?: string;
	onModeChange?: (id: string) => void;
};

const labelOf = (options: ChatComposerOption[] | undefined, id?: string) =>
	options?.find((o) => o.id === id)?.label;

/**
 * Prompt input with the quiet footer outside the field: attach, speech, disclaimer, model + effort, mode.
 */
export const ChatComposer = ({
	placeholder = "Reply",
	status,
	onStop,
	onAttach,
	onSpeech,
	disclaimer,
	models,
	model,
	defaultModel,
	onModelChange,
	efforts,
	effort,
	defaultEffort,
	onEffortChange,
	modes,
	mode,
	defaultMode,
	onModeChange,
	className,
	...props
}: ChatComposerProps) => {
	const [modelState, setModel] = useState(defaultModel ?? models?.[0]?.id);
	const [effortState, setEffort] = useState(defaultEffort ?? efforts?.[0]?.id);
	const [modeState, setMode] = useState(defaultMode ?? modes?.[0]?.id);
	const modelId = model ?? modelState;
	const effortId = effort ?? effortState;
	const modeId = mode ?? modeState;
	const ready = status === undefined || status === "ready";

	return (
		<div
			data-slot="ai-chat-composer"
			className={cn("flex w-full flex-col", className)}
		>
			<PromptInput {...props}>
				<PromptInputBody>
					<div className="flex w-full items-center pr-2">
						<PromptInputTextarea
							placeholder={placeholder}
							rows={1}
							className="min-h-12 px-4 py-3 text-[14.5px]"
						/>
						<PromptInputSubmit
							status={status}
							onStop={onStop}
							variant={ready ? "ghost" : undefined}
							className={ready ? "text-muted-foreground" : undefined}
						>
							{ready ? <span aria-hidden="true">↵</span> : undefined}
						</PromptInputSubmit>
					</div>
				</PromptInputBody>
			</PromptInput>
			<div
				data-slot="ai-chat-composer-footer"
				className="flex items-center gap-0.5 px-1.5 pt-2 text-xs"
			>
				{onAttach && (
					<Button
						aria-label="Attach"
						onClick={onAttach}
						size="icon-xs"
						type="button"
						variant="ghost"
					>
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="Add01Icon"
							phosphor="PlusIcon"
							remixicon="RiAddLine"
							className="size-4"
						/>
					</Button>
				)}
				{onSpeech && (
					<Button
						aria-label="Speech input"
						onClick={onSpeech}
						size="xs"
						type="button"
						variant="ghost"
						className="gap-0.5"
					>
						<IconPlaceholder
							lucide="MicIcon"
							tabler="IconMicrophone"
							hugeicons="VoiceIcon"
							phosphor="MicrophoneIcon"
							remixicon="RiMicLine"
							className="size-4"
						/>
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							className="size-3"
						/>
					</Button>
				)}
				<span className="min-w-0 flex-1 truncate text-center text-muted-foreground">
					{disclaimer}
				</span>
				{models && models.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									size="xs"
									type="button"
									variant="ghost"
									className="gap-[5px] font-medium"
								/>
							}
						>
							{labelOf(models, modelId)}
							{efforts && (
								<span className="font-normal text-muted-foreground">
									{labelOf(efforts, effortId)}
								</span>
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" side="top">
							<DropdownMenuGroup>
								<DropdownMenuLabel>Model</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={modelId}
									onValueChange={(v) => {
										setModel(v as string);
										onModelChange?.(v as string);
									}}
								>
									{models.map((m) => (
										<DropdownMenuRadioItem key={m.id} value={m.id}>
											{m.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuGroup>
							{efforts && efforts.length > 0 && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuLabel>Effort</DropdownMenuLabel>
										<DropdownMenuRadioGroup
											value={effortId}
											onValueChange={(v) => {
												setEffort(v as string);
												onEffortChange?.(v as string);
											}}
										>
											{efforts.map((e) => (
												<DropdownMenuRadioItem key={e.id} value={e.id}>
													{e.label}
												</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuGroup>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				{modes && modes.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									size="xs"
									type="button"
									variant="ghost"
									className="text-muted-foreground"
								/>
							}
						>
							{labelOf(modes, modeId)}
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" side="top">
							<DropdownMenuGroup>
								<DropdownMenuLabel>Mode</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={modeId}
									onValueChange={(v) => {
										setMode(v as string);
										onModeChange?.(v as string);
									}}
								>
									{modes.map((m) => (
										<DropdownMenuRadioItem key={m.id} value={m.id}>
											{m.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};
