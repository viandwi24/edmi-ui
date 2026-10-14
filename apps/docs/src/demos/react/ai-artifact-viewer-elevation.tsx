import {
	ArtifactViewer,
	ArtifactViewerContent,
	ArtifactViewerDownload,
	ArtifactViewerHeader,
	ArtifactViewerPaper,
	ArtifactViewerTitle,
} from "@edmi-react/components/ai/artifact-viewer";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<ArtifactViewer elevation={value}>
						<ArtifactViewerHeader>
							<ArtifactViewerTitle format="PDF">
								Rebalance report
							</ArtifactViewerTitle>
							<ArtifactViewerDownload />
						</ArtifactViewerHeader>
						<ArtifactViewerContent>
							<ArtifactViewerPaper className="px-6 py-5 text-[13px]">
								Drift stays inside the band.
							</ArtifactViewerPaper>
						</ArtifactViewerContent>
					</ArtifactViewer>
				</div>
			))}
		</div>
	);
}
