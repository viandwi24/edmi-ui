import { cn } from "cn";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon, DotsThreeOutlineIcon } from "@phosphor-icons/react";

// ✦ `raised` on Pagination flows to the active PaginationLink.
const PaginationContext = React.createContext({ raised: false });

function Pagination({
	className,
	raised = false,
	...props
}: React.ComponentProps<"nav"> & {
	/** ✦ one-step 3D look for the active page link. */
	raised?: boolean;
}) {
	return (
		<PaginationContext.Provider value={{ raised }}>
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
	raised?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	raised,
	size = "icon",
	...props
}: PaginationLinkProps) {
	const context = React.useContext(PaginationContext);
	return (
		<Button
			variant={isActive ? "outline" : "ghost"}
			size={size}
			className={cn(
				isActive && "border-input bg-card font-semibold",
				isActive &&
					(raised ?? context.raised) &&
					"border-b-lip shadow-[0_2px_0_var(--lip)]",
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
			<DotsThreeOutlineIcon
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
