import {
	Attachment,
	AttachmentHoverCard,
	AttachmentHoverCardContent,
	AttachmentHoverCardTrigger,
	AttachmentInfo,
	AttachmentPreview,
	AttachmentRemove,
	Attachments,
} from "@edmi-react/components/ai/attachments";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";

const chart =
	"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%2362b36f'/><stop offset='1' stop-color='%23386fd6'/></linearGradient></defs><rect width='220' height='120' fill='url(%23g)'/></svg>";

const initialFiles = [
	{
		id: "1",
		type: "file" as const,
		filename: "weights.csv",
		mediaType: "text/csv",
		url: "",
		size: 2048,
	},
	{
		id: "2",
		type: "file" as const,
		filename: "chart.png",
		mediaType: "image/png",
		url: chart,
		size: 188416,
	},
];

export default function Demo() {
	const [files, setFiles] = useState(initialFiles);
	const remove = (id: string) =>
		setFiles((fs) => fs.filter((f) => f.id !== id));
	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			{files.length === 0 && (
				<Button
					variant="outline"
					size="sm"
					className="self-start"
					onClick={() => setFiles(initialFiles)}
				>
					Reset
				</Button>
			)}
			<Attachments variant="grid">
				{files.map((f) => (
					<Attachment key={f.id} data={f} onRemove={() => remove(f.id)}>
						<AttachmentPreview />
						<AttachmentInfo />
						<AttachmentRemove />
					</Attachment>
				))}
			</Attachments>
			<Attachments variant="list">
				{files.map((f) => (
					<Attachment key={f.id} data={f} onRemove={() => remove(f.id)}>
						<AttachmentPreview />
						<AttachmentInfo showMediaType />
						<AttachmentRemove />
					</Attachment>
				))}
			</Attachments>
			<Attachments variant="inline">
				{files.map((f) => (
					<AttachmentHoverCard key={f.id}>
						<AttachmentHoverCardTrigger
							render={
								<Attachment data={f} onRemove={() => remove(f.id)}>
									<AttachmentPreview />
									<AttachmentInfo />
									<AttachmentRemove />
								</Attachment>
							}
						/>
						<AttachmentHoverCardContent>
							{f.mediaType.startsWith("image/") ? (
								<img
									alt={f.filename}
									src={f.url}
									className="h-24 rounded-lg object-cover"
								/>
							) : (
								<span className="px-1 text-xs">{f.filename}</span>
							)}
						</AttachmentHoverCardContent>
					</AttachmentHoverCard>
				))}
			</Attachments>
		</div>
	);
}
