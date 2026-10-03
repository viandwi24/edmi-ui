import { cn } from "cn";
import type { ComponentProps } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";

export type ArtifactStackProps = ComponentProps<"div">;

/** Several outputs from one answer: artifact cards with a Download all action. */
export const ArtifactStack = ({ className, ...props }: ArtifactStackProps) => (
	<div
		data-slot="ai-artifact-stack"
		className={cn("flex w-full flex-col items-start gap-2", className)}
		{...props}
	/>
);

export type ArtifactStackDownloadAllProps = ComponentProps<typeof Button>;

export const ArtifactStackDownloadAll = ({
	className,
	children = "Download all",
	...props
}: ArtifactStackDownloadAllProps) => (
	<Button
		data-slot="ai-artifact-stack-download-all"
		variant="secondary"
		size="sm"
		type="button"
		className={cn(className)}
		{...props}
	>
		<IconPlaceholder
			lucide="DownloadIcon"
			tabler="IconDownload"
			hugeicons="DownloadIcon"
			phosphor="DownloadIcon"
			remixicon="RiDownloadLine"
			className="size-3.5"
		/>
		{children}
	</Button>
);
