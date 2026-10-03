"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

function Menubar({
	className,
	raised = false,
	...props
}: MenubarPrimitive.Props & {
	/** ✦ one-step 3D look for the bar (`border-b-lip` + 2px lip). */
	raised?: boolean;
}) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			className={cn(
				"flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-[3px]",
				raised && "border-b-lip shadow-[0_2px_0_var(--lip)]",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
	return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
	return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
	return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
	return (
		<DropdownMenuTrigger
			data-slot="menubar-trigger"
			className={cn(
				"flex h-[30px] items-center rounded-[7px] px-3 text-[13.5px] font-medium outline-none select-none hover:bg-accent data-[popup-open]:bg-accent aria-expanded:bg-accent",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot="menubar-content"
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"w-auto min-w-36 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
	return (
		<DropdownMenuItem
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/menu-item relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:text-destructive-text data-[variant=destructive]:data-[highlighted]:bg-destructive-soft data-[variant=destructive]:data-[highlighted]:text-destructive-text data-[variant=destructive]:*:[svg]:text-destructive-text",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: MenuPrimitive.CheckboxItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			data-inset={inset}
			className={cn(
				"relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground pl-8",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
				<MenuPrimitive.CheckboxItemIndicator>
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
					/>
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
	return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarRadioItem({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menubar-radio-item"
			data-inset={inset}
			className={cn(
				"relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground pl-8",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
				<MenuPrimitive.RadioItemIndicator>
					<span className="block size-1.5 rounded-full bg-current" />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuLabel
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground data-[inset]:pl-8",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
	return (
		<DropdownMenuSeparator
			data-slot="menubar-separator"
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
	return (
		<DropdownMenuShortcut
			data-slot="menubar-shortcut"
			className={cn(
				"ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
	return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuSubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
	return (
		<DropdownMenuSubContent
			data-slot="menubar-sub-content"
			className={cn(
				"w-auto min-w-36 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
};
