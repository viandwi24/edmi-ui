import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/edmi/ui/avatar";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/registry/edmi/ui/item";

function FeedPost({ className, ...props }: React.ComponentProps<typeof Card>) {
	return (
		<Card
			data-slot="feed-post"
			className={cn("gap-0 px-[18px] py-[18px]", className)}
			{...props}
		/>
	);
}

type FeedPostHeaderProps = Omit<React.ComponentProps<"div">, "children"> & {
	name: string;
	handle?: string;
	time?: string;
	/** Image URL; falls back to `initials`. */
	avatarSrc?: string;
	initials?: string;
	/** Right slot. Defaults to a ghost "more" icon button. */
	actions?: React.ReactNode;
};

function FeedPostHeader({
	className,
	name,
	handle,
	time,
	avatarSrc,
	initials,
	actions,
	...props
}: FeedPostHeaderProps) {
	return (
		<div
			data-slot="feed-post-header"
			className={cn("flex items-center gap-2.5", className)}
			{...props}
		>
			<Avatar className="size-9">
				{avatarSrc ? <AvatarImage src={avatarSrc} alt={name} /> : null}
				<AvatarFallback className="bg-linear-to-br from-info to-brand text-xs text-white">
					{initials ?? name.slice(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex-1 truncate text-sm font-semibold">
				{name}{" "}
				{handle || time ? (
					<span className="font-normal text-muted-foreground">
						{[handle, time].filter(Boolean).join(" · ")}
					</span>
				) : null}
			</div>
			{actions ?? (
				<Button variant="ghost" size="icon-sm" aria-label="More">
					<IconPlaceholder
						lucide="MoreHorizontalIcon"
						tabler="IconDots"
						hugeicons="MoreHorizontalCircle01Icon"
						phosphor="DotsThreeOutlineIcon"
						remixicon="RiMoreLine"
					/>
				</Button>
			)}
		</div>
	);
}

function FeedPostContent({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="feed-post-content"
			className={cn("mt-3 text-sm leading-[1.55]", className)}
			{...props}
		/>
	);
}

type FeedPostIndexProps = Omit<React.ComponentProps<typeof Item>, "title"> & {
	title: React.ReactNode;
	description?: React.ReactNode;
	/** Leading icon element (an `IconPlaceholder`). */
	icon?: React.ReactNode;
	/** Trailing slot, e.g. a "Join" button. */
	action?: React.ReactNode;
};

/** Attached index: an outline Item (media icon, title, mono description, action). */
function FeedPostIndex({
	className,
	title,
	description,
	icon,
	action,
	...props
}: FeedPostIndexProps) {
	return (
		<Item
			data-slot="feed-post-index"
			variant="outline"
			size="sm"
			className={cn("mt-3", className)}
			{...props}
		>
			{icon ? <ItemMedia variant="icon">{icon}</ItemMedia> : null}
			<ItemContent>
				<ItemTitle>{title}</ItemTitle>
				{description ? (
					<ItemDescription className="font-mono text-[11.5px]">
						{description}
					</ItemDescription>
				) : null}
			</ItemContent>
			{action ? <ItemActions>{action}</ItemActions> : null}
		</Item>
	);
}

function FeedPostFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="feed-post-footer"
			className={cn(
				"mt-3 flex items-center gap-[18px] text-[13px] text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function FeedPostStat({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="feed-post-stat"
			className={cn(
				"inline-flex items-center gap-1.5 [&_svg]:size-[15px]",
				className,
			)}
			{...props}
		/>
	);
}

export {
	FeedPost,
	FeedPostContent,
	FeedPostFooter,
	FeedPostHeader,
	FeedPostIndex,
	FeedPostStat,
};
