import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import { Checkbox } from "@edmi-react/ui/checkbox";
import { useState } from "react";
import { suggested, type TaskRow } from "../data";
import { Status } from "./pixel";

const label = "mt-5 mb-1 text-[13px] text-muted-foreground";

export function TasksTab({ tasks }: { tasks: TaskRow[] }) {
	const [picked, setPicked] = useState<string[]>([]);
	const all = picked.length === tasks.length;
	const toggle = (id: string, on: boolean) =>
		setPicked((p) => (on ? [...p, id] : p.filter((x) => x !== id)));

	return (
		<div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
			<h2 className="text-lg font-medium">Tasks</h2>
			<div className="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
				<Checkbox
					aria-label="Select all"
					checked={all}
					indeterminate={picked.length > 0 && !all}
					onCheckedChange={(c) => setPicked(c ? tasks.map((t) => t.id) : [])}
				/>
				Select all
			</div>
			<div className={label}>Tasks</div>
			<div className="flex flex-col">
				{tasks.map((t) => (
					<div
						key={t.id}
						className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
					>
						<Checkbox
							checked={picked.includes(t.id)}
							onCheckedChange={(c) => toggle(t.id, c)}
						/>
						<Status status={t.status} />
						<AgentAvatar
							seed={t.agent}
							color={t.color}
							size={20}
							tile={false}
						/>
						<span className="text-[15px]">{t.name}</span>
					</div>
				))}
			</div>
			<div className={label}>Suggested Next</div>
			<div className="flex flex-col">
				{suggested.map((s) => (
					<div key={s} className="flex items-center gap-3 py-2.5">
						<svg
							viewBox="0 0 16 16"
							className="size-3.5 text-muted-foreground"
							aria-hidden="true"
						>
							<circle
								cx="8"
								cy="8"
								r="6"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeDasharray="2 2.4"
							/>
						</svg>
						<span className="text-[15px]">{s}</span>
					</div>
				))}
			</div>
		</div>
	);
}
