import {
	KanbanColumn,
	KanbanItem,
} from "@edmi-react/blocks/kanban-column/kanban-column";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const icon = (
	<IconPlaceholder
		lucide="SparklesIcon"
		tabler="IconSparkles"
		hugeicons="SparklesIcon"
		phosphor="SparkleIcon"
		remixicon="RiSparklingLine"
	/>
);

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-3">
			<KanbanColumn title="Thesis stage" meta="1/1">
				<KanbanItem
					elevation="raised"
					icon={icon}
					title="Initial thesis"
					description="User task"
				/>
			</KanbanColumn>
			<KanbanColumn title="Mandate stage" meta="0/3">
				<KanbanItem
					elevation="raised"
					disabled
					icon={icon}
					title="Pick tokens + weights"
					description="Agent task"
				/>
				<KanbanItem
					elevation="raised"
					disabled
					icon={icon}
					title="Review mandate"
					description="Agent requests approval"
				/>
			</KanbanColumn>
		</div>
	);
}
