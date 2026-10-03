import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardThumbnail,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
import {
	ArtifactStack,
	ArtifactStackDownloadAll,
} from "@edmi-react/components/ai/artifact-stack";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";

export default function Demo() {
	return (
		<ArtifactStack className="max-w-lg">
			<ArtifactCard>
				<ArtifactCardThumbnail />
				<ArtifactCardBody>
					<ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
					<ArtifactCardMeta>Document · PDF</ArtifactCardMeta>
				</ArtifactCardBody>
				<ArtifactCardActions>
					<DropdownMenuItem>Copy link</DropdownMenuItem>
				</ArtifactCardActions>
			</ArtifactCard>
			<ArtifactCard>
				<ArtifactCardIcon kind="document" />
				<ArtifactCardBody>
					<ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
					<ArtifactCardMeta>Document · MD</ArtifactCardMeta>
				</ArtifactCardBody>
				<ArtifactCardActions>
					<DropdownMenuItem>Copy link</DropdownMenuItem>
				</ArtifactCardActions>
			</ArtifactCard>
			<ArtifactStackDownloadAll />
		</ArtifactStack>
	);
}
