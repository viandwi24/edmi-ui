import {
	Task,
	TaskContent,
	TaskItem,
	TaskItemFile,
	TaskTrigger,
} from "@edmi-react/components/ai/task";

export default function Demo() {
	return (
		<Task className="w-full max-w-lg">
			<TaskTrigger title="Update the weights file · 2 of 5" />
			<TaskContent>
				<TaskItem status="completed">
					Read <TaskItemFile>weights.ts</TaskItemFile>
				</TaskItem>
				<TaskItem status="completed">Validate total = 100%</TaskItem>
				<TaskItem status="in-progress">
					Write <TaskItemFile>weights.ts</TaskItemFile>
				</TaskItem>
				<TaskItem status="pending">Run tests</TaskItem>
				<TaskItem status="error">Deploy preview failed</TaskItem>
			</TaskContent>
		</Task>
	);
}
