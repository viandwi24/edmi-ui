"use client";

import { cn } from "cn";
import * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";

type Layout = "dashboard" | "navbar";

const LAYOUT_COOKIE = "edmi-layout";

/** Reads the saved layout from a cookie string (defaults to `document.cookie`); `undefined` when unset. */
function getLayoutCookie(cookie?: string): Layout | undefined {
	const source =
		cookie ?? (typeof document === "undefined" ? "" : document.cookie);
	const m = source.match(
		new RegExp(`(?:^|;\\s*)${LAYOUT_COOKIE}=(dashboard|navbar)`),
	);
	return m?.[1] as Layout | undefined;
}

/** Saves the layout for a year (DESIGN §3/§6: a cookie so SSR renders the right shell with no flash). */
function setLayoutCookie(layout: Layout) {
	document.cookie = `${LAYOUT_COOKIE}=${layout}; path=/; max-age=31536000; samesite=lax`;
}

const bar = "block rounded-sm bg-muted-foreground/20";

function Wireframe({ layout }: { layout: Layout }) {
	return (
		<div className="flex h-24 w-full overflow-hidden rounded-lg border border-border-2 bg-muted shadow-sunk">
			{layout === "dashboard" ? (
				<>
					<div className="flex w-[46px] flex-col gap-1.5 border-r border-border p-1.5">
						{[0, 1, 2, 3].map((i) => (
							<span key={i} className={cn(bar, "h-1.5")} />
						))}
					</div>
					<div className="flex flex-1 flex-col gap-1.5 p-2">
						<span className={cn(bar, "h-2 w-3/5")} />
						<span className={cn(bar, "h-10")} />
					</div>
				</>
			) : (
				<div className="flex flex-1 flex-col">
					<div className="flex h-4 items-center gap-3 border-b border-border px-2">
						<span className={cn(bar, "h-1.5 w-[30px]")} />
						<span className={cn(bar, "h-1.5 w-[60px]")} />
					</div>
					<div className="flex flex-col gap-1.5 p-2">
						<span className={cn(bar, "h-2 w-3/5")} />
						<span className={cn(bar, "h-10")} />
					</div>
				</div>
			)}
		</div>
	);
}

const options: { value: Layout; label: string }[] = [
	{ value: "dashboard", label: "Dashboard" },
	{ value: "navbar", label: "Navbar" },
];

// Two choice cards (native radios, so arrows/Space work). Controlled or uncontrolled.
function LayoutPicker({
	className,
	value,
	defaultValue = "dashboard",
	onValueChange,
	name,
	raised = false,
	...props
}: Omit<
	React.ComponentProps<"div">,
	"children" | "defaultValue" | "onChange"
> & {
	value?: Layout;
	defaultValue?: Layout;
	onValueChange?: (value: Layout) => void;
	name?: string;
	/** ✦ one-step 3D look for the option cards. */
	raised?: boolean;
}) {
	const groupName = React.useId();
	const [inner, setInner] = React.useState<Layout>(defaultValue);
	const current = value ?? inner;
	return (
		<div
			data-slot="layout-picker"
			role="radiogroup"
			className={cn("flex flex-wrap gap-3", className)}
			{...props}
		>
			{options.map((o) => (
				<label
					key={o.value}
					className={cn(
						"group/lp flex w-[220px] cursor-pointer flex-col gap-2.5 rounded-xl border border-border bg-card p-3.5 has-[:checked]:border-ring has-[:checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] has-[:checked]:shadow-[0_0_0_1px_var(--ring)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
						raised && "border-b-lip shadow-card has-[:checked]:border-b-ring",
					)}
				>
					<input
						type="radio"
						className="sr-only"
						name={name ?? groupName}
						value={o.value}
						checked={current === o.value}
						onChange={() => {
							setInner(o.value);
							onValueChange?.(o.value);
						}}
					/>
					<Wireframe layout={o.value} />
					<span className="flex w-full items-center justify-between">
						<span className="text-sm font-medium">{o.label}</span>
						<span className="flex size-[18px] items-center justify-center rounded-full border border-input bg-card shadow-sunk group-has-[:checked]/lp:border-primary group-has-[:checked]/lp:after:size-[9px] group-has-[:checked]/lp:after:rounded-full group-has-[:checked]/lp:after:bg-primary group-has-[:checked]/lp:after:content-['']" />
					</span>
				</label>
			))}
		</div>
	);
}

// First-visit corner toast. Renders nothing once a layout cookie exists. Choosing saves the cookie;
// closing without choosing saves the default (`dashboard`) so it does not return.
function LayoutPickerToast({
	className,
	title = "Choose your layout",
	description = "You can switch any time.",
	defaultOpen,
	onValueChange,
	onClose,
	raised = false,
	...props
}: Omit<React.ComponentProps<"div">, "title" | "children"> & {
	title?: React.ReactNode;
	description?: React.ReactNode;
	/** Skip the cookie check and show immediately (docs/previews). */
	defaultOpen?: boolean;
	onValueChange?: (value: Layout) => void;
	onClose?: () => void;
	/** ✦ one-step 3D look for the toast and the option cards. */
	raised?: boolean;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState<Layout>("dashboard");
	React.useEffect(() => {
		setOpen(defaultOpen ?? getLayoutCookie() === undefined);
	}, [defaultOpen]);
	if (!open) return null;
	return (
		<div
			data-slot="layout-picker-toast"
			role="dialog"
			aria-label="Choose layout"
			className={cn(
				"fixed right-4 bottom-4 z-50 w-[min(92vw,500px)] rounded-xl border border-border bg-popover p-4 text-popover-foreground",
				raised && "border-b-lip shadow-[0_3px_0_var(--lip)]",
				className,
			)}
			{...props}
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<div className="text-sm font-semibold">{title}</div>
					<div className="text-[13px] text-muted-foreground">{description}</div>
				</div>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Close"
					onClick={() => {
						if (getLayoutCookie() === undefined) setLayoutCookie(value);
						setOpen(false);
						onClose?.();
					}}
				>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
					/>
				</Button>
			</div>
			<LayoutPicker
				className="mt-3 flex-nowrap"
				raised={raised}
				value={value}
				onValueChange={(v) => {
					setValue(v);
					setLayoutCookie(v);
					onValueChange?.(v);
				}}
			/>
		</div>
	);
}

export type { Layout };
export {
	getLayoutCookie,
	LAYOUT_COOKIE,
	LayoutPicker,
	LayoutPickerToast,
	setLayoutCookie,
};
