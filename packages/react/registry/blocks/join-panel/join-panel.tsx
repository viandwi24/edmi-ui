import { cn } from "cn";
import * as React from "react";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@/registry/edmi/ui/input-group";

type JoinPanelRow = { label: React.ReactNode; value: React.ReactNode };

// Amount field (mono, Max button, currency) + summary rows + one big action.
function JoinPanel({
	className,
	label = "Amount",
	currency = "USDC",
	amount,
	defaultAmount = "",
	onAmountChange,
	onMax,
	rows = [],
	joinLabel = "Join",
	onJoin,
	disabled,
	raised = false,
	...props
}: Omit<React.ComponentProps<typeof Card>, "children" | "size" | "onSubmit"> & {
	label?: React.ReactNode;
	currency?: string;
	/** Controlled value. */
	amount?: string;
	defaultAmount?: string;
	onAmountChange?: (value: string) => void;
	onMax?: () => void;
	/** Summary rows (estimated shares, fee, …). Values render mono. */
	rows?: JoinPanelRow[];
	joinLabel?: React.ReactNode;
	onJoin?: () => void;
	disabled?: boolean;
	/** ✦ one-step 3D look: card and the join Button. */
	raised?: boolean;
}) {
	const id = React.useId();
	const [inner, setInner] = React.useState(defaultAmount);
	const value = amount ?? inner;
	return (
		<Card
			data-slot="join-panel"
			size="sm"
			raised={raised}
			className={cn("w-80 gap-0", className)}
			{...props}
		>
			<label
				htmlFor={id}
				className="px-(--card-spacing) text-xs text-muted-foreground"
			>
				{label} ({currency})
			</label>
			<div className="px-(--card-spacing)">
				<InputGroup className="mt-2 h-11">
					<InputGroupInput
						id={id}
						inputMode="decimal"
						autoComplete="off"
						value={value}
						onChange={(e) => {
							setInner(e.target.value);
							onAmountChange?.(e.target.value);
						}}
						className="font-mono text-[17px]"
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton variant="secondary" onClick={onMax}>
							Max
						</InputGroupButton>
						<InputGroupText className="bg-transparent px-1.5 text-xs">
							{currency}
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</div>
			{rows.map((r, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static summary rows
					key={i}
					className={cn(
						"flex items-center justify-between px-(--card-spacing) text-[13px]",
						i === 0 ? "mt-3" : "mt-1.5",
					)}
				>
					<span className="text-muted-foreground">{r.label}</span>
					<span className="font-mono">{r.value}</span>
				</div>
			))}
			<div className="mt-3.5 px-(--card-spacing)">
				<Button
					size="lg"
					raised={raised}
					className="w-full"
					onClick={onJoin}
					disabled={disabled}
				>
					{joinLabel}
				</Button>
			</div>
		</Card>
	);
}

export type { JoinPanelRow };
export { JoinPanel };
