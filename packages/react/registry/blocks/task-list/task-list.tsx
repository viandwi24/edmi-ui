import { cn } from "cn";
import * as React from "react";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";
import { Separator } from "@/registry/edmi/ui/separator";

type TaskStatus = "review" | "running" | "completed";

type Task = {
	id?: string;
	title: React.ReactNode;
	/** Owner label, rendered uppercase mono (e.g. "Research agent"). */
	agent?: React.ReactNode;
	status: TaskStatus;
};

const STATUS: Record<
	TaskStatus,
	{ label: string; variant: "warning" | "info" | "success" }
> = {
	review: { label: "Ready to review", variant: "warning" },
	running: { label: "Running", variant: "info" },
	completed: { label: "Completed", variant: "success" },
};

type TaskListProps = React.ComponentProps<typeof Card> & {
	tasks: Task[];
	/** Override the status badge labels. */
	labels?: Partial<Record<TaskStatus, string>>;
};

/** Tasks grouped by status (first-appearance order), one badge per group. */
function TaskList({ className, tasks, labels, ...props }: TaskListProps) {
	const groups: { status: TaskStatus; items: Task[] }[] = [];
	for (const t of tasks) {
		const g = groups.find((x) => x.status === t.status);
		if (g) g.items.push(t);
		else groups.push({ status: t.status, items: [t] });
	}
	return (
		<Card
			data-slot="task-list"
			className={cn("gap-0 px-[18px] py-4", className)}
			{...props}
		>
			{groups.map((g, gi) => (
				<React.Fragment key={g.status}>
					{gi > 0 ? <Separator className="my-3" /> : null}
					<div data-slot="task-group" data-status={g.status}>
						<Badge
							variant={STATUS[g.status].variant}
							className="font-mono text-[10.5px]"
						>
							{labels?.[g.status] ?? STATUS[g.status].label}
						</Badge>
						{g.items.map((t, i) => (
							<div
								key={t.id ?? i}
								data-slot="task-item"
								className="mt-2 flex items-center justify-between gap-2.5 text-[13px]"
							>
								<span>{t.title}</span>
								{t.agent ? (
									<span className="text-[10px] whitespace-nowrap text-muted-foreground uppercase">
										{t.agent}
									</span>
								) : null}
							</div>
						))}
					</div>
				</React.Fragment>
			))}
		</Card>
	);
}

export type { Task, TaskStatus };
export { TaskList };
