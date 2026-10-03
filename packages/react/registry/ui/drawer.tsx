import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "cn";
import type * as React from "react";

function Drawer({
	swipeDirection = "down",
	...props
}: DrawerPrimitive.Root.Props) {
	return (
		<DrawerPrimitive.Root
			data-slot="drawer"
			swipeDirection={swipeDirection}
			{...props}
		/>
	);
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
	className,
	...props
}: DrawerPrimitive.Backdrop.Props) {
	return (
		<DrawerPrimitive.Backdrop
			data-slot="drawer-overlay"
			className={cn(
				"fixed inset-0 z-50 min-h-dvh bg-overlay opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[swiping]:duration-0",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	showHandle,
	...props
}: DrawerPrimitive.Popup.Props & {
	/** Render a DrawerSwipeHandle at the top (default for the bottom drawer). */
	showHandle?: boolean;
}) {
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Viewport
				data-slot="drawer-viewport"
				className="fixed inset-0 z-50"
			>
				<DrawerPrimitive.Popup
					data-slot="drawer-content"
					className={cn(
						// Flat: 1px border on the edge facing the page.
						"group/drawer-content absolute flex flex-col gap-4 overflow-y-auto overscroll-contain border-border bg-popover text-sm text-popover-foreground outline-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[ending-style]:duration-200",
						// down = bottom drawer
						"data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[85dvh] data-[swipe-direction=down]:rounded-t-2xl data-[swipe-direction=down]:border-t data-[swipe-direction=down]:[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))] data-[swipe-direction=down]:data-[ending-style]:translate-y-full data-[swipe-direction=down]:data-[starting-style]:translate-y-full",
						// up = top drawer
						"data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[85dvh] data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:border-b data-[swipe-direction=up]:[transform:translateY(var(--drawer-swipe-movement-y,0px))] data-[swipe-direction=up]:data-[ending-style]:-translate-y-full data-[swipe-direction=up]:data-[starting-style]:-translate-y-full",
						// left = drawer on the left edge (dismissed by swiping left)
						"data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:max-w-sm data-[swipe-direction=left]:rounded-r-2xl data-[swipe-direction=left]:border-r data-[swipe-direction=left]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=left]:data-[ending-style]:-translate-x-full data-[swipe-direction=left]:data-[starting-style]:-translate-x-full",
						// right = drawer on the right edge
						"data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:max-w-sm data-[swipe-direction=right]:rounded-l-2xl data-[swipe-direction=right]:border-l data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=right]:data-[ending-style]:translate-x-full data-[swipe-direction=right]:data-[starting-style]:translate-x-full",
						className,
					)}
					{...props}
				>
					{showHandle && <DrawerSwipeHandle />}
					<DrawerPrimitive.Content
						data-slot="drawer-body"
						className="flex flex-1 flex-col gap-4 p-[22px] pt-0 group-data-[swipe-direction=left]/drawer-content:pt-[22px] group-data-[swipe-direction=right]/drawer-content:pt-[22px]"
					>
						{children}
					</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	);
}

/** ✦ Grabber pill shown at the edge of a bottom/top drawer. */
function DrawerSwipeHandle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-swipe-handle"
			aria-hidden="true"
			className={cn(
				"mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border-2",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"flex flex-col gap-1 text-center group-data-[swipe-direction=left]/drawer-content:text-left group-data-[swipe-direction=right]/drawer-content:text-left",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("mt-auto flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn(
				"text-base leading-snug font-semibold tracking-[-0.2px] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: DrawerPrimitive.Description.Props) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-[13px] text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerSwipeHandle,
	DrawerTitle,
	DrawerTrigger,
};
