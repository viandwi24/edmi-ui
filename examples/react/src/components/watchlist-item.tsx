import { cn } from "cn";
import type * as React from "react";

const isDown = (s: string) => /^[-−–]/.test(s.trim());

// Compact sidebar row: colored letter tile, symbol, mono price and change.
function WatchlistItem({
	className,
	symbol,
	price,
	change,
	color = "var(--chart-1)",
	letter,
	active,
	raised = false,
	...props
}: Omit<React.ComponentProps<"a">, "children"> & {
	symbol: string;
	price: string;
	/** Signed percentage, e.g. `+2.38%`. */
	change: string;
	/** Tile background: any CSS color, default `var(--chart-1)`. */
	color?: string;
	letter?: string;
	active?: boolean;
	/** ✦ the active row gets a one-step lip. */
	raised?: boolean;
}) {
	return (
		<a
			data-slot="watchlist-item"
			data-active={active ? "" : undefined}
			className={cn(
				"flex h-10 items-center gap-2.5 rounded-lg px-2.5 text-[13.5px] text-sidebar-foreground outline-none hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-ring",
				"data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:shadow-[inset_0_0_0_1px_var(--sidebar-border)]",
				raised &&
					"border border-transparent data-[active]:border-sidebar-border data-[active]:border-b-lip data-[active]:shadow-[0_2px_0_var(--lip)]",
				className,
			)}
			{...props}
		>
			<span
				className="inline-flex size-[26px] items-center justify-center rounded-[7px] text-xs font-semibold text-primary-foreground"
				style={{ background: color }}
			>
				{letter ?? symbol.charAt(0)}
			</span>
			<span className="min-w-0 flex-1 truncate">{symbol}</span>
			<span className="font-mono text-[11.5px] text-muted-foreground">
				{price}
			</span>
			<span
				className={cn(
					"font-mono text-[11.5px]",
					isDown(change) ? "text-destructive-text" : "text-success-text",
				)}
			>
				{change}
			</span>
		</a>
	);
}

export { WatchlistItem };
