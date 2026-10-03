import { Canvas } from "@edmi-react/components/ai/canvas";
import { Edge } from "@edmi-react/components/ai/edge";
import { Node, NodeHeader, NodeTitle } from "@edmi-react/components/ai/node";

const nodes = [
	{
		id: "a",
		type: "step",
		position: { x: 0, y: 40 },
		data: { l: "Start", t: false },
	},
	{
		id: "b",
		type: "step",
		position: { x: 320, y: 0 },
		data: { l: "Check drift", t: true },
	},
	{
		id: "c",
		type: "step",
		position: { x: 320, y: 120 },
		data: { l: "Draft post", t: true },
	},
	{
		id: "d",
		type: "step",
		position: { x: 320, y: 240 },
		data: { l: "Escalate", t: true },
	},
];

const edges = [
	{ id: "e1", source: "a", target: "b", type: "animated" },
	{ id: "e2", source: "a", target: "c" },
	{ id: "e3", source: "a", target: "d", type: "temporary" },
];

const nodeTypes = {
	step: ({ data }: { data: { l: string; t: boolean } }) => (
		<Node handles={{ target: data.t, source: !data.t }} className="w-40">
			<NodeHeader className="border-b-0">
				<NodeTitle>{data.l}</NodeTitle>
			</NodeHeader>
		</Node>
	),
};

export default function Demo() {
	return (
		<div className="h-72 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas
				edges={edges}
				edgeTypes={{ animated: Edge.Animated, temporary: Edge.Temporary }}
				nodes={nodes}
				nodeTypes={nodeTypes}
			/>
		</div>
	);
}
