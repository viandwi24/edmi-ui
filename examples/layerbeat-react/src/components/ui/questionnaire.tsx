"use client";

import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import { cn } from "cn";
import * as React from "react";
import { type Button, buttonVariants } from "@/components/ui/button";
import { type Elevation, useElevation } from "@/components/ui/elevation";
import { CheckIcon } from "@phosphor-icons/react";

// ✦ choice-card depth (v4); a checked option keeps its ring.
const choiceElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};
const inputElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

// ✦ `elevation` on the root flows to every choice / input.
const QuestionnaireContext = React.createContext<{
	elevation: Elevation | undefined;
}>({ elevation: undefined });

function Questionnaire({
	className,
	elevation,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root> & {
	/** ✦ depth of every option and the text input: sunken -1, flat 0, raised +1, floating +2. */
	elevation?: Elevation;
}) {
	return (
		<QuestionnaireContext.Provider value={{ elevation }}>
			<QuestionnairePrimitive.Root
				data-slot="questionnaire"
				className={cn("flex w-full min-w-0 flex-col gap-4", className)}
				{...props}
			/>
		</QuestionnaireContext.Provider>
	);
}

function QuestionnaireProgress({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
	return (
		<QuestionnairePrimitive.Progress
			data-slot="questionnaire-progress"
			className={cn(
				"min-h-[1lh] w-fit min-w-[14ch] font-mono text-[11.5px] text-muted-foreground tabular-nums",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireItem({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
	return (
		<QuestionnairePrimitive.Item
			data-slot="questionnaire-item"
			className={cn(
				"flex min-w-0 flex-col gap-4 border-0 p-0 outline-none [&[hidden]]:hidden",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireTitle({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
	return (
		<QuestionnairePrimitive.Title
			data-slot="questionnaire-title"
			className={cn(
				"text-[17px] leading-snug font-semibold tracking-[-0.2px] text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireDescription({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
	return (
		<QuestionnairePrimitive.Description
			data-slot="questionnaire-description"
			className={cn("text-sm text-pretty text-muted-foreground", className)}
			{...props}
		/>
	);
}

function QuestionnaireChoices({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
	return (
		<QuestionnairePrimitive.Choices
			data-slot="questionnaire-choices"
			className={cn(
				"group/questionnaire-choices grid min-w-0 gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireChoice({
	children,
	className,
	elevation,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice> & {
	/** ✦ depth of this option; defaults to the Questionnaire level. */
	elevation?: Elevation;
}) {
	const context = React.useContext(QuestionnaireContext);
	const level = useElevation(
		elevation && elevation !== "auto" ? elevation : context.elevation,
		"control",
	);
	return (
		<QuestionnairePrimitive.Choice
			data-slot="questionnaire-choice"
			className={cn(
				"group/questionnaire-choice relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2 text-start text-sm transition-colors outline-none select-none hover:bg-accent has-[>input:focus-visible]:outline-2 has-[>input:focus-visible]:outline-offset-2 has-[>input:focus-visible]:outline-ring data-[invalid]:border-destructive data-[checked]:border-ring data-[checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] data-[checked]:shadow-[0_0_0_1px_var(--ring)]",
				choiceElevation[level],
				"data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<QuestionnairePrimitive.ChoiceInput
				data-slot="questionnaire-choice-input"
				className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
			/>
			<QuestionnairePrimitive.ChoiceShortcut
				data-slot="questionnaire-choice-shortcut"
				className="pointer-events-none hidden size-5 shrink-0 items-center justify-center rounded-md border border-input bg-card font-mono text-[10.5px] leading-none font-medium text-muted-foreground group-data-[shortcut]/questionnaire-choice:inline-flex group-data-[checked]/questionnaire-choice:border-brand-edge group-data-[checked]/questionnaire-choice:bg-brand group-data-[checked]/questionnaire-choice:text-brand-foreground"
			/>
			<QuestionnairePrimitive.ChoiceLabel
				data-slot="questionnaire-choice-label"
				className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-snug"
			>
				{children}
			</QuestionnairePrimitive.ChoiceLabel>
			<span
				aria-hidden="true"
				data-slot="questionnaire-choice-indicator"
				className="pointer-events-none relative flex size-4 shrink-0 items-center justify-center text-foreground group-data-[type=checkbox]/questionnaire-choice:size-[18px] group-data-[type=checkbox]/questionnaire-choice:rounded-[5px] group-data-[type=checkbox]/questionnaire-choice:border group-data-[type=checkbox]/questionnaire-choice:border-input group-data-[type=checkbox]/questionnaire-choice:bg-card group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:border-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:bg-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:text-primary-foreground"
			>
				<CheckIcon data-slot="questionnaire-choice-indicator-check" className="hidden size-3.5 group-data-[checked]/questionnaire-choice:block" />
			</span>
		</QuestionnairePrimitive.Choice>
	);
}

function QuestionnaireChoiceDescription({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="questionnaire-choice-description"
			className={cn("text-muted-foreground", className)}
			{...props}
		/>
	);
}

function QuestionnaireInput({
	className,
	elevation,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input> & {
	/** ✦ depth of the text input; defaults to the Questionnaire level. */
	elevation?: Elevation;
}) {
	const context = React.useContext(QuestionnaireContext);
	const level = useElevation(
		elevation && elevation !== "auto" ? elevation : context.elevation,
		"field",
	);
	return (
		<div
			data-slot="questionnaire-input-wrapper"
			className="group/questionnaire-input relative w-full min-w-0"
		>
			<QuestionnairePrimitive.Input
				data-slot="questionnaire-input"
				className={cn(
					"h-12 w-full min-w-0 rounded-xl border border-border bg-card px-3.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:shadow-[0_0_0_1px_var(--ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
					"placeholder:text-muted-foreground",
					inputElevation[level],
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function QuestionnaireError({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
	return (
		<QuestionnairePrimitive.Error
			data-slot="questionnaire-error"
			className={cn("text-sm text-destructive-text", className)}
			{...props}
		/>
	);
}

function QuestionnaireActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="questionnaire-actions"
			className={cn(
				"grid min-h-9 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnairePrevious({
	children,
	className,
	size = "default",
	variant = "ghost",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Previous
			data-slot="questionnaire-previous"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"col-start-1 row-start-1 justify-self-start [&[hidden]]:hidden",
				className,
			)}
			{...props}
		>
			{children ?? "Previous"}
		</QuestionnairePrimitive.Previous>
	);
}

function QuestionnaireSkip({
	children,
	className,
	size = "default",
	variant = "outline",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Skip
			data-slot="questionnaire-skip"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"col-start-2 row-start-1 justify-self-end [&[hidden]]:hidden",
				className,
			)}
			{...props}
		>
			{children ?? "Skip"}
		</QuestionnairePrimitive.Skip>
	);
}

function QuestionnaireNext({
	children,
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Next
			data-slot="questionnaire-next"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"col-start-3 row-start-1 justify-self-end [&[hidden]]:hidden",
				className,
			)}
			{...props}
		>
			{children ?? "Next"}
		</QuestionnairePrimitive.Next>
	);
}

function QuestionnaireSubmit({
	children,
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Submit
			data-slot="questionnaire-submit"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"col-start-3 row-start-1 justify-self-end [&[hidden]]:hidden",
				className,
			)}
			{...props}
		>
			{children ?? "Submit"}
		</QuestionnairePrimitive.Submit>
	);
}

export {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoiceDescription,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireError,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
};
