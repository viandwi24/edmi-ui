"use client";

import { cn } from "cn";
import * as React from "react";

import {
	type Elevation,
	type ElevationLevel,
	SurfaceProvider,
	useElevation,
} from "@/components/ui/elevation";

// ✦ Edmi addition (DESIGN §4.8, v4): the header sits on the shell (--muted, level 0); the body is a --card
// plate inset 2px from the shell (left/right/bottom) with its own full radius; with a footer the body keeps a
// 0 bottom gap and the footer sits on the shell without a divider.
// ✦ depth: raised = the body plate bevels; floating = the shell also gets the soft drop; sunken = the shell is a well.
const insetPanelElevation = {
	sunken: { root: "border-sk-bd bg-sk-bg shadow-sunken", body: "" },
	flat: { root: "", body: "" },
	raised: { root: "", body: "border-transparent shadow-raised" },
	floating: {
		root: "border-transparent shadow-[0_0_1.5px_var(--bv-out),var(--bv-float)]",
		body: "border-transparent shadow-raised",
	},
};

const InsetPanelContext = React.createContext<ElevationLevel>("flat");

function InsetPanel({
	className,
	elevation,
	children,
	...props
}: React.ComponentProps<"div"> & {
	/** ✦ depth: sunken -1, flat 0, raised +1 (body plate bevels), floating +2 (shell also drops). */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "surface");
	return (
		<div
			data-slot="inset-panel"
			className={cn(
				"group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
				insetPanelElevation[level].root,
				className,
			)}
			{...props}
		>
			<InsetPanelContext.Provider value={level}>
				<SurfaceProvider level={level}>{children}</SurfaceProvider>
			</InsetPanelContext.Provider>
		</div>
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
	const level = React.useContext(InsetPanelContext);
	return (
		<div
			data-slot="inset-panel-body"
			data-fade={fade || undefined}
			className={cn(
				"relative mx-0.5 mb-0.5 flex-1 overflow-hidden rounded-xl border border-border bg-card",
				// footer: it sits right under the body, so no bottom gap
				"group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0",
				insetPanelElevation[level].body,
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
				"bg-muted px-4 py-3 text-center text-[13px] text-foreground-2",
				className,
			)}
			{...props}
		/>
	);
}

export { InsetPanel, InsetPanelBody, InsetPanelFooter, InsetPanelHeader };
