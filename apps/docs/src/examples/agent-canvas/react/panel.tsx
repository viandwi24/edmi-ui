import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useState } from "react";
import {
	type ChatMessage,
	reply,
	type TabId,
	type TaskRow,
	tabs,
} from "../data";
import { CompanyTab } from "./company-tab";
import { Composer } from "./composer";
import { HomeTab } from "./home-tab";
import { LibraryTab } from "./library-tab";
import { TasksTab } from "./tasks-tab";

export function Panel({
	tab,
	setTab,
	messages,
	setMessages,
	tasks,
}: {
	tab: TabId;
	setTab: (t: TabId) => void;
	messages: ChatMessage[];
	setMessages: (m: ChatMessage[]) => void;
	tasks: TaskRow[];
}) {
	const [view, setView] = useState<"chat" | "home" | "thread">("chat");
	const send = (text: string) => {
		const id = messages.length + 1;
		setMessages([
			...messages,
			{ id, from: "user", text },
			{ id: id + 1, from: "assistant", text: reply },
		]);
		setView("chat");
		setTab("atlas");
	};
	const reset = () => {
		setMessages([]);
		setView("home");
	};

	return (
		<Tabs
			value={tab}
			onValueChange={(v) => setTab(v as TabId)}
			className="size-full gap-0"
		>
			<InsetPanel elevation="floating" className="h-full">
				<InsetPanelHeader className="px-5 py-3">
					<TabsList variant="pills">
						{tabs.map((t) => (
							<TabsTrigger key={t.id} value={t.id}>
								{t.label}
							</TabsTrigger>
						))}
					</TabsList>
				</InsetPanelHeader>
				<InsetPanelBody className="flex flex-col">
					<TabsContent value="atlas" className="flex min-h-0 flex-1 flex-col">
						<HomeTab
							view={view}
							setView={setView}
							messages={messages}
							tasks={tasks}
							onSend={send}
							onReset={reset}
						/>
					</TabsContent>
					<TabsContent value="tasks" className="flex min-h-0 flex-1 flex-col">
						<TasksTab tasks={tasks} />
					</TabsContent>
					<TabsContent value="company" className="flex min-h-0 flex-1 flex-col">
						<CompanyTab />
					</TabsContent>
					<TabsContent value="library" className="flex min-h-0 flex-1 flex-col">
						<LibraryTab />
					</TabsContent>
					{tab !== "library" && <Composer onSend={send} onClear={reset} />}
				</InsetPanelBody>
			</InsetPanel>
		</Tabs>
	);
}
