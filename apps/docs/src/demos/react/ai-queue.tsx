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
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

type Todo = { id: string; title: string; description?: string };

const initialQueued: Todo[] = [
	{ id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
	{ id: "2", title: "Draft a feed post about MAG4" },
	{ id: "3", title: "Compare fees with SPYx" },
];

const initialDone: Todo[] = [
	{ id: "d1", title: "Quote MAG4 legs" },
	{ id: "d2", title: "Check keeper limits" },
];

export default function Demo() {
	const [queued, setQueued] = useState(initialQueued);
	const [done, setDone] = useState(initialDone);
	const complete = (todo: Todo) => {
		setQueued((q) => q.filter((t) => t.id !== todo.id));
		setDone((d) => [todo, ...d]);
	};
	const uncomplete = (todo: Todo) => {
		setDone((d) => d.filter((t) => t.id !== todo.id));
		setQueued((q) => [...q, todo]);
	};
	const edit = (todo: Todo) => {
		const title = window.prompt("Edit task", todo.title)?.trim();
		if (title)
			setQueued((q) => q.map((t) => (t.id === todo.id ? { ...t, title } : t)));
	};
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
									<QueueItemIndicator
										role="button"
										tabIndex={0}
										aria-label="Mark completed"
										className="cursor-pointer"
										onClick={() => complete(todo)}
										onKeyDown={(e) => e.key === "Enter" && complete(todo)}
									/>
									<QueueItemContent>{todo.title}</QueueItemContent>
									<QueueItemActions>
										<QueueItemAction
											aria-label="Edit"
											onClick={() => edit(todo)}
										>
											<IconPlaceholder
												lucide="PencilIcon"
												tabler="IconPencil"
												hugeicons="EditIcon"
												phosphor="PencilIcon"
												remixicon="RiPencilLine"
											/>
										</QueueItemAction>
										<QueueItemAction
											aria-label="Remove"
											onClick={() =>
												setQueued((q) => q.filter((t) => t.id !== todo.id))
											}
										>
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
					<QueueSectionLabel label="Completed" count={done.length} />
				</QueueSectionTrigger>
				<QueueSectionContent>
					<QueueList>
						{done.map((todo) => (
							<QueueItem key={todo.id}>
								<div className="flex items-start gap-2">
									<QueueItemIndicator
										completed
										role="button"
										tabIndex={0}
										aria-label="Mark not completed"
										className="cursor-pointer"
										onClick={() => uncomplete(todo)}
										onKeyDown={(e) => e.key === "Enter" && uncomplete(todo)}
									/>
									<QueueItemContent completed>{todo.title}</QueueItemContent>
								</div>
								{todo.id === "d1" && (
									<QueueItemAttachment>
										<QueueItemFile>quotes.csv</QueueItemFile>
									</QueueItemAttachment>
								)}
							</QueueItem>
						))}
					</QueueList>
				</QueueSectionContent>
			</QueueSection>
		</Queue>
	);
}
