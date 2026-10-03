import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageHeader,
} from "@edmi-react/components/ai/message";

const agents = [
	{
		name: "Keeper",
		text: "Drift is 2.4%, above the 2% limit. Rebalance is allowed.",
		tone: "bg-success-soft text-success-text",
	},
	{
		name: "Writer",
		text: "Drafted a feed post about the rebalance.",
		tone: "bg-info-soft text-info-text",
	},
];

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-4">
			{agents.map((a) => (
				<Message from="assistant" key={a.name}>
					<MessageAvatar>
						<span
							className={`flex size-6 items-center justify-center rounded-full border border-border text-xs font-medium ${a.tone}`}
						>
							{a.name[0]}
						</span>
					</MessageAvatar>
					<MessageHeader>
						<span className="font-semibold text-foreground">{a.name}</span>
						agent
					</MessageHeader>
					<MessageContent>{a.text}</MessageContent>
				</Message>
			))}
		</div>
	);
}
