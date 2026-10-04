"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { useCallback } from "react";
import { Button } from "@/registry/edmi/ui/button";
import { ScrollArea, ScrollBar } from "@/registry/edmi/ui/scroll-area";

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

/** Row of suggestions; scrolls horizontally with a fade at both edges on narrow screens. */
export const Suggestions = ({
	className,
	children,
	...props
}: SuggestionsProps) => (
	<ScrollArea
		data-slot="ai-suggestions"
		className="w-full overflow-x-auto whitespace-nowrap"
		{...props}
	>
		<div className={cn("flex w-max flex-nowrap items-center gap-2", className)}>
			{children}
		</div>
		<ScrollBar className="hidden" orientation="horizontal" />
	</ScrollArea>
);

type ButtonVariant = NonNullable<ComponentProps<typeof Button>["variant"]>;

export type SuggestionProps = Omit<
	ComponentProps<typeof Button>,
	"onClick" | "variant"
> & {
	/** legacy prop, forwarded as `elevation="raised"` (the AI pack migration renames it) */
	raised?: boolean;
	suggestion: string;
	onClick?: (suggestion: string) => void;
	/**
	 * `chip` (default): pill. `card` ✦: a larger tile with a lead-in line, for the home state
	 * (`children` = description).
	 */
	variant?: "chip" | "card" | ButtonVariant;
};

export const Suggestion = ({
	suggestion,
	onClick,
	className,
	variant = "chip",
	size = "sm",
	raised = false,
	children,
	...props
}: SuggestionProps) => {
	const handleClick = useCallback(() => {
		onClick?.(suggestion);
	}, [onClick, suggestion]);

	if (variant === "card") {
		return (
			<Button
				data-slot="ai-suggestion"
				data-variant="card"
				className={cn(
					"h-auto min-w-44 flex-col items-start gap-1 rounded-xl px-4 py-3 text-left whitespace-normal",
					className,
				)}
				onClick={handleClick}
				elevation={raised ? "raised" : undefined}
				type="button"
				variant="outline"
				{...props}
			>
				<span className="text-[13.5px] font-medium">{suggestion}</span>
				{children && (
					<span className="text-xs font-normal text-muted-foreground">
						{children}
					</span>
				)}
			</Button>
		);
	}

	return (
		<Button
			data-slot="ai-suggestion"
			data-variant="chip"
			className={cn("rounded-full px-4", className)}
			onClick={handleClick}
			elevation={raised ? "raised" : undefined}
			size={size}
			type="button"
			variant={variant === "chip" ? "outline" : variant}
			{...props}
		>
			{children || suggestion}
		</Button>
	);
};
