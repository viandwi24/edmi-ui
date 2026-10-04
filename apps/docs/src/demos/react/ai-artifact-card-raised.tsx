import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";

export default function Demo() {
	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<ArtifactCard elevation="raised">
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
	);
}
