import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";

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
					<ArtifactCard elevation={value} className="max-w-lg">
						<ArtifactCardIcon kind="archive" />
						<ArtifactCardBody>
							<ArtifactCardTitle>Keeper starter</ArtifactCardTitle>
							<ArtifactCardMeta>ZIP</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions>
							<DropdownMenuItem>Copy link</DropdownMenuItem>
							<DropdownMenuItem>Open</DropdownMenuItem>
						</ArtifactCardActions>
					</ArtifactCard>
				</div>
			))}
		</div>
	);
}
