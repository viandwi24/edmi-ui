"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { ToolUIPart } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Alert } from "@/registry/edmi/ui/alert";
import { Button } from "@/registry/edmi/ui/button";

type ToolUIPartApproval =
	| {
			id: string;
			approved?: never;
			reason?: never;
	  }
	| {
			id: string;
			approved: boolean;
			reason?: string;
	  }
	| undefined;

interface ConfirmationContextValue {
	approval: ToolUIPartApproval;
	state: ToolUIPart["state"];
	raised: boolean;
}

const ConfirmationContext = createContext<ConfirmationContextValue | null>(
	null,
);

const useConfirmation = () => {
	const context = useContext(ConfirmationContext);

	if (!context) {
		throw new Error("Confirmation components must be used within Confirmation");
	}

	return context;
};

export type ConfirmationProps = Omit<
	ComponentProps<typeof Alert>,
	"variant"
> & {
	approval?: ToolUIPartApproval;
	state: ToolUIPart["state"];
	/** ✦ raised action buttons (the buttons inherit it, each can override). */
	raised?: boolean;
	/** Leading icon of the request. Defaults to a shield. */
	icon?: ReactNode;
};

/**
 * Request = warning alert with Approve / Reject. Once answered it collapses to a plain status line
 * (green check for approved, muted cross for rejected), as on board AI 02.
 */
export const Confirmation = ({
	className,
	approval,
	state,
	raised = false,
	icon,
	children,
	...props
}: ConfirmationProps) => {
	const contextValue = useMemo(
		() => ({ approval, raised, state }),
		[approval, raised, state],
	);

	if (!approval || state === "input-streaming" || state === "input-available") {
		return null;
	}

	if (state !== "approval-requested") {
		return (
			<ConfirmationContext.Provider value={contextValue}>
				<div
					data-slot="ai-confirmation"
					data-state={state}
					className={cn("flex items-center gap-2 text-[13.5px]", className)}
					{...(props as ComponentProps<"div">)}
				>
					{children}
				</div>
			</ConfirmationContext.Provider>
		);
	}

	return (
		<ConfirmationContext.Provider value={contextValue}>
			<Alert
				data-slot="ai-confirmation"
				data-state={state}
				variant="warning"
				className={className}
				{...props}
			>
				{icon ?? (
					<IconPlaceholder
						lucide="ShieldIcon"
						tabler="IconShield"
						hugeicons="ShieldIcon"
						phosphor="ShieldIcon"
						remixicon="RiShieldLine"
					/>
				)}
				{children}
			</Alert>
		</ConfirmationContext.Provider>
	);
};

export type ConfirmationTitleProps = ComponentProps<"div">;

export const ConfirmationTitle = ({
	className,
	...props
}: ConfirmationTitleProps) => {
	const { state } = useConfirmation();
	return (
		<div
			data-slot="ai-confirmation-title"
			className={cn(
				state === "approval-requested"
					? "col-start-2 font-medium text-foreground"
					: "flex items-center gap-2",
				className,
			)}
			{...props}
		/>
	);
};

export type ConfirmationDescriptionProps = ComponentProps<"div">;

/** ✦ Muted second line under the request title (only while the request is open). */
export const ConfirmationDescription = ({
	className,
	...props
}: ConfirmationDescriptionProps) => {
	const { state } = useConfirmation();
	if (state !== "approval-requested") {
		return null;
	}
	return (
		<div
			data-slot="ai-confirmation-description"
			className={cn("col-start-2 text-[13px] text-foreground-2", className)}
			{...props}
		/>
	);
};

export interface ConfirmationRequestProps {
	children?: ReactNode;
}

export const ConfirmationRequest = ({ children }: ConfirmationRequestProps) => {
	const { state } = useConfirmation();

	// Only show when approval is requested
	if (state !== "approval-requested") {
		return null;
	}

	return children;
};

export interface ConfirmationAcceptedProps {
	children?: ReactNode;
}

export const ConfirmationAccepted = ({
	children,
}: ConfirmationAcceptedProps) => {
	const { approval, state } = useConfirmation();

	// Only show when approved and in response states
	if (
		!approval?.approved ||
		(state !== "approval-responded" &&
			state !== "output-denied" &&
			state !== "output-available")
	) {
		return null;
	}

	return (
		<span className="inline-flex items-center gap-2 text-success-text">
			{children}
		</span>
	);
};

export interface ConfirmationRejectedProps {
	children?: ReactNode;
}

export const ConfirmationRejected = ({
	children,
}: ConfirmationRejectedProps) => {
	const { approval, state } = useConfirmation();

	// Only show when rejected and in response states
	if (
		approval?.approved !== false ||
		(state !== "approval-responded" &&
			state !== "output-denied" &&
			state !== "output-available")
	) {
		return null;
	}

	return (
		<span className="inline-flex items-center gap-2 text-muted-foreground">
			{children}
		</span>
	);
};

export type ConfirmationActionsProps = ComponentProps<"div">;

export const ConfirmationActions = ({
	className,
	...props
}: ConfirmationActionsProps) => {
	const { state } = useConfirmation();

	// Only show when approval is requested
	if (state !== "approval-requested") {
		return null;
	}

	return (
		<div
			data-slot="ai-confirmation-actions"
			className={cn("col-start-2 mt-2.5 flex items-center gap-2", className)}
			{...props}
		/>
	);
};

export type ConfirmationActionProps = ComponentProps<typeof Button>;

export const ConfirmationAction = ({
	raised,
	size = "sm",
	...props
}: ConfirmationActionProps) => {
	const ctx = useContext(ConfirmationContext);
	return (
		<Button
			data-slot="ai-confirmation-action"
			raised={raised ?? ctx?.raised ?? false}
			size={size}
			type="button"
			{...props}
		/>
	);
};
