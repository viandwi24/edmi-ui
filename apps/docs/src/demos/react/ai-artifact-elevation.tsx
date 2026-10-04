import {
	Artifact,
	ArtifactActions,
	ArtifactClose,
	ArtifactContent,
	ArtifactDescription,
	ArtifactHeader,
	ArtifactTitle,
} from "@edmi-react/components/ai/artifact";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Artifact elevation={value} className="max-w-xl">
						<ArtifactHeader>
							<div>
								<ArtifactTitle>rebalance.ts</ArtifactTitle>
								<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
							</div>
							<ArtifactActions>
								<ArtifactClose />
							</ArtifactActions>
						</ArtifactHeader>
						<ArtifactContent>
							<p className="font-mono text-xs text-muted-foreground">
								export async function run(index: string) {"{"} … {"}"}
							</p>
						</ArtifactContent>
					</Artifact>
				</div>
			))}
		</div>
	);
}
