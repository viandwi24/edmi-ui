import { Button } from "@edmi-react/ui/button";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import { useState } from "react";
import {
	type ChatMessage,
	tasks as seed,
	type TabId,
	type TaskRow,
} from "./data";
import { Canvas } from "./react/canvas";
import { Icon } from "./react/icons";
import { Panel } from "./react/panel";

export default function AgentCanvasExample() {
	const [tab, setTab] = useState<TabId>("atlas");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [tasks, setTasks] = useState<TaskRow[]>(seed);
	const [open, setOpen] = useState(false);

	return (
		<ElevationProvider mode="layered">
			<div className="relative h-svh min-h-[560px] overflow-hidden bg-background text-foreground">
				<Canvas
					onNewTask={(name) => {
						setTasks((t) => [
							{
								id: `t${t.length + 1}-${name}`,
								name,
								agent: "atlas",
								color: "var(--warning)",
								age: "now",
								status: "running",
							},
							...t,
						]);
						setTab("tasks");
						setOpen(true);
					}}
					onOpenPanel={() => setOpen(true)}
				/>
				<aside
					className={`absolute top-2 right-2 bottom-2 z-20 w-[460px] max-w-[calc(100%-1rem)] lg:block ${open ? "block" : "hidden"}`}
				>
					<Panel
						tab={tab}
						setTab={setTab}
						messages={messages}
						setMessages={setMessages}
						tasks={tasks}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon-xs"
						aria-label="Close panel"
						onClick={() => setOpen(false)}
						className="absolute top-3 right-3 z-30 lg:hidden"
					>
						<Icon name="close" />
					</Button>
				</aside>
			</div>
		</ElevationProvider>
	);
}
