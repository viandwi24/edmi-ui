import {
	Attachment,
	AttachmentInfo,
	AttachmentPreview,
	AttachmentRemove,
	Attachments,
} from "@edmi-react/components/ai/attachments";
import {
	PromptInput,
	PromptInputActionAddAttachments,
	PromptInputActionAddScreenshot,
	PromptInputActionMenu,
	PromptInputActionMenuContent,
	PromptInputActionMenuTrigger,
	PromptInputBody,
	PromptInputButton,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
	usePromptInputAttachments,
} from "@edmi-react/components/ai/prompt-input";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

function Files() {
	const attachments = usePromptInputAttachments();
	return (
		<Attachments variant="inline">
			{attachments.files.map((f) => (
				<Attachment
					key={f.id}
					data={f}
					onRemove={() => attachments.remove(f.id)}
				>
					<AttachmentPreview />
					<AttachmentInfo />
					<AttachmentRemove />
				</Attachment>
			))}
		</Attachments>
	);
}

export default function Demo() {
	const [status, setStatus] = useState<"ready" | "submitted" | "streaming">(
		"ready",
	);

	const submit = () => {
		setStatus("submitted");
		setTimeout(() => setStatus("streaming"), 600);
		setTimeout(() => setStatus("ready"), 2400);
	};

	return (
		<PromptInput onSubmit={submit} className="max-w-xl" multiple>
			<PromptInputHeader>
				<Files />
			</PromptInputHeader>
			<PromptInputBody>
				<PromptInputTextarea placeholder="Ask anything..." />
			</PromptInputBody>
			<PromptInputFooter>
				<PromptInputTools>
					<PromptInputActionMenu>
						<PromptInputActionMenuTrigger />
						<PromptInputActionMenuContent>
							<PromptInputActionAddAttachments />
							<PromptInputActionAddScreenshot />
						</PromptInputActionMenuContent>
					</PromptInputActionMenu>
					<PromptInputButton>
						<IconPlaceholder
							lucide="GlobeIcon"
							tabler="IconWorld"
							hugeicons="Globe02Icon"
							phosphor="GlobeIcon"
							remixicon="RiGlobalLine"
						/>
						<span>Search</span>
					</PromptInputButton>
				</PromptInputTools>
				<PromptInputSubmit status={status} onStop={() => setStatus("ready")} />
			</PromptInputFooter>
		</PromptInput>
	);
}
