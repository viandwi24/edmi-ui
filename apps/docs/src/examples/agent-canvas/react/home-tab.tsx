import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import {
	Message,
	MessageContent,
	MessageHeader,
} from "@edmi-react/components/ai/message";
import { Suggestion, Suggestions } from "@edmi-react/components/ai/suggestion";
import { Button } from "@edmi-react/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@edmi-react/ui/item";
import {
	type ChatMessage,
	org,
	plantHead,
	suggested,
	type TaskRow,
	thread,
} from "../data";
import { Icon } from "./icons";
import { Pixels, Status } from "./pixel";

export function HomeTab({
	view,
	setView,
	messages,
	tasks,
	onSend,
	onReset,
}: {
	view: "chat" | "home" | "thread";
	setView: (v: "chat" | "home" | "thread") => void;
	messages: ChatMessage[];
	tasks: TaskRow[];
	onSend: (text: string) => void;
	onReset: () => void;
}) {
	if (view === "home")
		return (
			<div className="flex min-h-0 flex-1 flex-col px-5 pb-3">
				<div className="mt-3 [mask-image:linear-gradient(to_bottom,black,transparent)]">
					<Item variant="outline" size="sm">
						<ItemMedia variant="icon">
							<Icon name="map" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Open the company roadmap</ItemTitle>
							<ItemDescription>General</ItemDescription>
						</ItemContent>
					</Item>
				</div>
				<div className="flex justify-center py-3">
					<Button
						type="button"
						variant="ghost"
						size="xs"
						onClick={() => setView("chat")}
					>
						<Icon name="arrowUp" className="size-3.5" />
						Back to chat
					</Button>
				</div>
				<div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
					<h2 className="text-2xl font-normal">Good evening, {org.user}</h2>
					<Button type="button" variant="ghost" size="xs">
						<Icon name="map" className="size-3.5" />
						Roadmap
					</Button>
				</div>
				<div className="mb-2 text-xs text-muted-foreground">Tasks</div>
				<div className="flex flex-col">
					{tasks.map((t) => (
						<div
							key={t.id}
							className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
						>
							<AgentAvatar
								seed={t.agent}
								color={t.color}
								size={20}
								tile={false}
							/>
							<span className="text-[15px]">{t.name}</span>
							<span className="ml-auto font-mono text-xs text-muted-foreground">
								{t.age}
							</span>
							<Status status={t.status} />
						</div>
					))}
				</div>
				<div className="mt-3 flex items-center gap-2">
					<span className="text-xs text-muted-foreground">Suggested</span>
					<Suggestions className="min-w-0">
						{suggested.map((s) => (
							<Suggestion key={s} suggestion={s} onClick={onSend} />
						))}
					</Suggestions>
				</div>
			</div>
		);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex justify-end px-3 pt-3">
				<Button
					type="button"
					variant="ghost"
					size="icon-xs"
					aria-label="Toggle thread"
					onClick={() => setView(view === "thread" ? "chat" : "thread")}
				>
					<Icon name="more" />
				</Button>
			</div>
			{view === "thread" ? (
				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
					<Message from="assistant">
						<MessageContent>
							<p>{thread.intro[0]}</p>
							<ol className="my-2 list-decimal pl-5">
								<li>{thread.intro[1]}</li>
								<li>{thread.intro[2]}</li>
							</ol>
							<p>{thread.intro[3]}</p>
						</MessageContent>
					</Message>
					<Message from="user">
						<MessageContent>{thread.question}</MessageContent>
					</Message>
					<Message from="assistant">
						<MessageHeader>
							<Pixels
								w={plantHead.w}
								h={plantHead.h}
								rects={plantHead.rects}
								className="h-3 w-3.5"
							/>
							Atlas
						</MessageHeader>
						<MessageContent>{thread.answer}</MessageContent>
					</Message>
					<div className="flex flex-col gap-2">
						{thread.actions.map((a) => (
							<Item key={a.id} variant="outline" size="sm">
								<ItemMedia>
									<AgentAvatar
										seed={a.agent}
										color={a.color}
										size={20}
										tile={false}
									/>
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{a.title}</ItemTitle>
									<ItemDescription>{a.dept}</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</div>
					<div className="flex justify-center">
						<Button
							type="button"
							variant="outline"
							size="icon-xs"
							aria-label="Scroll to latest"
						>
							<Icon name="chevronDown" />
						</Button>
					</div>
				</div>
			) : messages.length === 0 ? (
				<div className="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
					<svg
						viewBox="0 0 24 24"
						className="mb-2 size-7 text-muted-foreground"
						fill="currentColor"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="1.4" />
						<circle cx="12" cy="6" r="1" />
						<circle cx="12" cy="18" r="1" />
						<circle cx="6" cy="12" r="1" />
						<circle cx="18" cy="12" r="1" />
					</svg>
					<h2 className="text-[15px] font-semibold">What should we work on?</h2>
					<p className="text-sm text-muted-foreground">
						Bring me an idea, a problem, or a goal. I'll help turn it into the
						next useful step.
					</p>
				</div>
			) : (
				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
					{messages.map((m) => (
						<Message key={m.id} from={m.from}>
							<MessageContent>{m.text}</MessageContent>
						</Message>
					))}
					<div>
						<Button type="button" variant="ghost" size="xs" onClick={onReset}>
							<Icon name="home" className="size-3.5" />
							Back to home
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
