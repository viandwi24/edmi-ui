import {
	KanbanColumn,
	KanbanItem,
} from "@edmi-react/blocks/kanban-column/kanban-column";
import type { Elevation } from "@edmi-react/ui/elevation";
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

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex flex-wrap items-start gap-3">
			<KanbanColumn title="Thesis stage" meta="1/1">
				<KanbanItem
					elevation={elevation}
					icon={icon}
					title="Initial thesis"
					description="User task"
				/>
			</KanbanColumn>
			<KanbanColumn title="Mandate stage" meta="0/3">
				<KanbanItem
					elevation={elevation}
					disabled
					icon={icon}
					title="Pick tokens + weights"
					description="Agent task"
				/>
				<KanbanItem
					elevation={elevation}
					disabled
					icon={icon}
					title="Review mandate"
					description="Agent requests approval"
				/>
			</KanbanColumn>
		</div>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
