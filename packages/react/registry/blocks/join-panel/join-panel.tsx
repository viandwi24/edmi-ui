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
import { Tabs, TabsList, TabsTrigger } from "@/registry/edmi/ui/tabs";

type JoinPanelRow = { label: React.ReactNode; value: React.ReactNode };
/** ✦ Quick-amount chip: sets the amount to `value`; without `value` it calls `onMax`. */
type JoinPanelQuickAmount = { label: React.ReactNode; value?: string };
/** ✦ Mode tab, e.g. Join / Redeem. */
type JoinPanelTab = { value: string; label: React.ReactNode };

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
	tabs,
	tab,
	defaultTab,
	onTabChange,
	quickAmounts,
	footnote,
	amountSize = "default",
	maxLabel,
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
	/** ✦ Join / Redeem style mode tabs above the amount (the IndexDetail board). */
	tabs?: JoinPanelTab[];
	/** ✦ Controlled tab value. */
	tab?: string;
	defaultTab?: string;
	onTabChange?: (value: string) => void;
	/** ✦ Chips under the amount field, e.g. `[{ label: "$10", value: "10" }, { label: "Max" }]`. */
	quickAmounts?: JoinPanelQuickAmount[];
	/** ✦ Small centred note under the action, e.g. `Self-custodied · Redeem anytime`. */
	footnote?: React.ReactNode;
	/** ✦ `lg`: taller field with a 26px mono amount (the IndexDetail board). */
	amountSize?: "default" | "lg";
	/** ✦ Plain muted text in the field (e.g. `Max 1,240`) instead of the Max button and currency. */
	maxLabel?: React.ReactNode;
	joinLabel?: React.ReactNode;
	onJoin?: () => void;
	disabled?: boolean;
	/** ✦ one-step 3D look: card and the join Button. */
	raised?: boolean;
}) {
	const id = React.useId();
	const [inner, setInner] = React.useState(defaultAmount);
	const value = amount ?? inner;
	const [innerTab, setInnerTab] = React.useState(
		defaultTab ?? tabs?.[0]?.value ?? "",
	);
	// Digits, thousands separators and a decimal point only.
	const setAmount = (raw: string) => {
		const v = raw.replace(/[^\d.,]/g, "");
		setInner(v);
		onAmountChange?.(v);
	};
	return (
		<Card
			data-slot="join-panel"
			size="sm"
			raised={raised}
			className={cn("w-80 gap-0", className)}
			{...props}
		>
			{tabs?.length ? (
				<div className="mb-5 px-(--card-spacing)">
					<Tabs
						value={tab ?? innerTab}
						onValueChange={(v) => {
							setInnerTab(v as string);
							onTabChange?.(v as string);
						}}
					>
						<TabsList raised={raised} className="w-full">
							{tabs.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			) : null}
			<label
				htmlFor={id}
				className="px-(--card-spacing) text-xs text-muted-foreground"
			>
				{label} ({currency})
			</label>
			<div className="px-(--card-spacing)">
				<InputGroup
					className={cn("mt-2", amountSize === "lg" ? "h-14" : "h-11")}
				>
					<InputGroupInput
						id={id}
						inputMode="decimal"
						autoComplete="off"
						value={value}
						onChange={(e) => setAmount(e.target.value)}
						className={cn(
							"font-mono",
							amountSize === "lg" ? "text-[26px]" : "text-[17px]",
						)}
					/>
					<InputGroupAddon align="inline-end">
						{maxLabel ? (
							<InputGroupText className="bg-transparent text-xs">
								{maxLabel}
							</InputGroupText>
						) : (
							<>
								<InputGroupButton variant="secondary" onClick={onMax}>
									Max
								</InputGroupButton>
								<InputGroupText className="bg-transparent px-1.5 text-xs">
									{currency}
								</InputGroupText>
							</>
						)}
					</InputGroupAddon>
				</InputGroup>
			</div>
			{quickAmounts?.length ? (
				<div className="mt-3 flex gap-2 px-(--card-spacing)">
					{quickAmounts.map((q, i) => (
						<Button
							// biome-ignore lint/suspicious/noArrayIndexKey: static chips
							key={i}
							type="button"
							variant="secondary"
							size="sm"
							elevation={raised ? "raised" : undefined}
							className="flex-1 font-mono"
							onClick={() =>
								q.value !== undefined ? setAmount(q.value) : onMax?.()
							}
						>
							{q.label}
						</Button>
					))}
				</div>
			) : null}
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
					elevation={raised ? "raised" : undefined}
					className="w-full"
					onClick={onJoin}
					disabled={disabled}
				>
					{joinLabel}
				</Button>
			</div>
			{footnote ? (
				<div className="mt-3 px-(--card-spacing) text-center text-xs text-muted-foreground-2">
					{footnote}
				</div>
			) : null}
		</Card>
	);
}

export type { JoinPanelQuickAmount, JoinPanelRow, JoinPanelTab };
export { JoinPanel };
