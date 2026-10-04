"use client";

import { cn } from "cn";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { type Elevation, useElevation } from "@/components/ui/elevation";
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";

// ✦ `elevation` on Pagination flows to the active PaginationLink (only the active link rises).
const PaginationContext = React.createContext<{ raised: boolean }>({
	raised: false,
});

function Pagination({
	className,
	elevation,
	...props
}: React.ComponentProps<"nav"> & {
	/** ✦ depth: raised +1 / floating +2 make the active page link rise. */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "control");
	return (
		<PaginationContext.Provider
			value={{ raised: level === "raised" || level === "floating" }}
		>
			<nav
				aria-label="pagination"
				data-slot="pagination"
				className={cn("mx-auto flex w-full justify-center", className)}
				{...props}
			/>
		</PaginationContext.Provider>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex items-center gap-0.5", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
	/** ✦ depth of this link (the active link rises); defaults to the Pagination level. */
	elevation?: Elevation;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	elevation,
	size = "icon",
	...props
}: PaginationLinkProps) {
	const context = React.useContext(PaginationContext);
	const own =
		elevation && elevation !== "auto"
			? elevation === "raised" || elevation === "floating"
			: undefined;
	return (
		<Button
			variant={isActive ? "outline" : "ghost"}
			size={size}
			className={cn(
				isActive && "border-input bg-card font-semibold",
				isActive &&
					(own ?? context.raised) &&
					"border-transparent shadow-btn-raised-neutral",
				className,
			)}
			nativeButton={false}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}

function PaginationPrevious({
	className,
	text = "Previous",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("pl-1.5!", className)}
			{...props}
		>
			<CaretLeftIcon data-icon="inline-start" className="rtl:rotate-180" />
			<span className="hidden sm:block">{text}</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	text = "Next",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("pr-1.5!", className)}
			{...props}
		>
			<span className="hidden sm:block">{text}</span>
			<CaretRightIcon data-icon="inline-end" className="rtl:rotate-180" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<DotsThreeIcon
			/>
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
