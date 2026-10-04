import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Card } from "@/registry/edmi/ui/card";

type KanbanColumnProps = Omit<React.ComponentProps<"div">, "title"> & {
	title: React.ReactNode;
	/** Right header meta, e.g. "1/3". */
	meta?: React.ReactNode;
};

/** Sunken stage column holding `KanbanItem` cards. */
function KanbanColumn({
	className,
	title,
	meta,
	children,
	...props
}: KanbanColumnProps) {
	return (
		<div
			data-slot="kanban-column"
			className={cn(
				"flex w-[282px] flex-col gap-2 rounded-lg border border-sk-bd bg-sk-bg p-2.5 shadow-sunken",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between px-1 pt-0.5 pb-1 font-mono text-[11px] text-muted-foreground">
				<span>{title}</span>
				{meta ? <span>{meta}</span> : null}
			</div>
			{children}
		</div>
	);
}

type KanbanItemProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	title: React.ReactNode;
	description?: React.ReactNode;
	/** Leading icon element (an `IconPlaceholder`). */
	icon?: React.ReactNode;
	/** Trailing element; defaults to an arrow up-right. */
	action?: React.ReactNode;
	/** Dims the card (not yet reachable). */
	disabled?: boolean;
};

function KanbanItem({
	className,
	title,
	description,
	icon,
	action,
	disabled,
	...props
}: KanbanItemProps) {
	return (
		<Card
			data-slot="kanban-item"
			data-disabled={disabled ? "" : undefined}
			className={cn(
				"flex-row items-center gap-2.5 px-3 py-2.5 data-[disabled]:opacity-60",
				className,
			)}
			{...props}
		>
			{icon ? (
				<span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-muted [&_svg]:size-3.5">
					{icon}
				</span>
			) : null}
			<div className="min-w-0 flex-1">
				<div className="text-[13px] font-medium">{title}</div>
				{description ? (
					<div className="text-[11px] text-muted-foreground">{description}</div>
				) : null}
			</div>
			<span className="text-muted-foreground">
				{action ?? (
					<IconPlaceholder
						lucide="ArrowUpRightIcon"
						tabler="IconArrowUpRight"
						hugeicons="ArrowUpRightIcon"
						phosphor="ArrowUpRightIcon"
						remixicon="RiArrowRightUpLine"
						className="size-[13px]"
					/>
				)}
			</span>
		</Card>
	);
}

export { KanbanColumn, KanbanItem };
