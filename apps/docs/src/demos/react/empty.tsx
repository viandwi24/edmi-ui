import { Button } from "@edmi-react/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@edmi-react/ui/empty";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<IconPlaceholder
							lucide="BriefcaseIcon"
							tabler="IconBriefcase"
							hugeicons="Briefcase01Icon"
							phosphor="BriefcaseIcon"
							remixicon="RiBriefcaseLine"
						/>
					</EmptyMedia>
					<EmptyTitle>No positions yet</EmptyTitle>
					<EmptyDescription>
						Join an index and your holdings will show up here.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>Explore indexes</Button>
				</EmptyContent>
			</Empty>
			<Empty className="border-[1.5px] border-input">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<IconPlaceholder
							lucide="UploadIcon"
							tabler="IconUpload"
							hugeicons="Upload01Icon"
							phosphor="UploadIcon"
							remixicon="RiUploadLine"
						/>
					</EmptyMedia>
					<EmptyTitle>Drop your weights file</EmptyTitle>
					<EmptyDescription>
						CSV with symbol and weight columns.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button variant="outline">Choose file</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
