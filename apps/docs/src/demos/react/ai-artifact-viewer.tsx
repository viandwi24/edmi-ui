import {
	ArtifactViewer,
	ArtifactViewerClose,
	ArtifactViewerContent,
	ArtifactViewerDownload,
	ArtifactViewerExpand,
	ArtifactViewerHeader,
	ArtifactViewerOpenIn,
	ArtifactViewerPaper,
	ArtifactViewerTitle,
} from "@edmi-react/components/ai/artifact-viewer";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";

export default function Demo() {
	const [open, setOpen] = useState(true);
	const [expanded, setExpanded] = useState(false);

	if (!open) {
		return (
			<Button onClick={() => setOpen(true)} size="sm" variant="outline">
				Show artifact
			</Button>
		);
	}

	return (
		<ArtifactViewer
			className={expanded ? "w-full max-w-3xl" : "w-full max-w-xl"}
		>
			<ArtifactViewerHeader>
				<ArtifactViewerTitle format="PDF">Rebalance report</ArtifactViewerTitle>
				<ArtifactViewerOpenIn />
				<ArtifactViewerDownload />
				<ArtifactViewerExpand onClick={() => setExpanded((v) => !v)} />
				<ArtifactViewerClose onClick={() => setOpen(false)} />
			</ArtifactViewerHeader>
			<ArtifactViewerContent>
				<ArtifactViewerPaper>
					<div className="font-mono text-[11px] tracking-[2px] text-[#7a7974]">
						RESEARCH · MAG4 · OCT 2026
					</div>
					<div className="mt-2.5 font-serif text-[26px] leading-[1.15] font-bold">
						Drift stays inside the band
					</div>
					<p className="mt-3 text-[13px] leading-[1.7] text-[#3d3c38]">
						The keeper checks weights every hour and trades only when a sleeve
						drifts past 2%. Slippage stays under 1% at current depth.{" "}
						<b>No manual step is needed before the next rebalance.</b>
					</p>
					<div className="my-4 h-0.5 bg-[#22406b]" />
					<div className="font-serif text-[17px] font-bold text-[#22406b]">
						What changed this week
					</div>
				</ArtifactViewerPaper>
			</ArtifactViewerContent>
		</ArtifactViewer>
	);
}
