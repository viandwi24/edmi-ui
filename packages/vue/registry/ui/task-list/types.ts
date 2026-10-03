export type TaskStatus = "review" | "running" | "completed";

export type Task = {
	id?: string;
	title: string;
	/** Owner label, rendered uppercase mono (e.g. "Research agent"). */
	agent?: string;
	status: TaskStatus;
};
