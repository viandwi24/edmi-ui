import {
	Queue,
	QueueItem,
	QueueItemAction,
	QueueItemActions,
	QueueItemAttachment,
	QueueItemContent,
	QueueItemDescription,
	QueueItemFile,
	QueueItemIndicator,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionLabel,
	QueueSectionTrigger,
} from "@edmi-react/components/ai/queue";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const queued = [
	{ id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
	{ id: "2", title: "Draft a feed post about MAG4" },
	{ id: "3", title: "Compare fees with SPYx" },
];

export default function Demo() {
	return (
		<Queue className="w-full max-w-md">
			<QueueSection>
				<QueueSectionTrigger>
					<QueueSectionLabel label="Queued" count={queued.length} />
				</QueueSectionTrigger>
				<QueueSectionContent>
					<QueueList>
						{queued.map((todo) => (
							<QueueItem key={todo.id}>
								<div className="flex items-start gap-2">
									<QueueItemIndicator />
									<QueueItemContent>{todo.title}</QueueItemContent>
									<QueueItemActions>
										<QueueItemAction aria-label="Edit">
											<IconPlaceholder
												lucide="PencilIcon"
												tabler="IconPencil"
												hugeicons="EditIcon"
												phosphor="PencilIcon"
												remixicon="RiPencilLine"
											/>
										</QueueItemAction>
										<QueueItemAction aria-label="Remove">
											<IconPlaceholder
												lucide="Trash2Icon"
												tabler="IconTrash"
												hugeicons="Delete02Icon"
												phosphor="TrashIcon"
												remixicon="RiDeleteBinLine"
											/>
										</QueueItemAction>
									</QueueItemActions>
								</div>
								{todo.description && (
									<QueueItemDescription>
										{todo.description}
									</QueueItemDescription>
								)}
							</QueueItem>
						))}
					</QueueList>
				</QueueSectionContent>
			</QueueSection>
			<QueueSection defaultOpen={false}>
				<QueueSectionTrigger>
					<QueueSectionLabel label="Completed" count={2} />
				</QueueSectionTrigger>
				<QueueSectionContent>
					<QueueList>
						<QueueItem>
							<div className="flex items-start gap-2">
								<QueueItemIndicator completed />
								<QueueItemContent completed>Quote MAG4 legs</QueueItemContent>
							</div>
							<QueueItemAttachment>
								<QueueItemFile>quotes.csv</QueueItemFile>
							</QueueItemAttachment>
						</QueueItem>
						<QueueItem>
							<div className="flex items-start gap-2">
								<QueueItemIndicator completed />
								<QueueItemContent completed>
									Check keeper limits
								</QueueItemContent>
							</div>
						</QueueItem>
					</QueueList>
				</QueueSectionContent>
			</QueueSection>
		</Queue>
	);
}
