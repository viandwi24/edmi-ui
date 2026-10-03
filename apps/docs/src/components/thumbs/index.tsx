// Static "open state" thumbnails for the components index. Overlay primitives render closed (and
// portalled) in SSR, so these compose the same Edmi recipe classes by hand. Keyed by item name; the
// index renders them to a string server-side. Flat only (no lips/shadows), per DESIGN.md §4.
import { Button } from "@edmi-react/ui/button";
import { Calendar } from "@edmi-react/ui/calendar";
import type { ReactNode } from "react";

const popup =
	"rounded-xl border border-border bg-popover text-popover-foreground";
const menuItem =
	"flex h-8 items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] text-popover-foreground";
const chev = (
	<svg
		viewBox="0 0 16 16"
		width="14"
		height="14"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.6"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="m4 6 4 4 4-4" />
	</svg>
);

function Item({
	children,
	hl,
	kbd,
	dest,
}: {
	children: ReactNode;
	hl?: boolean;
	kbd?: string;
	dest?: boolean;
}) {
	return (
		<div
			className={`${menuItem} ${hl ? "bg-accent text-accent-foreground" : ""} ${dest ? "text-destructive-text" : ""}`}
		>
			<span>{children}</span>
			{kbd && (
				<span className="ml-auto font-mono text-xs text-muted-foreground">
					{kbd}
				</span>
			)}
		</div>
	);
}
const Sep = () => <div className="-mx-1.5 my-1.5 h-px bg-border" />;

function Menu({ className = "" }: { className?: string }) {
	return (
		<div className={`${popup} w-48 p-1.5 ${className}`}>
			<div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
				My account
			</div>
			<Item hl>Profile</Item>
			<Item kbd="⌘B">Billing</Item>
			<Item kbd="⌘,">Settings</Item>
			<Sep />
			<Item dest>Log out</Item>
		</div>
	);
}

function Scrim({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`relative h-[250px] w-[460px] overflow-hidden rounded-lg bg-overlay ${className}`}
		>
			{children}
		</div>
	);
}

function DialogCard({
	title,
	text,
	destructive,
}: {
	title: string;
	text: string;
	destructive?: boolean;
}) {
	return (
		<div className="absolute top-1/2 left-1/2 grid w-[320px] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-sm text-popover-foreground">
			<div className="flex flex-col gap-1.5">
				<div className="text-base leading-snug font-semibold tracking-[-0.2px]">
					{title}
				</div>
				<div className="text-[13px] text-muted-foreground">{text}</div>
			</div>
			<div className="flex justify-end gap-2">
				<Button variant="outline" size="sm">
					Cancel
				</Button>
				<Button size="sm" variant={destructive ? "destructive" : "default"}>
					{destructive ? "Delete" : "Save"}
				</Button>
			</div>
		</div>
	);
}

function Field({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid gap-1.5">
			<div className="text-[13px] font-medium">{label}</div>
			<div className="flex h-9 items-center rounded-md border border-input bg-card px-3 text-sm">
				{value}
			</div>
		</div>
	);
}

const trigger =
	"flex h-9 w-[200px] items-center justify-between rounded-md border border-ring bg-card pr-2.5 pl-3 text-sm shadow-ring";

export const thumbs: Record<string, () => ReactNode> = {
	dialog: () => (
		<Scrim>
			<DialogCard
				title="Edit profile"
				text="Make changes to your profile here."
			/>
		</Scrim>
	),
	"alert-dialog": () => (
		<Scrim>
			<DialogCard
				destructive
				title="Are you absolutely sure?"
				text="This action cannot be undone."
			/>
		</Scrim>
	),
	sheet: () => (
		<Scrim>
			<div className="absolute inset-y-0 right-0 flex w-[240px] flex-col gap-4 border-l border-border bg-popover p-5 text-sm text-popover-foreground">
				<div className="flex flex-col gap-1.5">
					<div className="text-base font-semibold tracking-[-0.2px]">
						Edit profile
					</div>
					<div className="text-[13px] text-muted-foreground">
						Make changes, then save.
					</div>
				</div>
				<Field label="Name" value="Pedro Duarte" />
				<Field label="Username" value="@peduarte" />
			</div>
		</Scrim>
	),
	drawer: () => (
		<Scrim>
			<div className="absolute inset-x-8 bottom-0 flex flex-col gap-3 rounded-t-2xl border border-b-0 border-border bg-popover px-5 pb-5 text-sm text-popover-foreground">
				<div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border-2" />
				<div className="text-center">
					<div className="text-base font-semibold tracking-[-0.2px]">
						Move goal
					</div>
					<div className="text-[13px] text-muted-foreground">
						Set your daily activity goal.
					</div>
				</div>
				<div className="text-center font-mono text-4xl font-medium">350</div>
				<Button size="sm">Submit</Button>
			</div>
		</Scrim>
	),
	popover: () => (
		<div className="flex w-[300px] flex-col items-start gap-2">
			<Button variant="outline">Open popover</Button>
			<div className={`${popup} flex w-72 flex-col gap-2.5 p-3 text-sm`}>
				<div className="font-semibold">Dimensions</div>
				<div className="text-[13px] text-muted-foreground">
					Set the dimensions for the layer.
				</div>
				<Field label="Width" value="100%" />
			</div>
		</div>
	),
	tooltip: () => (
		<div className="flex w-[240px] flex-col items-center gap-2 pt-10">
			<div className="inline-flex items-center rounded-[7px] bg-primary px-2.5 py-1.5 text-[12.5px] text-primary-foreground">
				Add to library
			</div>
			<div className="-mt-3.5 size-2 rotate-45 rounded-[1px] bg-primary" />
			<Button variant="outline">Hover</Button>
		</div>
	),
	command: () => (
		<div className={`${popup} w-[380px] overflow-hidden`}>
			<div className="flex h-11 items-center border-b border-border px-3 text-sm text-muted-foreground">
				Search indexes and actions…
			</div>
			<div className="p-1.5">
				<div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
					Indexes
				</div>
				<Item hl>MAG4 · Magnificent Four</Item>
				<Item>MAG7 · equal weight</Item>
				<Sep />
				<div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
					Actions
				</div>
				<Item kbd="⌘N">Create index</Item>
				<Item kbd="⌘J">Ask agent</Item>
			</div>
		</div>
	),
	"message-scroller": () => (
		<div className="flex w-[360px] flex-col gap-3 text-sm">
			<div className="flex gap-2.5">
				<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
					A
				</div>
				<div className="rounded-xl bg-muted px-3 py-2">
					Rebalance MAG4 when a weight drifts past 5%?
				</div>
			</div>
			<div className="flex justify-end">
				<div className="rounded-xl bg-primary px-3 py-2 text-primary-foreground">
					Yes, and notify me.
				</div>
			</div>
			<div className="flex gap-2.5">
				<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
					A
				</div>
				<div className="rounded-xl bg-muted px-3 py-2">
					Done. Streaming the next update…
				</div>
			</div>
			<div className="mx-auto rounded-full border border-border bg-popover px-3 py-1 text-xs text-muted-foreground">
				Jump to latest
			</div>
		</div>
	),
	"hover-card": () => (
		<div className="flex w-[280px] flex-col items-start gap-2">
			<span className="text-sm font-medium underline underline-offset-4">
				@edmi
			</span>
			<div className={`${popup} flex w-64 gap-3 p-3 text-sm`}>
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
					E
				</div>
				<div className="grid gap-1">
					<div className="font-semibold">@edmi</div>
					<div className="text-[13px] text-muted-foreground">
						Editorial minimalist UI for React, Vue and Svelte.
					</div>
					<div className="text-xs text-muted-foreground">
						Joined October 2026
					</div>
				</div>
			</div>
		</div>
	),
	"dropdown-menu": () => (
		<div className="flex flex-col items-start gap-2">
			<Button variant="outline">Open</Button>
			<Menu />
		</div>
	),
	"context-menu": () => (
		<div className="relative h-[240px] w-[330px]">
			<div className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border border-dashed border-border-2 text-sm text-muted-foreground">
				Right click here
			</div>
			<Menu className="absolute top-[70px] left-[110px]" />
		</div>
	),
	menubar: () => (
		<div className="flex flex-col items-start gap-1.5">
			<div className="flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-[3px]">
				<div className="flex h-[30px] items-center rounded-[7px] bg-accent px-3 text-[13.5px] font-medium">
					File
				</div>
				<div className="flex h-[30px] items-center px-3 text-[13.5px] font-medium">
					Edit
				</div>
				<div className="flex h-[30px] items-center px-3 text-[13.5px] font-medium">
					View
				</div>
				<div className="flex h-[30px] items-center px-3 text-[13.5px] font-medium">
					Help
				</div>
			</div>
			<div className={`${popup} w-44 p-1.5`}>
				<Item hl kbd="⌘T">
					New tab
				</Item>
				<Item kbd="⌘N">New window</Item>
				<Sep />
				<Item>Share</Item>
				<Item kbd="⌘P">Print</Item>
			</div>
		</div>
	),
	select: () => (
		<div className="flex flex-col items-start gap-1.5">
			<div className={trigger}>
				<span>Apple</span>
				{chev}
			</div>
			<div className={`${popup} w-[200px] p-1.5`}>
				<div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
					Fruits
				</div>
				<Item hl>Apple</Item>
				<Item>Banana</Item>
				<Item>Blueberry</Item>
				<Item>Grapes</Item>
			</div>
		</div>
	),
	combobox: () => (
		<div className="flex flex-col items-start gap-1.5">
			<div className="flex h-9 w-[220px] items-center rounded-md border border-ring bg-card px-3 text-sm shadow-ring">
				<span className="text-muted-foreground">Select framework…</span>
			</div>
			<div className={`${popup} w-[220px] p-1.5`}>
				<Item hl>Next.js</Item>
				<Item>SvelteKit</Item>
				<Item>Nuxt.js</Item>
				<Item>Remix</Item>
			</div>
		</div>
	),
	"navigation-menu": () => (
		<div className="flex w-[380px] flex-col gap-1.5">
			<div className="flex gap-1">
				<div className="inline-flex h-9 items-center gap-1 rounded-md bg-accent px-3 text-[13.5px] font-medium text-foreground">
					Components
				</div>
				<div className="inline-flex h-9 items-center px-3 text-[13.5px] font-medium text-muted-foreground">
					Docs
				</div>
				<div className="inline-flex h-9 items-center px-3 text-[13.5px] font-medium text-muted-foreground">
					List
				</div>
			</div>
			<div className={`${popup} grid w-[340px] grid-cols-2 gap-1 p-2`}>
				{["Alert Dialog", "Hover Card", "Progress", "Scroll Area"].map(
					(t, i) => (
						<div
							key={t}
							className={`rounded-[7px] p-2 ${i === 0 ? "bg-accent" : ""}`}
						>
							<div className="text-[13.5px] font-medium">{t}</div>
							<div className="text-xs text-muted-foreground">
								A short description.
							</div>
						</div>
					),
				)}
			</div>
		</div>
	),
	sonner: () => (
		<div className="flex w-[340px] flex-col gap-2">
			<div className={`${popup} flex items-center gap-3 p-3.5 text-sm`}>
				<div className="grid flex-1 gap-0.5">
					<div className="font-medium">Event created</div>
					<div className="text-[13px] text-muted-foreground">
						Sunday, December 03 at 9:00 AM
					</div>
				</div>
				<Button size="sm" variant="outline">
					Undo
				</Button>
			</div>
			<div
				className={`${popup} ml-3 flex items-center gap-3 p-3.5 text-sm opacity-80`}
			>
				<div className="font-medium">Saved</div>
			</div>
		</div>
	),
	"date-picker": () => (
		<div className="flex flex-col items-start gap-1.5">
			<Button variant="outline" className="w-[240px] justify-start font-normal">
				October 16, 2026
			</Button>
			<div className={`${popup} w-fit p-1`}>
				<Calendar
					mode="single"
					defaultMonth={new Date(2026, 9)}
					selected={new Date(2026, 9, 16)}
				/>
			</div>
		</div>
	),
};
