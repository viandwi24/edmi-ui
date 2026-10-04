"use client";

import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";

type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
	name: string;
	currentVersion?: string;
	newVersion?: string;
	changeType?: ChangeType;
}

const PackageInfoContext = createContext<PackageInfoContextType>({
	name: "",
});

export type PackageInfoHeaderProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoHeader = ({
	className,
	children,
	...props
}: PackageInfoHeaderProps) => (
	<div
		data-slot="ai-package-info-header"
		className={cn("flex items-center gap-2", className)}
		{...props}
	>
		{children}
	</div>
);

export type PackageInfoNameProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoName = ({
	className,
	children,
	...props
}: PackageInfoNameProps) => {
	const { name } = useContext(PackageInfoContext);

	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			<IconPlaceholder
				lucide="ContainerIcon"
				tabler="IconBox"
				hugeicons="CubeIcon"
				phosphor="CubeIcon"
				remixicon="RiBox1Line"
				className="size-3.5 text-muted-foreground"
			/>
			<span className="font-mono text-[13.5px] font-semibold">
				{children ?? name}
			</span>
		</div>
	);
};

// major = destructive, minor = warning, patch = success, added = info (soft fill, tinted border).
const changeTypeVariants = {
	added: "info",
	major: "destructive",
	minor: "warning",
	patch: "success",
	removed: "secondary",
} as const;

export type PackageInfoChangeTypeProps = HTMLAttributes<HTMLSpanElement>;

export const PackageInfoChangeType = ({
	className,
	children,
	...props
}: PackageInfoChangeTypeProps) => {
	const { changeType } = useContext(PackageInfoContext);

	if (!changeType) {
		return null;
	}

	return (
		<Badge
			className={cn("h-5", className)}
			variant={changeTypeVariants[changeType]}
			{...props}
		>
			{children ?? changeType}
		</Badge>
	);
};

export type PackageInfoVersionProps = HTMLAttributes<HTMLDivElement>;

/** `18.3.1 → 19.0.0`; with only a new version (added) it reads `→ 6.0.30`. Pushed right inside the header. */
export const PackageInfoVersion = ({
	className,
	children,
	...props
}: PackageInfoVersionProps) => {
	const { currentVersion, newVersion } = useContext(PackageInfoContext);

	if (!(currentVersion || newVersion)) {
		return null;
	}

	return (
		<div
			className={cn(
				"ml-auto font-mono text-[12.5px] text-foreground",
				className,
			)}
			{...props}
		>
			{children ??
				[currentVersion, newVersion && "→", newVersion]
					.filter(Boolean)
					.join(" ")}
		</div>
	);
};

export type PackageInfoProps = HTMLAttributes<HTMLDivElement> & {
	name: string;
	currentVersion?: string;
	newVersion?: string;
	changeType?: ChangeType;
};

export const PackageInfo = ({
	name,
	currentVersion,
	newVersion,
	changeType,
	className,
	children,
	...props
}: PackageInfoProps) => {
	const contextValue = useMemo(
		() => ({ changeType, currentVersion, name, newVersion }),
		[changeType, currentVersion, name, newVersion],
	);

	return (
		<PackageInfoContext.Provider value={contextValue}>
			<div
				data-slot="ai-package-info"
				className={cn(
					"rounded-xl border border-border bg-card px-4 py-3.5 text-card-foreground",
					className,
				)}
				{...props}
			>
				{children ?? (
					<PackageInfoHeader>
						<PackageInfoName />
						{changeType && <PackageInfoChangeType />}
						<PackageInfoVersion />
					</PackageInfoHeader>
				)}
			</div>
		</PackageInfoContext.Provider>
	);
};

export type PackageInfoDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const PackageInfoDescription = ({
	className,
	children,
	...props
}: PackageInfoDescriptionProps) => (
	<p
		className={cn("mt-1.5 text-xs text-muted-foreground", className)}
		{...props}
	>
		{children}
	</p>
);

export type PackageInfoContentProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoContent = ({
	className,
	children,
	...props
}: PackageInfoContentProps) => (
	<div
		className={cn("mt-3 border-t border-border-2 pt-3", className)}
		{...props}
	>
		{children}
	</div>
);

export type PackageInfoDependenciesProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoDependencies = ({
	className,
	children,
	...props
}: PackageInfoDependenciesProps) => (
	<div className={cn("flex flex-col gap-2", className)} {...props}>
		<span className="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">
			Dependencies
		</span>
		<div className="flex flex-col gap-1">{children}</div>
	</div>
);

export type PackageInfoDependencyProps = HTMLAttributes<HTMLDivElement> & {
	name: string;
	version?: string;
};

export const PackageInfoDependency = ({
	name,
	version,
	className,
	children,
	...props
}: PackageInfoDependencyProps) => (
	<div
		className={cn("flex items-center justify-between text-sm", className)}
		{...props}
	>
		{children ?? (
			<>
				<span className="font-mono text-[12.5px] text-muted-foreground">
					{name}
				</span>
				{version && <span className="font-mono text-xs">{version}</span>}
			</>
		)}
	</div>
);
