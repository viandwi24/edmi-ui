import { Canvas } from "@edmi-react/components/ai/canvas";
import { Controls } from "@edmi-react/components/ai/controls";
import { Edge } from "@edmi-react/components/ai/edge";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";
import { Panel } from "@edmi-react/components/ai/panel";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";

type StepData = {
	title: string;
	description: string;
	body?: string;
	footer?: string;
	handles: { target: boolean; source: boolean };
};

const nodes = [
	{
		id: "start",
		type: "step",
		position: { x: 0, y: 90 },
		data: {
			title: "Start",
			description: "Trigger · every hour",
			body: "cron 0 * * * *",
			handles: { target: false, source: true },
		},
	},
	{
		id: "drift",
		type: "step",
		position: { x: 330, y: 0 },
		data: {
			title: "Check drift",
			description: "Tool · get_prices",
			body: "MAG4 drift: 2.4%",
			footer: "412 ms",
			handles: { target: true, source: true },
		},
	},
	{
		id: "post",
		type: "step",
		position: { x: 330, y: 190 },
		data: {
			title: "Draft feed post",
			description: "Agent · writer",
			body: "Writing...",
			footer: "running",
			handles: { target: true, source: true },
		},
	},
	{
		id: "decision",
		type: "step",
		position: { x: 660, y: 0 },
		data: {
			title: "Decision",
			description: "drift > 2%?",
			body: "yes / no",
			handles: { target: true, source: true },
		},
	},
];

const edges = [
	{ id: "e1", source: "start", target: "drift", type: "animated" },
	{ id: "e2", source: "start", target: "post" },
	{ id: "e3", source: "drift", target: "decision", type: "animated" },
	{ id: "e4", source: "post", target: "decision", type: "temporary" },
];

const nodeTypes = {
	step: ({ data, selected }: { data: StepData; selected?: boolean }) => (
		<Node handles={data.handles} selected={selected}>
			<NodeHeader>
				<NodeTitle>{data.title}</NodeTitle>
				<NodeDescription>{data.description}</NodeDescription>
			</NodeHeader>
			<NodeContent>
				{data.body === "cron 0 * * * *" ? (
					<Badge variant="secondary">{data.body}</Badge>
				) : (
					<span className="font-mono text-xs">{data.body}</span>
				)}
			</NodeContent>
			{data.footer && <NodeFooter>{data.footer}</NodeFooter>}
		</Node>
	),
};

const edgeTypes = {
	animated: Edge.Animated,
	temporary: Edge.Temporary,
};

export default function Demo() {
	return (
		<div className="h-[420px] w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas
				edges={edges}
				edgeTypes={edgeTypes}
				nodes={nodes}
				nodeTypes={nodeTypes}
			>
				<Controls />
				<Panel position="top-right">
					<Button size="sm">Run</Button>
				</Panel>
			</Canvas>
		</div>
	);
}
