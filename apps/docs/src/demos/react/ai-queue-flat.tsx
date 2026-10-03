import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import {
	Queue,
	QueueItem,
	QueueItemAvatar,
	QueueItemContent,
	QueueItemStatus,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionLabel,
	QueueSectionTrigger,
} from "@edmi-react/components/ai/queue";
import { Spinner } from "@edmi-react/ui/spinner";

const tasks = [
	{
		id: "1",
		agent: "keeper",
		title: "Rebalance MAG4 weights",
		age: "2m",
		running: true,
	},
	{
		id: "2",
		agent: "scout",
		title: "Summarize Q3 filings",
		age: "14m",
		running: false,
	},
	{
		id: "3",
		agent: "quote",
		title: "Compare fees with SPYx",
		age: "1h",
		running: false,
	},
];

export default function Demo() {
	return (
		<Queue variant="flat" className="w-full max-w-md">
			<QueueSection>
				<QueueSectionTrigger className="font-normal text-muted-foreground">
					<QueueSectionLabel label="Tasks" chevron={false} />
				</QueueSectionTrigger>
				<QueueSectionContent>
					<QueueList>
						{tasks.map((task) => (
							<QueueItem key={task.id}>
								<div className="flex items-center gap-2">
									<QueueItemAvatar>
										<AgentAvatar seed={task.agent} size={22} tile={false} />
									</QueueItemAvatar>
									<QueueItemContent>{task.title}</QueueItemContent>
									<QueueItemStatus>
										<span className="font-mono">{task.age}</span>
										{task.running ? (
											<Spinner className="size-3.5" />
										) : (
											<span className="size-1.5 rounded-full bg-success" />
										)}
									</QueueItemStatus>
								</div>
							</QueueItem>
						))}
					</QueueList>
				</QueueSectionContent>
			</QueueSection>
		</Queue>
	);
}
