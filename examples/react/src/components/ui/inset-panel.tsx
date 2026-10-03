import { cn } from "cn";
import type * as React from "react";

// ✦ Edmi addition (DESIGN §4.7): the header sits on the shell (--muted); the body is a
// --card panel running edge to edge with radius on the top corners only; optional bottom
// fade; the footer is back on the shell with a top border.

function InsetPanel({
	className,
	raised = false,
	...props
}: React.ComponentProps<"div"> & {
	/** ✦ one-step 3D look: lip + dialog shadow, highlighted body. */
	raised?: boolean;
}) {
	return (
		<div
			data-slot="inset-panel"
			className={cn(
				"group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
				raised &&
					"border-b-lip-strong shadow-dialog [&>[data-slot=inset-panel-body]]:shadow-[inset_0_1px_0_var(--card-hi)]",
				className,
			)}
			{...props}
		/>
	);
}

function InsetPanelHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="inset-panel-header"
			className={cn(
				"flex items-center gap-2 px-4 py-3 text-sm font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function InsetPanelBody({
	className,
	fade = false,
	...props
}: React.ComponentProps<"div"> & { fade?: boolean }) {
	return (
		<div
			data-slot="inset-panel-body"
			data-fade={fade || undefined}
			className={cn(
				"relative -mx-px flex-1 overflow-hidden rounded-t-xl border border-b-0 border-border bg-card",
				// no footer: the body runs to the bottom edge
				"group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0 not-group-has-[[data-slot=inset-panel-footer]]/inset-panel:-mb-px",
				"data-[fade]:after:pointer-events-none data-[fade]:after:absolute data-[fade]:after:inset-x-0 data-[fade]:after:bottom-0 data-[fade]:after:h-14 data-[fade]:after:bg-linear-to-b data-[fade]:after:from-transparent data-[fade]:after:to-card",
				className,
			)}
			{...props}
		/>
	);
}

function InsetPanelFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="inset-panel-footer"
			className={cn(
				"border-t border-border bg-muted px-4 py-3 text-center text-[13px] text-foreground-2",
				className,
			)}
			{...props}
		/>
	);
}

export { InsetPanel, InsetPanelBody, InsetPanelFooter, InsetPanelHeader };
