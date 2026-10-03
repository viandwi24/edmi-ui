import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentMedia,
	AttachmentTitle,
} from "@edmi-react/ui/attachment";
import { Spinner } from "@edmi-react/ui/spinner";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-3">
			<Attachment>
				<AttachmentMedia>
					<IconPlaceholder
						lucide="FileTextIcon"
						tabler="IconFileText"
						hugeicons="FileIcon"
						phosphor="FileTextIcon"
						remixicon="RiFileTextLine"
					/>
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>thesis.pdf</AttachmentTitle>
					<AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
				</AttachmentContent>
				<AttachmentActions>
					<AttachmentAction aria-label="Remove">
						<IconPlaceholder
							lucide="XIcon"
							tabler="IconX"
							hugeicons="Cancel01Icon"
							phosphor="XIcon"
							remixicon="RiCloseLine"
						/>
					</AttachmentAction>
				</AttachmentActions>
			</Attachment>
			<Attachment state="uploading">
				<AttachmentMedia>
					<Spinner />
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>weights.csv</AttachmentTitle>
					<AttachmentDescription>Uploading 64%</AttachmentDescription>
				</AttachmentContent>
			</Attachment>
			<Attachment state="processing">
				<AttachmentMedia>
					<Spinner />
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>report.pdf</AttachmentTitle>
					<AttachmentDescription>Processing</AttachmentDescription>
				</AttachmentContent>
			</Attachment>
			<Attachment state="error">
				<AttachmentMedia>
					<IconPlaceholder
						lucide="CircleAlertIcon"
						tabler="IconExclamationCircle"
						hugeicons="AlertCircleIcon"
						phosphor="WarningCircleIcon"
						remixicon="RiErrorWarningLine"
					/>
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>backtest.xlsx</AttachmentTitle>
					<AttachmentDescription>Upload failed</AttachmentDescription>
				</AttachmentContent>
				<AttachmentActions>
					<AttachmentAction variant="outline" size="xs">
						Retry
					</AttachmentAction>
				</AttachmentActions>
			</Attachment>
			<Attachment size="sm">
				<AttachmentMedia>
					<IconPlaceholder
						lucide="FileTextIcon"
						tabler="IconFileText"
						hugeicons="FileIcon"
						phosphor="FileTextIcon"
						remixicon="RiFileTextLine"
					/>
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>mandate.pdf</AttachmentTitle>
					<AttachmentDescription>PDF, 540 KB</AttachmentDescription>
				</AttachmentContent>
				<AttachmentActions>
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						className="size-4 text-success-text"
					/>
				</AttachmentActions>
			</Attachment>
		</div>
	);
}
