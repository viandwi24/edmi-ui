import { cn } from "cn";
import type * as React from "react";

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-group"
			className={cn("flex min-w-0 flex-col gap-2", className)}
			{...props}
		/>
	);
}

function Message({
	className,
	align = "start",
	...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
	return (
		<div
			data-slot="message"
			data-align={align}
			className={cn(
				"group/message relative flex w-full min-w-0 items-start gap-2.5 text-sm data-[align=end]:flex-row-reverse",
				className,
			)}
			{...props}
		/>
	);
}

// Avatar is top-aligned with the header line, or with the first bubble line when there is no header (DESIGN §4.8).
function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-avatar"
			className={cn(
				"mt-[5px] flex w-fit min-w-6 shrink-0 items-center justify-center self-start overflow-hidden rounded-full group-has-data-[slot=message-header]/message:mt-[3px]",
				className,
			)}
			{...props}
		/>
	);
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-content"
			className={cn(
				"flex w-full min-w-0 flex-col gap-1.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
				className,
			)}
			{...props}
		/>
	);
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-header"
			className={cn(
				"flex h-[30px] max-w-full min-w-0 items-center gap-2 px-[13px] text-xs text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
				className,
			)}
			{...props}
		/>
	);
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-footer"
			className={cn(
				"mt-0.5 flex max-w-full min-w-0 items-center gap-1 px-[13px] text-xs text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
};
