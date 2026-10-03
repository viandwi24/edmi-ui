import { cn } from "cn";
import type * as React from "react";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn(
					"w-full caption-bottom border-collapse text-[13.5px]",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"border-t bg-muted font-semibold [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"border-b border-border transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-brand/7",
				className,
			)}
			{...props}
		/>
	);
}

type NumericProps = {
	/** ✦ Right-aligned, mono, tabular numbers (DESIGN §4 rule 10). */
	numeric?: boolean;
};

function TableHead({
	className,
	numeric,
	...props
}: React.ComponentProps<"th"> & NumericProps) {
	return (
		<th
			data-slot="table-head"
			data-numeric={numeric ? "" : undefined}
			className={cn(
				"px-3 py-2.5 text-left align-middle text-[12.5px] font-medium whitespace-nowrap text-muted-foreground data-[numeric]:text-right [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({
	className,
	numeric,
	trend,
	...props
}: React.ComponentProps<"td"> &
	NumericProps & {
		/** ✦ Colours a numeric value: up = brand text, down = destructive text. */
		trend?: "up" | "down";
	}) {
	return (
		<td
			data-slot="table-cell"
			data-numeric={numeric ? "" : undefined}
			data-trend={trend}
			className={cn(
				"p-3 align-middle whitespace-nowrap data-[numeric]:text-right data-[numeric]:font-mono data-[numeric]:tabular-nums data-[trend=down]:text-destructive-text data-[trend=up]:text-success-text [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn(
				"border-t border-border p-2.5 text-center text-[13px] text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
