import { cn } from "cn";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

type TickerItem = {
	symbol: string;
	price: string;
	/** Signed percentage string, e.g. `+0.42%` or `−0.31%`. Sign sets the color. */
	change: string;
	/** Avatar image; falls back to the symbol's first letter. */
	image?: string;
	href?: string;
};

const isDown = (s: string) => /^[-−–]/.test(s.trim());

function TickerCell({ item }: { item: TickerItem }) {
	const content = (
		<>
			<div className="flex items-center gap-2">
				<Avatar className="size-[22px]">
					{item.image ? <AvatarImage src={item.image} alt="" /> : null}
					<AvatarFallback className="text-[9px]">
						{item.symbol.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<span className="font-mono text-xs text-muted-foreground">
					{item.symbol}
				</span>
			</div>
			<div className="mt-2.5 font-mono text-[17px]">{item.price}</div>
			<div
				className={cn(
					"mt-1 font-mono text-xs",
					isDown(item.change) ? "text-destructive-text" : "text-brand-text",
				)}
			>
				{item.change}
			</div>
		</>
	);
	const cls =
		"block min-w-[150px] flex-1 px-[18px] py-3.5 not-first:border-l not-first:border-border";
	return item.href ? (
		<a href={item.href} className={cn(cls, "hover:bg-accent/50")}>
			{content}
		</a>
	) : (
		<div className={cls}>{content}</div>
	);
}

// Horizontal row of price cells (avatar + symbol, mono price, up/down change).
function TickerStrip({
	className,
	items,
	raised = false,
	...props
}: Omit<React.ComponentProps<typeof Card>, "children"> & {
	items: TickerItem[];
	/** ✦ forwarded to the Card. */
	raised?: boolean;
}) {
	return (
		<Card
			data-slot="ticker-strip"
			raised={raised}
			className={cn("flex-row gap-0 overflow-x-auto p-0", className)}
			{...props}
		>
			{items.map((item) => (
				<TickerCell key={item.symbol} item={item} />
			))}
		</Card>
	);
}

export type { TickerItem };
export { TickerStrip };
